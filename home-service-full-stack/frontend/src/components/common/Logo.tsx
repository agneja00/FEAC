interface LogoProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const Logo = ({ width = 220, height = 54, ...props }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 220"
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="55%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="servicesGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
      </defs>

      <g transform="translate(-28,-12) scale(0.5)">
        <path
          d="M 364.4,58.2 Q 362.0,55.0 358.0,54.8 L 352.4,54.4 Q 346.0,54.0 340.7,57.7 L 292.5,91.0 Q 281.0,99.0 280.6,113.0 L 278.4,198.0 Q 278.0,212.0 266.7,203.7 L 229.3,176.4 Q 226.0,174.0 222.0,174.8 L 220.0,175.2 Q 216.0,176.0 212.7,178.4 L 179.2,203.6 Q 168.0,212.0 167.6,198.0 L 165.4,112.0 Q 165.0,98.0 153.3,90.3 L 100.3,55.2 Q 97.0,53.0 93.0,53.0 L 91.0,53.0 Q 87.0,53.0 83.8,55.4 L 82.2,56.6 Q 79.0,59.0 78.8,63.0 L 76.6,117.0 Q 76.0,131.0 76.1,145.0 L 77.0,382.8 Q 77.0,388.0 79.8,392.4 L 81.9,395.7 Q 84.0,399.0 87.6,400.6 L 89.4,401.4 Q 93.0,403.0 96.9,403.0 L 132.0,403.0 Q 146.0,403.0 146.0,389.0 L 146.0,282.0 Q 146.0,268.0 157.6,260.2 L 211.4,223.8 Q 223.0,216.0 234.6,223.8 L 290.4,261.2 Q 299.0,267.0 299.4,277.4 L 299.6,282.6 Q 300.0,293.0 307.2,285.5 L 358.3,232.1 Q 368.0,222.0 368.0,208.0 L 368.0,67.0 Q 368.0,63.0 365.6,59.8 L 364.4,58.2 Z"
          fill="url(#iconGradient)"
        />
        <path
          d="M 400.4,267.2 Q 401.0,260.0 395.0,256.0 L 392.0,254.0 Q 386.0,250.0 379.2,252.5 L 374.6,254.2 Q 367.0,257.0 361.4,262.8 L 245.9,382.8 Q 239.0,390.0 231.8,383.0 L 207.9,359.8 Q 202.0,354.0 194.0,356.0 L 190.0,357.0 Q 182.0,359.0 180.3,367.1 L 179.0,373.4 Q 177.0,383.0 183.8,390.1 L 220.3,428.1 Q 227.0,435.0 236.6,434.2 L 241.4,433.8 Q 251.0,433.0 257.8,426.1 L 392.5,289.6 Q 399.0,283.0 399.8,273.8 L 400.4,267.2 Z"
          fill="url(#iconGradient)"
        />
        <rect
          x="228"
          y="299"
          width="23"
          height="23"
          rx="3"
          style={{ fill: "var(--secondary-color, #000000)" }}
        />
        <rect
          x="198"
          y="299"
          width="23"
          height="23"
          rx="3"
          style={{ fill: "var(--secondary-color, #000000)" }}
        />
        <rect
          x="228"
          y="269"
          width="23"
          height="23"
          rx="3"
          style={{ fill: "var(--secondary-color, #000000)" }}
        />
        <rect
          x="198"
          y="269"
          width="23"
          height="23"
          rx="3"
          style={{ fill: "var(--secondary-color, #000000)" }}
        />
      </g>

      <text
        x="220"
        y="150"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={800}
        fontSize={90}
      >
        <tspan style={{ fill: "var(--secondary-color, #000000)" }}>Home</tspan>
        <tspan fill="url(#servicesGradient)" dx={10}>
          Services
        </tspan>
      </text>
    </svg>
  );
};

export default Logo;
