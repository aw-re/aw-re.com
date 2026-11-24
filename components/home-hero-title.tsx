"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/data/site";
import TechText from "./react-bits/TechText";

export default function HomeHeroTitle({
  title,
  locale,
}: {
  title: string;
  locale: Locale;
}) {
  const [paused, setPaused] = useState(false);
  const rtl = locale === "ar";
  const pauseLabels = rtl
    ? {
        pause: "إيقاف حركة العنوان التلقائية",
        play: "استئناف حركة العنوان التلقائية",
      }
    : {
        pause: "Pause automatic title animation",
        play: "Resume automatic title animation",
      };
  const label = paused ? pauseLabels.play : pauseLabels.pause;

  return (
    <div className="home-hero-title">
      <h1>{title}</h1>
      <div className="home-hero-title-effect" aria-hidden="true">
        <TechText
          text={title}
          direction={rtl ? "rtl" : "ltr"}
          align={rtl ? "right" : "left"}
          letterSpacing={rtl ? 0 : -0.05}
          sweep={!paused}
        />
      </div>
      <button
        className="home-hero-motion"
        type="button"
        aria-label={label}
        title={label}
        onClick={() => setPaused((current) => !current)}
      >
        {paused ? (
          <Play size={13} aria-hidden="true" />
        ) : (
          <Pause size={13} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
