import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Recording } from "@/data/recordings";

export type PlaybackStatus = "idle" | "loading" | "playing" | "paused" | "error";

interface AudioState {
  current: Recording | null;
  status: PlaybackStatus;
  currentTime: number;
  duration: number | null;
  volume: number;
  muted: boolean;
  /** Human-readable reason playback is not possible. */
  errorMessage: string | null;
  isCurrent: (recording: Recording) => boolean;
  isPlayingRecording: (recording: Recording) => boolean;
  play: (recording: Recording) => void;
  toggle: (recording: Recording) => void;
  pause: () => void;
  stop: () => void;
  seek: (seconds: number) => void;
  seekRatio: (ratio: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioState | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const elementRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Recording | null>(null);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getElement = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!elementRef.current) {
      const el = new Audio();
      el.preload = "metadata";
      el.crossOrigin = "anonymous";
      el.volume = volume;
      el.addEventListener("timeupdate", () => setCurrentTime(el.currentTime));
      el.addEventListener("loadedmetadata", () =>
        setDuration(Number.isFinite(el.duration) ? el.duration : null),
      );
      el.addEventListener("playing", () => {
        setStatus("playing");
        setErrorMessage(null);
      });
      el.addEventListener("pause", () => {
        if (!el.ended) setStatus("paused");
      });
      el.addEventListener("waiting", () => setStatus("loading"));
      el.addEventListener("ended", () => {
        setStatus("paused");
        setCurrentTime(0);
      });
      el.addEventListener("error", () => {
        setStatus("error");
        setErrorMessage("This recording could not be loaded. The audio source may be unreachable.");
      });
      elementRef.current = el;
    }
    return elementRef.current;
  }, [volume]);

  useEffect(() => {
    return () => {
      const el = elementRef.current;
      if (el) {
        el.pause();
        el.src = "";
      }
    };
  }, []);

  const play = useCallback(
    (recording: Recording) => {
      if (!recording.audioUrl) {
        setCurrent(recording);
        setStatus("error");
        setDuration(null);
        setCurrentTime(0);
        setErrorMessage("The archive does not hold a playable recording for this entry yet.");
        return;
      }
      const el = getElement();
      if (!el) return;
      if (current?.id !== recording.id) {
        el.src = recording.audioUrl;
        setCurrent(recording);
        setCurrentTime(0);
        setDuration(recording.duration ?? null);
      }
      setErrorMessage(null);
      setStatus("loading");
      void el.play().catch(() => {
        setStatus("error");
        setErrorMessage("Playback was blocked or the audio source could not be reached.");
      });
    },
    [current, getElement],
  );

  const pause = useCallback(() => {
    elementRef.current?.pause();
  }, []);

  const toggle = useCallback(
    (recording: Recording) => {
      if (current?.id === recording.id && status === "playing") pause();
      else play(recording);
    },
    [current, status, pause, play],
  );

  const stop = useCallback(() => {
    const el = elementRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    setCurrent(null);
    setStatus("idle");
    setCurrentTime(0);
    setDuration(null);
    setErrorMessage(null);
  }, []);

  const seek = useCallback((seconds: number) => {
    const el = elementRef.current;
    if (!el || !Number.isFinite(el.duration)) return;
    el.currentTime = Math.max(0, Math.min(el.duration, seconds));
    setCurrentTime(el.currentTime);
  }, []);

  const seekRatio = useCallback(
    (ratio: number) => {
      const el = elementRef.current;
      if (!el || !Number.isFinite(el.duration)) return;
      seek(ratio * el.duration);
    },
    [seek],
  );

  const setVolume = useCallback((value: number) => {
    setVolumeState(value);
    const el = elementRef.current;
    if (el) {
      el.volume = value;
      if (value > 0 && el.muted) {
        el.muted = false;
        setMuted(false);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    const el = elementRef.current;
    const next = !muted;
    setMuted(next);
    if (el) el.muted = next;
  }, [muted]);

  const value = useMemo<AudioState>(
    () => ({
      current,
      status,
      currentTime,
      duration,
      volume,
      muted,
      errorMessage,
      isCurrent: (recording) => current?.id === recording.id,
      isPlayingRecording: (recording) => current?.id === recording.id && status === "playing",
      play,
      toggle,
      pause,
      stop,
      seek,
      seekRatio,
      setVolume,
      toggleMute,
    }),
    [
      current,
      status,
      currentTime,
      duration,
      volume,
      muted,
      errorMessage,
      play,
      toggle,
      pause,
      stop,
      seek,
      seekRatio,
      setVolume,
      toggleMute,
    ],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio(): AudioState {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
