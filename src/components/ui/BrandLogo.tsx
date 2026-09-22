import Image from "next/image";

export function BrandLogo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <span className="relative inline-block">
      <Image
        src="/logos/stopshop-original.png"
        alt="Stop Shop — O ninho da moda"
        width={131}
        height={150}
        priority
        className={compact ? "h-16 w-auto" : "h-16 w-auto sm:h-20"}
      />
      {light && (
        <Image
          src="/logos/stopshop-original.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="70px"
          priority
          className="pointer-events-none brightness-0 invert [clip-path:inset(86%_0_0)]"
        />
      )}
    </span>
  );
}
