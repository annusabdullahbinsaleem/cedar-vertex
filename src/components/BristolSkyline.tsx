export default function BristolSkyline() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-full w-full"
      role="img"
      aria-label="A minimalist illustration of the Clifton Suspension Bridge and Bristol skyline"
    >
      <defs>
        <radialGradient id="cv-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft brand-accent glow behind the bridge */}
      <circle cx="300" cy="165" r="150" fill="url(#cv-glow)" />

      {/* distant skyline, far back, very low opacity */}
      <g fill="var(--primary)" opacity="0.1">
        <rect x="16" y="238" width="24" height="32" />
        <rect x="46" y="222" width="18" height="48" />
        <rect x="70" y="248" width="26" height="22" />
        <rect x="484" y="230" width="20" height="40" />
        <rect x="510" y="212" width="16" height="58" />
        <rect x="532" y="244" width="24" height="26" />
        <rect x="562" y="234" width="18" height="36" />
      </g>

      {/* faint lit windows on the distant skyline, single accent touch */}
      <g fill="var(--accent)" opacity="0.55">
        <rect x="52" y="234" width="4" height="4" />
        <rect x="516" y="226" width="4" height="4" />
      </g>

      {/* gorge / water beneath the bridge, minimal */}
      <g stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="2" fill="none">
        <path d="M40,296 Q300,282 560,296" />
        <path d="M60,308 Q300,296 540,308" />
      </g>

      {/* suspender lines */}
      <g stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="1.5">
        <line x1="130" y1="222" x2="130" y2="258" />
        <line x1="160" y1="192" x2="160" y2="258" />
        <line x1="192" y1="150" x2="192" y2="258" />
        <line x1="252" y1="140" x2="252" y2="258" />
        <line x1="282" y1="163" x2="282" y2="258" />
        <line x1="318" y1="163" x2="318" y2="258" />
        <line x1="348" y1="140" x2="348" y2="258" />
        <line x1="408" y1="150" x2="408" y2="258" />
        <line x1="440" y1="192" x2="440" y2="258" />
        <line x1="470" y1="222" x2="470" y2="258" />
      </g>

      {/* bridge deck + approach roads */}
      <g stroke="var(--primary)" strokeWidth="4" strokeLinecap="round">
        <line x1="140" y1="258" x2="460" y2="258" />
        <line x1="140" y1="258" x2="100" y2="278" />
        <line x1="460" y1="258" x2="500" y2="278" />
      </g>

      {/* main suspension cable — the brand-accent highlight */}
      <path
        d="M100,235 C150,190 180,140 220,116 C260,172 340,172 380,116 C420,140 450,190 500,235"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* towers */}
      <g fill="var(--primary)">
        <path d="M200,260 L212,112 L228,112 L240,260 Z" />
        <path d="M360,260 L372,112 L388,112 L400,260 Z" />
      </g>

      {/* vertex beacons at the tower tops, echoing the logo mark */}
      <circle cx="220" cy="108" r="4.5" fill="var(--accent)" />
      <circle cx="380" cy="108" r="4.5" fill="var(--accent)" />
    </svg>
  );
}
