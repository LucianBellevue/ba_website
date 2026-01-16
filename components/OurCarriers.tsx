import Image from "next/image";

export default function OurCarriers() {
  const carriers = [
    { name: "Ethos", logo: "/images/carriers/ethos.svg", width: 120, height: 48 },
    { name: "Ameritas", logo: "/images/carriers/ameritas.svg", width: 120, height: 48 },
    { name: "Truestage", logo: "/images/carriers/truestage.svg", width: 120, height: 48 },
    { name: "LFG", logo: "/images/carriers/lfg.svg", width: 120, height: 48 },
    { name: "Mutual of Omaha", logo: "/images/carriers/mutual-of-omaha.svg", width: 120, height: 48 },
  ];

  return (
    <section className="py-16 md:py-20 bg-ba-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ba-navy mb-4">Our Trusted Carriers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We partner with top-rated insurance carriers to bring you competitive rates and reliable coverage.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {carriers.map((carrier, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <Image 
                src={carrier.logo} 
                alt={`${carrier.name} logo`} 
                width={carrier.width}
                height={carrier.height}
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
