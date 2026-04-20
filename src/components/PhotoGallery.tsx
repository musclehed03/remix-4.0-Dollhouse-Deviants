import React from 'react';
import { Share2 } from 'lucide-react';
import SafeImage from './SafeImage';

// 1. The Metadata Schema for a single Photo
export interface Photo {
  id: string | number;
  title: string;
  artist: string;
  imageUrl: string;
  technicalSpecs: string;
  editorialNote: string;
  ethicalSource: string;
}

// 2. Individual Photo Card Component
const PhotoCard: React.FC<Photo> = ({ 
  title, artist, imageUrl, technicalSpecs, editorialNote, ethicalSource 
}) => {
  return (
    <div className="break-inside-avoid relative w-full mb-8 bg-[#1A1A1A] overflow-hidden group cursor-pointer border border-zinc-800/50">
      <SafeImage 
        src={imageUrl} 
        alt={title} 
        className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" 
        referrerPolicy="no-referrer"
      />
      
      {/* Editorial Overlay (Reveals on Hover) */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-gradient-to-b from-transparent via-black/40 to-[#0a0a0c]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        
        {/* Header */}
        <div className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
          <h3 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-widest mb-1 drop-shadow-md">
            {title}
          </h3>
          <p className="font-sans text-sm text-zinc-400 italic">
            by {artist}
          </p>
        </div>
        
        {/* Content */}
        <div className="mt-auto mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out delay-75">
          <p className="font-sans text-zinc-200 font-light leading-relaxed text-sm max-w-xs mb-3">
            {editorialNote}
          </p>
          <p className="font-sans text-xs text-zinc-500 uppercase tracking-[0.2em]">
            {technicalSpecs}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end border-t border-zinc-800/80 pt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out delay-150">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-magenta-500 border-l border-magenta-500 pl-3 max-w-[200px] leading-relaxed">
            {ethicalSource}
          </p>
          <button 
            className="p-2 rounded-full border border-white/10 text-white hover:bg-magenta-500 hover:border-magenta-500 transition-colors duration-300 backdrop-blur-sm"
            aria-label="Share Photo"
          >
            <Share2 size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Main Gallery Container Component
const PhotoGallery: React.FC<{ photos: Photo[] }> = ({ photos }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {photos.map(photo => (
          <PhotoCard key={photo.id} {...photo} />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
