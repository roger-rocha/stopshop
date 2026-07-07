"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstitutionalVideoProps {
  src: string;
  poster: string;
  label?: string;
  className?: string;
}

export function InstitutionalVideo({
  src,
  poster,
  label = "Assista ao vídeo institucional",
  className,
}: InstitutionalVideoProps) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    setStarted(true);
    videoRef.current?.play();
  };

  return (
    <div
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-[28px] border border-border-default bg-brand-navy shadow-card",
        className
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={started}
        preload="metadata"
        playsInline
        className="h-full w-full object-cover"
      />

      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={label}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-brand-navy/30 transition-colors hover:bg-brand-navy/20"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-card transition-transform group-hover:scale-105">
            <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
          </span>
          <span className="rounded-pill bg-brand-navy/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {label}
          </span>
        </button>
      )}
    </div>
  );
}
