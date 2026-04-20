import React from 'react';

interface VideoSanctuaryProps {
  src: string;
  title: string;
  synopsis: string;
}

const VideoSanctuary: React.FC<VideoSanctuaryProps> = ({ src, title, synopsis }) => {
  const videoId = `video-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <div className="space-y-4">
      <h3 className="text-magenta-500 font-bold">{title}</h3>
      
      <video 
        src={src} 
        controls 
        className="w-full rounded-lg border-2 border-magenta-500/20"
        aria-label={title}
        aria-describedby={`${videoId}-synopsis`}
      >
        Your browser does not support the video tag.
      </video>

      {/* This synopsis is read by JAWS/NVDA when the user focuses on the video */}
      <div id={`${videoId}-synopsis`} className="sr-only">
        {synopsis}
      </div>
      
      {/* A visual summary for sighted users (optional) */}
      <p className="text-zinc-400 text-sm italic">
        <span className="text-magenta-500 font-bold">Synopsis:</span> {synopsis}
      </p>
    </div>
  );
};

export default VideoSanctuary;
