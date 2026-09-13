import React, { useState, useRef } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand } from "react-icons/fa";

const VideoPlayer = ({
  src = "/background_50mb.mp4",
  poster = "/images/about_us.png",
  title = "SHAURYA OFFICIAL TEASER",
  motto = "Yogah Karmasu Kausalam",
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Video play error:", err));
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (videoRef.current && width > 0) {
      const duration = videoRef.current.duration;
      videoRef.current.currentTime = (clickX / width) * duration;
    }
  };

  return (
    <div className="relative group w-full aspect-video rounded-3xl overflow-hidden border-2 border-yellow-500/40 hover:border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 bg-black flex items-center justify-center">
      {/* Fallback Poster Background Image */}
      <img
        src={poster}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />

      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-cover cursor-pointer relative z-[1]"
        onClick={togglePlay}
      />

      {/* Initial Cover Overlay when video is Paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 flex flex-col items-center justify-center p-6 cursor-pointer z-10 space-y-4 text-center transition-all duration-300"
        >
          {/* Top Label */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <span>{title}</span>
          </div>

          {/* Big Play Button */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-[0_0_35px_rgba(250,204,21,0.7)] group-hover:scale-110 transition-transform duration-300">
            <FaPlay className="text-xl sm:text-2xl ml-1 text-black" />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-black text-white font-['Barlow_Condensed',sans-serif] tracking-wide">
              WATCH PROMO FILM
            </h4>
            <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
              Technology Students' Gymkhana • IIT Kharagpur
            </p>
          </div>
        </div>
      )}

      {/* Hover Vignette Overlay during Playback */}
      {isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Top Header Badge during Playback */}
      {isPlaying && (
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-400/30">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-yellow-300 uppercase">
              {title}
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-gray-300 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 uppercase">
            HD 1080P
          </span>
        </div>
      )}

      {/* Center Play/Pause button on Hover during Playback */}
      {isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute z-20 w-14 h-14 rounded-full bg-yellow-400/90 text-black flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.6)] opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300"
          aria-label="Pause video"
        >
          <FaPause className="text-lg" />
        </button>
      )}

      {/* Bottom Control Bar during Playback */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Progress Bar */}
          <div
            onClick={handleSeek}
            className="w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
          >
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center pt-1">
            {/* Motto Badge */}
            <div className="bg-yellow-400 text-black font-black italic px-3 py-1 text-[11px] sm:text-xs font-['Barlow_Condensed',sans-serif] uppercase shadow-md transform -skew-x-6">
              "{motto}"
            </div>

            {/* Action Buttons: Sound & Fullscreen */}
            <div className="flex items-center space-x-2.5 text-white">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/70 border border-white/20 text-yellow-400 hover:text-white hover:border-yellow-400 transition-colors text-xs"
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                title={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>

              <button
                onClick={handleFullscreen}
                className="p-2 rounded-full bg-black/70 border border-white/20 text-yellow-400 hover:text-white hover:border-yellow-400 transition-colors text-xs"
                aria-label="Fullscreen"
                title="Fullscreen"
              >
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
