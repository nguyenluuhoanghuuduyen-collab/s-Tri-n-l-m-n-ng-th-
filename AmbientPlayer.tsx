import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from "lucide-react";

interface SoundTrack {
  id: string;
  name: string;
  url: string;
  icon: string;
}

const TRACKS: SoundTrack[] = [
  {
    id: "rain",
    name: "Mưa rơi ấm áp",
    url: "https://www.soundjay.com/nature/sounds/rain-07.mp3",
    icon: "🌧️",
  },
  {
    id: "lofi",
    name: "Lofi Piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    icon: "🎹",
  },
  {
    id: "wind",
    name: "Gió ngàn rì rào",
    url: "https://www.soundjay.com/nature/sounds/forest-wind-1.mp3",
    icon: "🍃",
  },
];

export default function AmbientPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundTrack>(TRACKS[0]);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Sync volume to audio element
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // If track changes, load and play it if it was playing
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Audio playback error:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback error:", err);
      });
      setIsPlaying(true);
    }
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative flex items-center gap-2">
      <audio ref={audioRef} src={currentTrack.url} loop />

      {/* Main Play/Pause Mini Toggle */}
      <button
        onClick={handlePlayPause}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
          isPlaying
            ? "bg-amber-600 text-white animate-pulse"
            : "bg-stone-100 hover:bg-stone-200/60 text-stone-600 hover:text-stone-800"
        }`}
        title={isPlaying ? "Tạm dừng nhạc cảm hứng" : "Bật nhạc cảm hứng sáng tác"}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      {/* Track Selector & Volume controls wrapper */}
      <div className="flex items-center gap-1.5 bg-stone-100/80 p-0.5 pr-2 rounded-full border border-stone-200 shadow-2xs">
        {/* Dropdown Indicator / Track Info */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-stone-600 hover:text-stone-800 transition-colors cursor-pointer rounded-full hover:bg-white"
        >
          <span className="text-sm">{currentTrack.icon}</span>
          <span className="hidden sm:inline text-[10.5px] truncate max-w-[80px]">{currentTrack.name}</span>
        </button>

        {/* Volume Icon Toggle */}
        <button
          onClick={handleVolumeToggle}
          className="p-1 rounded-full hover:bg-white text-stone-500 hover:text-stone-800 cursor-pointer"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-3 h-3 text-stone-400" />
          ) : (
            <Volume2 className="w-3 h-3" />
          )}
        </button>

        {/* Inline Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            setIsMuted(false);
          }}
          className="w-12 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
        />
      </div>

      {/* Popover list of ambient tracks */}
      {showControls && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setShowControls(false)} />
          <div className="absolute right-0 top-10 mt-1 bg-white/95 backdrop-blur-md border border-stone-200 rounded-xl shadow-lg p-2.5 w-44 z-40 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-2 pb-1.5 border-b border-stone-100 flex items-center gap-1">
              <Music className="w-3 h-3" />
              Chọn nhạc cảm hứng
            </div>
            {TRACKS.map((track) => {
              const isSelected = track.id === currentTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(track);
                    setShowControls(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-amber-50 text-amber-800 font-semibold"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-800"
                  }`}
                >
                  <span className="text-sm">{track.icon}</span>
                  <span>{track.name}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
