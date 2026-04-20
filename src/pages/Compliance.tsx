import React from 'react';
import Layout from '../components/Layout';
import { ShieldCheck, FileText, AlertTriangle, Phone, MessageSquare } from 'lucide-react';



export default function Compliance() {
  return (
    <Layout>
      <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-[#FF69B4]/30">
        
        {/* --- HEADER --- */}
        <div className="max-w-4xl mx-auto px-6 py-20">
          <header className="mb-20 border-b border-zinc-900 pb-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-[#FF69B4]" size={32} />
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-zinc-600">
                Official Regulatory Filing
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
              2257 <span className="text-[#FF69B4] drop-shadow-[0_0_15px_rgba(255,105,180,0.5)]">Compliance</span>
            </h1>
            <p className="mt-4 text-zinc-500 italic">
              Statement of Record Keeping and Content Verification Protocols.
            </p>
          </header>

          {/* --- LEGAL DISCLOSURE SECTION --- */}
          <article className="prose prose-invert max-w-none space-y-12">
            <section>
              <h3 className="text-white uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                <FileText size={16} className="text-[#FF69B4]" />
                18 U.S.C. § 2257 Statement
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400 mt-4">
                All models, actors, and individuals appearing in sexually explicit material on 
                <strong> Dollhouse Deviants </strong> were at least 18 years of age at the time 
                the visual depictions were created. 
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                In compliance with the record-keeping requirements of 18 U.S.C. § 2257 and 
                28 C.F.R. Part 75, the original records required by these regulations are 
                maintained by the Custodian of Records at the following location:
              </p>
              
              <div className="mt-6 p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl italic text-zinc-300 text-sm">
                <p className="flex items-center gap-2">Custodian of Records: <span className="signature-font text-[#FF69B4] text-2xl normal-case not-italic drop-shadow-[0_0_15px_rgba(255,105,180,0.5)] transform -translate-y-1">Sonja Kelley</span></p>
                <p>Location: Digital Archive - Waverly, IA</p>
                <p>Contact: sonja-on-fire@dollhousedeviants.com</p>
              </div>
            </section>

            <section>
              <h3 className="text-white uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                Content Verification
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400 mt-4">
                Every piece of content uploaded to <strong>The Vault</strong> is subjected to a 
                rigorous identity verification process. This includes government-issued ID 
                verification and real-time biometric matching to ensure absolute consent 
                and legal age compliance.
              </p>
            </section>
          </article>

          {/* --- THE ADDENDUM: VICTIM ADVOCACY & SUPPORT --- */}
          {/* This is styled to look like a mandatory legal footer to stay discrete */}
          <section className="mt-32 pt-16 border-t-2 border-zinc-900">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF69B4]/5 blur-[100px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#FF69B4]/10 p-3 rounded-xl border border-[#FF69B4]/20">
                    <AlertTriangle className="text-[#FF69B4]" size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                    Victim Advocacy & <span className="text-[#FF69B4]">Support Resources</span>
                  </h2>
                </div>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-2xl">
                  Dollhouse Deviants maintains a zero-tolerance policy regarding human trafficking, 
                  coercion, and non-consensual content. If you are being held against your will, 
                  seeking a way out of an exploitative situation, or need confidential help, 
                  refer to the following certified advocacy protocols:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Hotline Card */}
                  <div className="group p-8 bg-black/40 border border-zinc-800 rounded-3xl hover:border-[#FF69B4]/50 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <Phone size={16} className="text-zinc-600 group-hover:text-[#FF69B4] transition-colors" />
                      <h4 className="text-zinc-500 text-xs uppercase tracking-widest">National Hotline</h4>
                    </div>
                    <p className="text-white font-black text-2xl mb-6 tracking-tight">1-888-373-7888</p>
                    <a 
                      href="tel:18883737888" 
                      className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-[#FF1E89] hover:shadow-[0_0_15px_rgba(255,30,137,0.4)] text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-xl transition-all"
                    >
                      Call Now
                    </a>
                  </div>

                  {/* Text Card */}
                  <div className="group p-8 bg-black/40 border border-zinc-800 rounded-3xl hover:border-[#FF69B4]/50 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare size={16} className="text-zinc-600 group-hover:text-[#FF69B4] transition-colors" />
                      <h4 className="text-zinc-500 text-xs uppercase tracking-widest">SMS Liaison</h4>
                    </div>
                    <p className="text-white font-black text-2xl mb-2 tracking-tight">Text "HELP" to 233733</p>
                    <p className="text-xs text-zinc-600 uppercase tracking-tighter mb-6">
                      (Available 24/7 • English & Spanish)
                    </p>
                    <a 
                      href="sms:233733" 
                      className="inline-flex items-center gap-2 border border-zinc-800 hover:border-[#FF69B4] hover:shadow-[0_0_15px_rgba(255,105,180,0.3)] text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-xl transition-all"
                    >
                      Send Message
                    </a>
                  </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-zinc-700">
                  <div className="w-full h-px bg-zinc-900 mb-4"></div>
                  <span>Protocol 2257-S: Community Protection Mandate</span>
                  <span>Custodian Verified • Sanctuary Safety Initiative</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
