import Hero from "./Hero";

export function HeroImageExample() {
  return (
    <Hero
      variant="image"
      backgroundImage="/hero-img.jpg"
      overlayOpacity={0.65}
      headline="Protect Your Family's Future Today"
      subheadline="Simplified term life insurance with no medical exams required"
      bullets={[
        "Get approved in minutes, not weeks",
        "Coverage from $25,000 to $500,000",
        "Lock in affordable rates that never increase"
      ]}
      showCTAs={true}
      showShield={false}
    />
  );
}

export function HeroTextMaskExample() {
  return (
    <Hero
      variant="image"
      backgroundImage="/hero-img.jpg"
      overlayOpacity={0.7}
      textMask={true}
      headline="Mountain Strong Protection"
      subheadline="Life insurance as solid as the peaks"
      showCTAs={true}
      showShield={false}
    />
  );
}

export function HeroDefaultExample() {
  return (
    <Hero
      variant="default"
      headline="Life Insurance Made Simple"
      subheadline="Get the coverage you need without the hassle"
      bullets={[
        "No medical exam required",
        "Instant approval decisions",
        "Affordable monthly payments"
      ]}
      showCTAs={true}
      showShield={true}
    />
  );
}

export function HeroCustomOverlayExample() {
  return (
    <Hero
      variant="image"
      backgroundImage="/hero-img.jpg"
      overlayOpacity={0.5}
      headline="Your Journey to Financial Security Starts Here"
      subheadline="Experience peace of mind with comprehensive life insurance coverage"
      bullets={[
        "Tailored plans for every budget",
        "24/7 customer support",
        "Trusted by thousands of families"
      ]}
      showCTAs={true}
      showShield={false}
      className="min-h-[600px] md:min-h-[700px]"
    />
  );
}
