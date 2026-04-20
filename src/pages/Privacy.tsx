import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';



export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-zinc-400 p-8 md:p-24 selection:bg-[#FF69B4]/30 flex flex-col">
      {/* Navigation */}
      <nav className="mb-16">
        <Link to="/" className="text-[#FF69B4] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
          ← Return to Hub
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto border border-zinc-900 p-8 md:p-16 bg-zinc-950/50 flex-grow mb-16">
        <h1 className="text-white text-3xl font-bold italic tracking-tighter mb-8 border-b border-[#FF69B4]/50 pb-4">
          PRIVACY & CONSENT POLICY
        </h1>

        <div className="space-y-8 text-sm leading-relaxed tracking-wide">
          <section>
            <p className="text-white font-bold mb-4 uppercase tracking-widest text-xs">1. Age & Explicit Consent</p>
            <p>
              Dollhouse Deviants is strictly for adults 18 years of age and older. By accessing this site, you explicitly consent to viewing adult-oriented material. We do not knowingly collect information from anyone under the age of 18.
            </p>
          </section>

          <section>
            <p className="text-white font-bold mb-4 uppercase tracking-widest text-xs">2. Data Collection & Usage</p>
            <p>
              We respect your privacy and operate on a "Zero Trust" security model. We collect only the minimal data necessary for site functionality, account authentication, and secure payment processing. We do not sell, rent, or distribute your personal data to third-party marketers.
            </p>
          </section>

          <section>
            <p className="text-white font-bold mb-4 uppercase tracking-widest text-xs">3. Payment Processing</p>
            <p>
              High-risk transactions are processed securely through our compliant payment gateways (CCBill/Segpay). We do not store your full credit card numbers or raw financial data on our servers. All webhooks and payment verifications utilize HMAC-SHA256 encryption.
            </p>
          </section>

          <section>
            <p className="text-white font-bold mb-4 uppercase tracking-widest text-xs">4. Cookies & Tracking</p>
            <p>
              We use essential cookies to maintain your session and preferences (such as your Deviant Controls/Accessibility settings). We do not use invasive third-party tracking pixels.
            </p>
          </section>

          <section className="pt-8 border-t border-zinc-900">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Last Updated: April 2026<br/>
              Inquiries: privacy@dollhousedeviants.com
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
