import { cn } from '@/lib/utils';

export function LargeHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('text-2xl font-bold', className)}>{children}</h2>;
}

export function Paragraph({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-base text-muted-foreground', className)}>{children}</p>;
}