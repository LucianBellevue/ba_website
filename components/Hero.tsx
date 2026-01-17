import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { FiPhone, FiArrowRight } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

interface HeroProps {
  headline: string;
  subheadline?: string;
  bullets?: string[];
  showCTAs?: boolean;
  showShield?: boolean;
  className?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  textMask?: boolean;
  variant?: 'default' | 'image' | 'gradient';
}

export default function Hero({ 
  headline, 
  subheadline, 
  bullets, 
  showCTAs = true, 
  showShield = true, 
  className = "",
  backgroundImage,
  overlayOpacity = 0.7,
  textMask = false,
  variant = 'default'
}: HeroProps) {
  const useImageBg = variant === 'image' && backgroundImage;
  
  return (
    <section className={`relative overflow-hidden ${className} ${!useImageBg ? 'bg-linear-to-br from-ba-navy via-ba-navy to-ba-blue' : ''} text-white py-16 md:py-24`}>
      {/* Background Image with Optimization */}
      {useImageBg && backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt="Hero background"
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover object-center"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          {/* Dynamic Gradient Overlay */}
          <div 
            className="absolute inset-0 z-10 bg-linear-to-br from-ba-navy/80 via-ba-navy/60 to-ba-blue/70"
            style={{ opacity: overlayOpacity }}
          />
          {/* Vignette Effect */}
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/40 via-transparent to-black/20" />
        </>
      )}
      
      {/* Shield pattern background (fallback) */}
      {!useImageBg && (
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-shields" x="0" y="0" width="100" height="120" patternUnits="userSpaceOnUse">
                <path d="M50 10L25 20v20c0 15 10 28 25 32 15-4 25-17 25-32V20L50 10z" fill="white" fillOpacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-shields)" />
          </svg>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {textMask ? (
              <h1 
                className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
                style={{
                  background: useImageBg && backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #FFFFFF 0%, #D4AF37 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
                }}
              >
                {headline}
              </h1>
            ) : (
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{headline}</h1>
            )}
            {subheadline && <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">{subheadline}</p>}
            {bullets && bullets.length > 0 && (
              <ul className="space-y-3 mb-8">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg text-gray-200">
                    <span className="shrink-0 mt-0.5"><FiCheckCircle size={24} color="var(--ba-gold)" /></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            {showCTAs && (
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-ba-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg shadow-lg">
                  <FiPhone size={20} color="var(--ba-navy)" />
                  Call Now: {SITE_CONFIG.phoneFormatted}
                </a>
                <Link href="/get-a-quote" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ba-gold text-ba-navy font-semibold rounded-lg hover:opacity-90 transition-colors text-lg shadow-lg">
                  Get a Free Quote
                  <FiArrowRight size={20} color="var(--ba-navy)" />
                </Link>
              </div>
            )}
          </div>
          {showShield && (
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-ba-gold opacity-20 blur-3xl rounded-full"></div>
                <Image
                  src="/bellevue_shield_logo.svg"
                  alt="Bellevue Assurance Shield"
                  width={400}
                  height={400}
                  className="relative w-64 xl:w-80 h-auto drop-shadow-2xl brightness-0 invert"
                  loading="eager"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
