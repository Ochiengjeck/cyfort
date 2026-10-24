import Image from "next/image";
import { Card } from "./card";

// lucide-react dropped brand/social-logo icons entirely (trademark policy) —
// this stays as a hand-coded inline SVG.
function LinkedinGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.84-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

type TeamCardProps = {
  name: string;
  role: string;
  bio?: string | null;
  photoUrl?: string | null;
  linkedinUrl?: string | null;
};

export function TeamCard({ name, role, bio, photoUrl, linkedinUrl }: TeamCardProps) {
  return (
    <Card className="items-center text-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-brand-paper ring-2 ring-brand-gold/15 transition-all duration-300 group-hover:ring-brand-gold/50">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            width={128}
            height={128}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-brand-gold/60">
            {name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-on-paper">{name}</h3>
      <p className="text-sm text-brand-gold">{role}</p>
      {bio ? <p className="mt-2 text-sm text-brand-muted">{bio}</p> : null}
      {linkedinUrl ? (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-brand-muted transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
        >
          <LinkedinGlyph className="h-4 w-4" />
        </a>
      ) : null}
    </Card>
  );
}
