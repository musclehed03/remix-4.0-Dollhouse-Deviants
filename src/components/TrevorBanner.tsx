import React from 'react';
import { Heart } from 'lucide-react';

export default function TrevorBanner() {
  const donationLink = "https://give.thetrevorproject.org/campaign/786401/donate?c_src=UMCOF260410250&c_src2=Nebo-Paid-Search&utm_medium=fundraising&utm_source=sem-googleadwords1&utm_campaign=generaleffort&gclsrc=aw.ds&gad_source=1&gad_campaignid=1674429279&gbraid=0AAAAAC4XVSlmW-XGCCW8AcM1dgvNGtN3U&gclid=CjwKCAjw-dfOBhAjEiwAq0RwI7Q_jfKJrzIojMKHFjMXh8QLWvfLuq1GkMLDpzk4AifETxZYvUk4phoCMUsQAvD_BwE";

  return (
    <a 
      href={donationLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[9999] flex items-center gap-4 bg-black/80 hover:bg-zinc-900 border border-orange-500/30 p-2 pl-4 rounded-full backdrop-blur-sm transition-all duration-500 group hover:scale-105 bottom-6 right-6 shadow-2xl"
    >
      <div className="hidden md:block text-right">
        <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 leading-tight">
          Support a project we believe in <span className="text-orange-500 font-bold">wholeheartedly</span>
        </p>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">Click to donate</p>
      </div>
      
      {/* Orange Badge with Text */}
      <div className="h-10 flex items-center justify-center gap-2 bg-[#FF6B00] rounded-full px-5 shadow-[0_0_15px_rgba(255,107,0,0.4)]">
        <Heart size={14} className="text-white fill-white animate-pulse" />
        <span className="text-white font-black text-xs tracking-widest whitespace-nowrap">THE TREVOR PROJECT</span>
      </div>
    </a>
  );
}
