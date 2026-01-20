"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Margaret T.",
    location: "Georgia",
    quote:
      "Working with Lucian at Bellevue Assurance was wonderful. He was patient and explained all my term life insurance options clearly. I felt comfortable asking questions and never pressured.",
    agent: "Lucian",
    rating: 5,
  },
  {
    name: "Robert S.",
    location: "Texas",
    quote:
      "Gabriel made the process so easy! I called for a final expense quote and he helped me understand simplified issue term life too. Got coverage that fit my budget in one phone call.",
    agent: "Gabriel",
    rating: 5,
  },
  {
    name: "Linda M.",
    location: "Florida",
    quote:
      "Kayla at Bellevue Assurance was fantastic. She answered all my questions about fast issue term life insurance and let me take my time deciding. No pressure, just honest help.",
    agent: "Kayla",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 },
    );

    const cards = sectionRef.current?.querySelectorAll(".testimonial-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const avgRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bellevue Assurance",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      bestRating: 5,
      worstRating: 1,
      reviewCount: testimonials.length,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      reviewBody: t.quote,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <section
        ref={sectionRef}
        className="py-16 md:py-20 bg-white"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="Bellevue Assurance" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ba-navy mb-4">
              What Our Customers Say About Bellevue Assurance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from families who found the right life insurance
              coverage with our licensed agents.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="testimonial-card bg-ba-bg rounded-xl p-6 md:p-8 border border-gray-200 opacity-0 transition-all duration-700 hover:shadow-xl hover:border-ba-blue"
                style={{ transitionDelay: `${i * 150}ms` }}
                itemProp="review"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div
                  className="flex items-center gap-1 mb-4"
                  itemProp="reviewRating"
                  itemScope
                  itemType="https://schema.org/Rating"
                >
                  <meta itemProp="ratingValue" content={t.rating.toString()} />
                  <meta itemProp="bestRating" content="5" />
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-ba-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-label="Star rating"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote
                  className="text-lg text-ba-text mb-4"
                  itemProp="reviewBody"
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <p className="font-semibold text-ba-navy" itemProp="name">
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                  <p className="text-sm text-ba-blue mt-1">
                    Assisted by Agent {t.agent}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Customer testimonials reflect individual experiences. Results may
            vary based on personal circumstances and needs.
          </p>
        </div>
      </section>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}
