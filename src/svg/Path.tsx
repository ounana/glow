export default function Path() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={500}
      height={500}
      viewBox="0 0 500 500"
      style={{ border: '1px solid' }}
    >
      <path d="M 50 250 Q 225 0 400 250" stroke="blue" strokeWidth="5" fill="none" />
      <g fill="black">
        <circle cx="50" cy="250" r="5" />
        <circle cx="225" cy="50" r="5" />
        <circle cx="400" cy="250" r="5" />
      </g>
      <g fontSize="30" fontFamily="sans-serif" fill="black" textAnchor="middle">
        <text x="100" y="250" dx="-10">A</text>
        <text x="250" y="50" dy="-10">B 贝塞尔曲线控制点</text>
        <text x="400" y="250" dx="30">C</text>
      </g>
      <path d="M 50 350 L 400 350" stroke="red" strokeWidth="5" fill="none" />
      <path d="M 50 400 l 350 0" stroke="green" strokeWidth="5" fill="none" />
    </svg>
  )
}

