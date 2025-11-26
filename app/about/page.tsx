'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl text-blue-100">Learn more about Filpack Online</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="prose prose-lg max-w-none">
                    {/* Company Overview */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200 space-y-4">
                            <p className="text-slate-700 leading-relaxed">
                                <strong className="text-blue-600">FILPACK USA INC.</strong> was established in 2023 to introduce its European-produced products to the North American market. The company began with the production of netting for fresh produce and later expanded its portfolio to include a wide range of products, from barrier films to fully automatic packaging machines.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                Operating in the plastic packaging sector, Filpack manufactures polyethylene-based net packaging products using advanced technology.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                Thanks to its entrepreneurial spirit and dynamic team, Filpack has proudly grown into a company that serves a diverse range of industries by continuously expanding its product line and adopting state-of-the-art technology. It partners with both domestic and international companies, producing products that meet global standards.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                Filpack's strength lies in its talented workforce, broad capabilities, global customer base, innovative product range, and advanced technological infrastructure.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                The company's mission is to be a leading, dynamic, and continuously evolving brand in the global packaging industry. Filpack places great importance on quality control and after-sales customer satisfaction. It is also an environmentally conscious company, producing recyclable packaging using raw materials that are safe for both human health and the environment.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                What sets Filpack apart is its conscientious, detail-oriented team, capable of delivering high-quality products on time, supported by a broad and loyal customer portfolio.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                Filpack has fully embraced a customer-centric production philosophy. With a flexible manufacturing process, a dynamic organizational structure, and modern equipment, the company strives to meet customer expectations at every stage—from identifying needs to measuring post-sale satisfaction—with the goal of ensuring maximum customer satisfaction. Filpack also provides customized solutions tailored to individual customer requirements.
                            </p>
                        </div>
                    </section>

                    {/* Mission & Vision */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-slate-200">
                            <p className="text-slate-700 leading-relaxed text-lg">
                                Our mission is to consistently meet the highest standards of quality while exceeding customer expectations. We embrace an innovative approach and assume the responsibility of being a leading brand in the industry. As a result, we ensure the sustainable success of our brand on a global scale.
                            </p>
                        </div>
                    </section>

                    {/* Values */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <h3 className="text-xl font-bold text-blue-600 mb-3">Quality</h3>
                                <p className="text-slate-700">
                                    {/* Content will be added here */}
                                    We never compromise on quality.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <h3 className="text-xl font-bold text-blue-600 mb-3">Sustainability</h3>
                                <p className="text-slate-700">
                                    {/* Content will be added here */}
                                    Eco-friendly solutions for a better future.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <h3 className="text-xl font-bold text-blue-600 mb-3">Innovation</h3>
                                <p className="text-slate-700">
                                    {/* Content will be added here */}
                                    Constantly improving our products.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                                <h3 className="text-xl font-bold text-blue-600 mb-3">Customer Focus</h3>
                                <p className="text-slate-700">
                                    {/* Content will be added here */}
                                    Your success is our priority.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact CTA */}
                    <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
                        <p className="text-blue-100 mb-6">
                            Contact us today to discuss your packaging needs.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Get in Touch
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
