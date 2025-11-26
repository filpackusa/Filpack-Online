'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl text-orange-100">Learn more about Filpack Online</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="prose prose-lg max-w-none">
                    {/* Company Overview */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
                            <p className="text-slate-700 leading-relaxed mb-4">
                                {/* Content will be added here */}
                                Welcome to Filpack Online - your trusted partner in professional food packaging solutions.
                            </p>
                        </div>
                    </section>

                    {/* Mission & Vision */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
                            <p className="text-slate-700 leading-relaxed">
                                {/* Content will be added here */}
                                Our mission is to provide high-quality, sustainable packaging solutions for the food industry.
                            </p>
                        </div>
                    </section>

                    {/* Values */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <h3 className="text-xl font-bold text-orange-600 mb-3">Quality</h3>
                                <p className="text-slate-700">
                                    {/* Content will be added here */}
                                    We never compromise on quality.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <h3 className="text-xl font-bold text-orange-600 mb-3">Sustainability</h3>
                                <p className="text-slate-700">
                                    {/* Content will be added here */}
                                    Eco-friendly solutions for a better future.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <h3 className="text-xl font-bold text-orange-600 mb-3">Innovation</h3>
                                <p className="text-slate-700">
                                    {/* Content will be added here */}
                                    Constantly improving our products.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <h3 className="text-xl font-bold text-orange-600 mb-3">Customer Focus</h3>
                                <p className="text-slate-700">
                                    {/* Content will be added here */}
                                    Your success is our priority.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact CTA */}
                    <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
                        <p className="text-orange-100 mb-6">
                            Contact us today to discuss your packaging needs.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            Get in Touch
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
