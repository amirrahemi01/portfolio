"use client";

import React, { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  label: string;
  /** Pixel size of the video, so the page reserves the right space before anything loads. */
  width: number;
  height: number;
}

/**
 * Demo video. The plain <video controls> is rendered on the server, so it works everywhere (older
 * iPhones included) even if JavaScript is slow or fails. Once the page is ready it is upgraded to
 * the Plyr player (https://plyr.io): one look in every browser, tinted with the site blue.
 */
function VideoPlayer({ src, poster, label, width, height }: VideoPlayerProps) {
  const video = useRef<HTMLVideoElement>(null);
  const portrait = height > width;

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    let player: { destroy: () => void } | undefined;
    let cancelled = false;
    import("plyr")
      .then(({ default: Plyr }) => {
        if (cancelled) return;
        player = new Plyr(el, {
          controls: ["play-large", "play", "progress", "current-time", "mute", "fullscreen"],
          ratio: `${width}:${height}`,
          // Icons come from our own /plyr.svg, not Plyr's CDN
          iconUrl: "/plyr.svg",
          keyboard: { focused: true, global: false },
        });
      })
      .catch(() => {
        /* keep the native controls */
      });

    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [width, height]);

  return (
    <div
      className={`demo-player mx-auto mt-5 w-full overflow-hidden rounded-2xl border border-black/10 bg-black dark:border-white/10 ${
        portrait ? "max-w-[320px]" : ""
      }`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        ref={video}
        className="block h-full w-full object-contain"
        src={src}
        poster={poster}
        aria-label={label}
        controls
        playsInline
        preload="metadata"
      />
    </div>
  );
}

export default VideoPlayer;
