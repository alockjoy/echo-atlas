import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rule-top flex flex-col items-start gap-4 py-16 sm:py-24">
      <h3 className="text-3xl text-foreground sm:text-4xl">{title}</h3>
      <p className="max-w-prose text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
