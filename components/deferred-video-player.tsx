"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LazyVideoPlayer = dynamic(
  () => import("@/components/lazy-video-player").then((mod) => mod.LazyVideoPlayer),
  {
    ssr: false,
    loading: () => <HomeVideoPlaceholder />,
  },
);

type DeferredLazyVideoPlayerProps = {
  className?: string;
  posterDesktop: string;
  posterMobile: string;
  desktopSrc: string;
  mobileSrc: string;
  ariaLabel: string;
};

export function DeferredLazyVideoPlayer(props: DeferredLazyVideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;

    if (!node || shouldRender) {
      return;
    }

    const reveal = () => setShouldRender(true);

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(reveal, 400);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldRender]);

  return <div ref={wrapperRef}>{shouldRender ? <LazyVideoPlayer {...props} /> : <HomeVideoPlaceholder />}</div>;
}

function HomeVideoPlaceholder() {
  return (
    <div className="home-video home-video-placeholder" aria-hidden="true">
      <Image
        src="/images/hero-successioni-del-monte.webp"
        alt=""
        fill
        loading="lazy"
        sizes="(max-width: 760px) 100vw, 50vw"
        className="home-video-placeholder-image"
      />
    </div>
  );
}
