import React from 'react';
import Layout from '../components/Layout';
import { Book, Lock, Terminal } from 'lucide-react';
import { FounderSignature } from '../components/FounderSignature';



const journalEntries = [
  {
    id: "echo-003",
    date: "2026.04.18",
    title: "Encryption as Empathy",
    preview: "In the Sanctuary, privacy isn't just a setting; it's the foundation of safety. To be 'deviant' is to exist outside the lines. To protect that existence, we must be invisible to those who would judge or harm.",
    content: "Full entry available for Architect Clearance.",
    status: "Encrypted"
  },
  {
    id: "echo-002",
    date: "2026.04.10",
    title: "The Architecture of Transition",
    preview: "Walls are easier to build than doors. Transitioning wasn't just about the physical; it was about the structural redesign of my entire reality. This site is the digital manifestation of that new structure.",
    content: "Full entry available for Architect Clearance.",
    status: "Encrypted"
  },
  {
    id: "echo-001",
    date: "2026.03.28",
    title: "Initial Site Survey: Waverly",
    preview: "Setting up the servers in the Iowa cold. There is a specific kind of silence here—a quiet that allows for the deep focus required to build something this heavy. The Sanctuary begins here.",
    content: "Entry Decrypted.",
    status: "Decrypted"
  }
];

export default function Echoes() {
  return (
    <Layout>
      <div className="min-h-screen bg-black text-zinc-400 font-mono w-full">
        <div className="max-w-3xl mx-auto px-6 py-32">
          
          <header className="mb-24 border-b border-zinc-900 pb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#FF69B4]/50 flex items-center justify-center text-[#FF69B4] shadow-[0_0_15px_rgba(255,105,180,0.2)]">
                <Book size={18} />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-[0.2em] italic">The Echoes</h1>
            </div>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-600">
              Personal Logs // Architect Clearance Required
            </p>
          </header>

          <div className="space-y-32">
            {journalEntries.map((entry) => (
              <article key={entry.id} className="group relative border-l border-zinc-900 pl-10 pb-20">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[#FF1E89] text-xs font-black">{entry.date}</span>
                  <div className="h-px w-12 bg-zinc-900" />
                  <span className="text-zinc-700 text-[11px] uppercase tracking-widest">{entry.status}</span>
                </div>

                <h2 className="text-2xl font-black text-zinc-100 uppercase italic mb-6">
                  {entry.title}
                </h2>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {entry.preview}
                  </p>
                  
                  {entry.status === 'Decrypted' && (
                    <div className="mt-12 pt-12 border-t border-zinc-900 animate-in fade-in duration-1000">
                      <p className="text-zinc-300 italic mb-10">
                        "The sanctuary is not a place, it is a protocol of being."
                      </p>
                      <FounderSignature />
                    </div>
                  )}
                </div>

                {entry.status === 'Encrypted' && (
                  <button className="mt-10 flex items-center gap-3 text-[#FF1E89] text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-all hover:drop-shadow-[0_0_10px_rgba(255,30,137,0.5)]">
                    <Lock size={14} /> Bypass Encryption
                  </button>
                )}
              </article>
            ))}
          </div>

          <footer className="mt-40 pt-12 border-t border-zinc-900 flex justify-between items-center text-[11px] uppercase tracking-[0.5em] text-zinc-800">
            <span>Transmission End</span>
            <span>Waverly Archive // ID: {journalEntries[0].id}</span>
          </footer>
        </div>
      </div>
    </Layout>
  );
}
