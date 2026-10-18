import { Logo } from "./ui";
export function HeroVisual() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-grid" />
      <div className="orbital-line" />
      <div className="terrain terrain-back" />
      <div className="terrain terrain-front" />
      <div className="brand-beam" />
      <div className="laptop">
        <div className="laptop-screen">
          <div className="camera" />
          <div className="screen-glint" />
          <div className="screen-brand">
            <Logo />
            <div className="screen-tagline">
              IDEAS <b>→</b> SYSTEMS <b>→</b> REAL IMPACT
            </div>
          </div>
          <svg
            className="screen-mountains"
            viewBox="0 0 600 220"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="ridge" x2="0" y2="1">
                <stop stopColor="#26332e" />
                <stop offset="1" stopColor="#080d0b" />
              </linearGradient>
            </defs>
            <path
              d="M0 160 70 105 130 144 220 70 285 130 360 80 430 120 510 28 600 0V220H0Z"
              fill="url(#ridge)"
            />
            <path
              d="m0 160 70-55 60 39 90-74 65 60 75-50 70 40 80-92L600 0"
              stroke="#526247"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M0 180Q160 220 330 140T600 0"
              fill="none"
              stroke="#b6ff3b"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="laptop-base">
          <span />
        </div>
      </div>
      <div className="art-caption">
        <span className="status-dot" />
        ENGINEERED FOR WHAT’S NEXT <span>AW—RE / 01</span>
      </div>
    </div>
  );
}
export function BrandVisual() {
  return (
    <div className="brand-visual" aria-hidden="true">
      <div className="brand-wall">
        <Logo />
        <div className="wall-line" />
      </div>
      <div className="architectural-lines" />
      <div className="brand-visual-caption">
        <span>IDEAS. SYSTEMS. REAL IMPACT.</span>
        <span>AW—RE TECH</span>
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
