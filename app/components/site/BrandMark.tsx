type BrandMarkProps = { className?: string; title?: string };

/** A custom J/A monogram drawn as one continuous, architectural gesture. */
export default function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title} focusable="false">
      <rect x="1" y="1" width="30" height="30" rx="7" fill="currentColor" />
      <path d="M10 9h9v10.3c0 4.2-2.3 6.7-6.2 6.7-2.3 0-4.2-1-5.3-2.7" fill="none" stroke="var(--mark-paper, #fbf9f6)" strokeWidth="2.35" strokeLinecap="square" />
      <path d="M18.7 20.5 24 9l3.2 7.1M21.1 15.1h4.8" fill="none" stroke="var(--mark-accent, #e8925a)" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
