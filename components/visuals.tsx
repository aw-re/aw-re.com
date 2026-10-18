import Image from "next/image";
import connectedSystems from "@/public/images/connected-systems.webp";
import brandCraft from "@/public/images/brand-craft.webp";
import { Logo } from "./ui";

export function HeroVisual() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art-media">
        <Image
          src={connectedSystems}
          alt=""
          fill
          preload
          sizes="(max-width: 640px) 100vw, 70vw"
          className="hero-art-image"
        />
      </div>
    </div>
  );
}

export function BrandVisual() {
  return (
    <div className="brand-visual" aria-hidden="true">
      <Image
        src={brandCraft}
        alt=""
        fill
        sizes="(max-width: 640px) 89vw, (max-width: 900px) 45vw, 40vw"
        className="brand-visual-image"
      />
      <div className="brand-visual-mark">
        <Logo />
      </div>
    </div>
  );
}

export function ProjectVisual({
  kind,
  large = false,
}: {
  kind: string;
  large?: boolean;
}) {
  const light = kind === "reporting";
  return (
    <div
      className={`project-visual ${kind} ${large ? "large" : ""}`}
      aria-hidden="true"
    >
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <b>
            aw<span>—</span>re
          </b>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i}>
              <i />
              <span style={{ width: `${30 + (i % 3) * 10}%` }} />
            </div>
          ))}
        </aside>
        <div className="dashboard-main">
          <div className="dashboard-top">
            <span>
              {kind === "reporting"
                ? "Reporting overview"
                : kind === "sales"
                  ? "Field operations"
                  : "Market intelligence"}
            </span>
            <i />
            <i />
          </div>
          <div className="dashboard-title">
            {kind === "reporting"
              ? "A clearer view of your business."
              : kind === "sales"
                ? "Your team. Connected."
                : "Data into perspective."}
          </div>
          <div className="dashboard-stats">
            {["Overview", "Activity", "Reports"].map((x, i) => (
              <div key={x}>
                <small>{x}</small>
                <div
                  className="metric-line"
                  style={{ width: `${50 + i * 15}%` }}
                />
                <svg viewBox="0 0 100 20">
                  <path
                    d={`M0 18 12 ${12 + i * 2} 25 15 40 ${5 + i * 2} 54 9 66 4 80 8 100 0`}
                    fill="none"
                    stroke={light ? "#4d75d7" : "#b6ff3b"}
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            ))}
          </div>
          <div className="dashboard-charts">
            <div>
              <small>
                {kind === "market" ? "Market analysis" : "Activity overview"}
              </small>
              <div className="bar-chart">
                {[28, 40, 33, 60, 48, 73, 57, 82, 67, 95, 78, 100].map(
                  (v, i) => (
                    <i key={i} style={{ height: `${v}%` }} />
                  ),
                )}
              </div>
            </div>
            <div>
              <small>Distribution</small>
              <div className="donut" />
            </div>
          </div>
          <div className="dashboard-table">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i}>
                <i />
                <span />
                <span />
                <em />
              </div>
            ))}
          </div>
        </div>
      </div>
      {kind === "sales" && (
        <div className="mobile-dashboard">
          <div className="phone-notch" />
          <small>Field overview</small>
          <b>Good morning.</b>
          <div className="phone-map">
            <span />
            <span />
            <span />
          </div>
          {[1, 2, 3].map((n) => (
            <div className="phone-row" key={n}>
              <i />
              <span />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
