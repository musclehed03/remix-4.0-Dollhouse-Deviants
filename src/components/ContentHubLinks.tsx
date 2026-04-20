import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { ExternalLink, ShoppingCart, PlayCircle, Lock } from 'lucide-react';

export default function ContentHubLinks() {
  const [links, setLinks] = useState({ clips4SaleRss: '', pornhubNode: '', onlyFansUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const unsub = onSnapshot(doc(db, 'config', 'contentLinks'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLinks({
          clips4SaleRss: data.clips4SaleRss || '',
          pornhubNode: data.pornhubNode || '',
          onlyFansUrl: data.onlyFansUrl || '',
        });
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 animate-pulse mt-8">
        <div className="h-12 w-40 bg-[#1A1A1B] border border-[#2D2D2D]"></div>
        <div className="h-12 w-40 bg-[#1A1A1B] border border-[#2D2D2D]"></div>
        <div className="h-12 w-40 bg-[#1A1A1B] border border-[#2D2D2D]"></div>
      </div>
    );
  }

  if (!links.clips4SaleRss && !links.pornhubNode && !links.onlyFansUrl) return null;

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      {links.clips4SaleRss && (
        <a 
          href={links.clips4SaleRss} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1A1A1B] border border-[#2D2D2D] hover:border-[#FF69B4] text-white hover:text-[#FF69B4] px-6 py-3 font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,105,180,0.3)]"
        >
          <ShoppingCart size={18} />
          Clips4Sale
          <ExternalLink size={14} className="ml-1 opacity-50" />
        </a>
      )}
      
      {links.pornhubNode && (
        <a 
          href={links.pornhubNode} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1A1A1B] border border-[#2D2D2D] hover:border-[#FF69B4] text-white hover:text-[#FF69B4] px-6 py-3 font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,105,180,0.3)]"
        >
          <PlayCircle size={18} />
          Pornhub
          <ExternalLink size={14} className="ml-1 opacity-50" />
        </a>
      )}

      {links.onlyFansUrl && (
        <a 
          href={links.onlyFansUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1A1A1B] border border-[#2D2D2D] hover:border-[#00AFF0] text-white hover:text-[#00AFF0] px-6 py-3 font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,175,240,0.3)]"
        >
          <Lock size={18} />
          OnlyFans
          <ExternalLink size={14} className="ml-1 opacity-50" />
        </a>
      )}
    </div>
  );
}
