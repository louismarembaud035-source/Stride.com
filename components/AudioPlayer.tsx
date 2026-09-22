'use client';

import { useState } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack] = useState({
    title: 'Phonk Tokyo Drift',
    artist: 'Phonk Energy • 142 BPM',
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md p-3 z-40 flex justify-center">
      <div className="w-full max-w-[520px] flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center font-extrabold text-slate-950 text-xs shadow-inner">
            ♪
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">{currentTrack.title}</h4>
            <span className="text-[10px] text-slate-400 block">{currentTrack.artist}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 font-bold flex items-center justify-center hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
        </div>
      </div>
    </div>
  );
}
