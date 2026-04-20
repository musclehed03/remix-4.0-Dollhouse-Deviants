import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';



export default function Terms() {
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
          TERMS OF SERVICE
        </h1>

        <div className="space-y-8 text-sm leading-relaxed tracking-wide">
          <section>
            <p className="text-white font-bold mb-4 uppercase tracking-widest text-xs">1. Acceptance of Terms</p>
            <p>
              By accessing Dollhouse Deviants, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, or if you are under the age of 18, you must exit the site immediately.
            </p>
          </section>

          <section>
            <p className="text-white font-bold mb-4 uppercase tracking-widest text-xs">2. Intellectual Property</p>
            <p>
              All content, including but not limited to images, text, videos, and audio, is the exclusive property of Dollhouse Deviants Productions and its respective creators. Unauthorized distribution, reproduction, scraping, or sharing of paywalled content is strictly prohibited and will result in immediate account termination and potential legal action.
            </p>
          </section>

          <section>
            <p className="text-white font-bold mb-4 uppercase tracking-widest text-xs">3. User Conduct</p>
            <p>
              This is a sanctuary for the unconventional. Harassment, hate speech, or non-consensual behavior of any kind towards our creators or other members will not be tolerated. We reserve the right to terminate access for anyone violating this core principle.
            </p>
          </section>

          <section>
            <p className="text-white font-bold mb-4 uppercase tracking-widest text-xs">4. Billing & Subscriptions</p>
            <p>
              All purchases and subscriptions are final. Access to The Vault and other premium areas is billed according to the terms presented at checkout via our authorized payment processors.
            </p>
          </section>

          <section className="pt-8 border-t border-zinc-900">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Last Updated: April 2026<br/>
              Legal: legal@dollhousedeviants.com
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
