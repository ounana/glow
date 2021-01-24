export default function Filter() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="500"
      viewBox="0 0 500 500"
      style={{ border: '1px solid' }}
    >
      <defs>
        <filter id="f1" x="0%" y="0%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>
        <filter id="f2" x="0%" y="0%">
          <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <filter id="f3" x="0%" y="0%">
          <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <filter id="f4" x="0" y="0">
          <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
          <feColorMatrix result="matrixOut" in="offOut" type="matrix"
            values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <rect x="100" y="100" width="200" height="200" fill="blue" filter="url(#f4)" />
    </svg>
  )
}

