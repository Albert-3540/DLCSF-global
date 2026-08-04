"use client";

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Download } from 'lucide-react';

interface DirectVideoPlayerProps {
  src: string;
  title: string;
  description?: string;
  poster?: string;
}

export default function DirectVideoPlayer({ src, title, description, poster }: DirectVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setProgress((current / dur) * 100);
    setCurrentTime(formatTime(current));
    setDuration(formatTime(dur));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = x * videoRef.current.duration;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="bg-black rounded-2xl overflow-hidden">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(formatTime(videoRef.current.duration));
            }
          }}
          playsInline
        />

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all flex items-center justify-center border border-white/20"
            >
              <Play className="w-10 h-10 text-white ml-1" />
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>

            <div
              className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs text-white/60">
              {currentTime} / {duration}
            </span>

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5 text-white" />
              ) : (
                <Maximize className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-20 left-4 right-4">
          <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-white/70 text-sm mt-1 line-clamp-2">{description}</p>
          )}
        </div>
      </div>

      {/* Download Button */}
      <div className="p-4 bg-[#1a1a1a] flex items-center justify-between">
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-gray-400 text-sm">Deeper Life Bible Church</p>
        </div>
        <a
          href={src}
          download
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>
    </div>
  );
}