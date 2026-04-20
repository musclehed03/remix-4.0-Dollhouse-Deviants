import React from 'react';
import Layout from '../components/Layout';
import { useAccess } from '../context/AccessibilityContext';
import { Camera, Palette, ExternalLink, Info } from 'lucide-react';



const artworks = [
  { id: 1, title: 'Neon Deviance', category: 'Photography', img: 'https://picsum.photos/seed/neon1/800/1000?blur=2', alt: 'High contrast neon portrait' },
  { id: 2, title: 'Digital Sanctuary', category: 'Digital Art', img: 'https://picsum.photos/seed/cyber2/800/1000?blur=2', alt: 'Abstract digital landscape' },
  { id: 3, title: 'Transition Echoes', category: 'Photography', img: 'https://picsum.photos/seed/synth3/800/1000?blur=2', alt: 'Soft focus self-portrait' },
  { id: 4, title: 'Cybernetic Soul', category: 'Mixed Media', img: 'https://picsum.photos/seed/sys4/800/1000?blur=2', alt: 'Glitch art composition' },
];

export default function Creations() {
  const { isSimplifiedMode } = useAccess();

  return (
    <Layout>
      <div className="max-w-6xl w-full">
        <header className="mb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-black uppercase text-[#D946EF] drop-shadow-[0_0_15px_rgba(217,70,239,0.3)] tracking-tighter">
            The Creations
          </h1>
          <p className="text-zinc-500 font-mono text-xs tracking-[0.4em] mt-4 uppercase">
            Visual Narratives • Art & Photography
          </p>
        </header>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {artworks.map((work) => (
            <div key={work.id} className="group relative">
              <div className={`relative overflow-hidden rounded-3xl bg-zinc-900 aspect-[4/5] border border-zinc-800 transition-all duration-700 ${!isSimplifiedMode && 'group-hover:border-[#D946EF]/50 group-hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]'}`}>
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-800">
                  {!isSimplifiedMode ? (
                    <img referrerPolicy="no-referrer" 
                      src={work.img} 
                      alt={work.alt} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 px-8 text-center">
                      <Camera size={48} />
                      <span className="text-xs uppercase font-mono tracking-widest text-zinc-600">[Image Hidden in Simplified View]</span>
                    </div>
                  )}
                </div>

                {/* Info Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end transition-opacity duration-500 ${!isSimplifiedMode ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                  <span className="text-[#D946EF] font-mono text-xs uppercase tracking-[0.3em] mb-2">{work.category}</span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{work.title}</h3>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white uppercase tracking-widest transition-colors">
                      <Info size={14} /> Details
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white uppercase tracking-widest transition-colors">
                      <ExternalLink size={14} /> Full View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-24 border-t border-zinc-900 pt-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-[#D946EF]" size={24} />
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Artist Statement</h2>
          </div>
          <p className="max-w-2xl text-center text-zinc-500 leading-relaxed text-lg">
            This space is a living archive of my journey. Each piece is an attempt to capture the quiet intensity of transition and the vibrant chaos of a neurodivergent mind. Use "Simplified View" if visual density becomes overwhelming.
          </p>
        </section>
      </div>
    </Layout>
  );
}
