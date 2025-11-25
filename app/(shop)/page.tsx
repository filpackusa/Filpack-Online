'use client';

import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Filpack Online",
    "description": "Professional food packaging solutions supplier in America",
    "url": "https://filpackonline.com",
    "logo": "https://filpackonline.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-857-233-6053",
      "contactType": "Customer Service",
      "areaServed": "US",
      "availableLanguage": ["English", "Turkish", "Spanish"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "200K ST NE 1012",
      "addressLocality": "Washington",
      "addressRegion": "DC",
      "postalCode": "20002",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://instagram.com/filpackonline",
      "https://facebook.com/filpackonline",
      "https://twitter.com/filpackonline"
    ]
  };



  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="flex flex-col gap-8 pb-16">
        <Hero />

        <CategoryGrid />

        {/* Trust Banner */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center md:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-orange-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('home.trustTitle')}</h2>
                <p className="text-slate-300 max-w-2xl">
                  {t('home.trustDesc')}
                </p>
              </div>
              <a href="/contact" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-lg whitespace-nowrap">
                {t('home.getQuote')}
              </a>
            </div>
          </div>
        </section>
      </div >
    </>
  );
}

