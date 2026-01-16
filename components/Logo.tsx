import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "header" | "footer" | "shield";
}

export default function Logo({ className = "", variant = "header" }: LogoProps) {
  if (variant === "footer") {
    return (
      <Link href="/" className={`block ${className}`}>
        <Image
          src="/bellevue_footer_logo.svg"
          alt="Bellevue Assurance"
          width={400}
          height={120}
          className="h-24 md:h-32 w-auto brightness-0 invert"
          priority
        />
      </Link>
    );
  }

  if (variant === "shield") {
    return (
      <Link href="/" className={`block ${className}`}>
        <Image
          src="/bellevue_shield_logo.svg"
          alt="Bellevue Assurance"
          width={56}
          height={56}
          className="h-14 w-14"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={`block shrink-0 ${className}`}>
      <Image 
        src="/bellevue_logo.svg" 
        alt="Bellevue Assurance - Simplified Issue Term Life Insurance" 
        width={280}
        height={200}
        priority
        className="w-40 md:w-48 h-auto"
      />
    </Link>
  );
}
