export default function Stroke() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="500"
			height="500"
			viewBox="0 0 500 500"
			style={{ border: '1px solid' }}
		>
			<g stroke="blue" fill="none">
				<path d="M50 50 L300 50" strokeWidth="5" />
				<path d="M50 100 L300 100" strokeWidth="10" />
				<path d="M50 150 L300 150" strokeWidth="10" strokeLinecap="butt" />
				<path d="M50 200 L300 200" strokeWidth="10" strokeLinecap="round" />
				<path d="M50 250 L300 250" strokeWidth="10" strokeLinecap="square" />
				<path d="M50 300 L300 300" strokeWidth="5" strokeDasharray="10,10" />
			</g>
		</svg>
	)
}