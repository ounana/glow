export default function Text() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="500"
      viewBox="0 0 500 500"
      style={{ border: '1px solid' }}
    >
      <g fontSize="30" fontFamily="sans-serif" dominantBaseline="middle" textAnchor="middle">
        <text x="200" y="50" fill="blue">Hello SVG</text>
        <circle cx="200" cy="50" r="5" fill="red" />
        <text x="200" y="200" fill="blue" transform="rotate(30 20,40)" >Hello SVG</text>

        <path id="path1" d="M 100 100 A 100 100 30 0 0 300 100" stroke="red" strokeWidth="5" fill="none" />
        <text x="100" y="100" fill="blue">
          <textPath href="#path1">Hello SVG Hello SVG</textPath>
        </text>
      </g>
    </svg >
  )
}

