"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoPlayerProps = {
  className?: string;
  posterDesktop: string;
  posterMobile: string;
  desktopSrc: string;
  mobileSrc: string;
  ariaLabel: string;
};

export function LazyVideoPlayer({
  className,
  posterDesktop,
  posterMobile,
  desktopSrc,
  mobileSrc,
  ariaLabel,
}: LazyVideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;

    if (!node || shouldLoad) {
      return;
    }

    const loadVideo = () => setShouldLoad(true);

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(loadVideo, 250);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadVideo();
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!("matchMedia" in window)) {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const syncViewport = (event?: MediaQueryListEvent) => {
      setIsMobile(event?.matches ?? mediaQuery.matches);
    };

    syncViewport();

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", syncViewport);
      return () => mediaQuery.removeEventListener("change", syncViewport);
    }

    const legacyMediaQuery = mediaQuery as MediaQueryList & {
      addListener: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener: (listener: (event: MediaQueryListEvent) => void) => void;
    };

    legacyMediaQuery.addListener(syncViewport);
    return () => legacyMediaQuery.removeListener(syncViewport);
  }, []);

  return (
    <div ref={wrapperRef}>
      <video
        className={className}
        controls
        playsInline
        preload="none"
        poster={isMobile ? posterMobile : posterDesktop}
        aria-label={ariaLabel}
      >
        {shouldLoad ? (
          <>
            <source media="(max-width: 760px)" src={mobileSrc} type="video/mp4" />
            <source media="(min-width: 761px)" src={desktopSrc} type="video/mp4" />
          </>
        ) : null}
      </video>
    </div>
  );
}
