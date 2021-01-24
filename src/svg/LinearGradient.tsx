export default function LinearGradient() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="500"
			height="500"
			viewBox="0 0 500 500"
			style={{ border: '1px solid' }}
		>
			<defs>
				<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="rgb(255,255,0)" />
					<stop offset="25%" stopColor="rgb(255,200,60)" />
					<stop offset="50%" stopColor="rgb(255,87,80)" />
					<stop offset="100%" stopColor="rgb(255,0,0)" />
				</linearGradient>
			</defs>
			<circle cx="200" cy="200" r="150" fill="url(#grad1)" />
			<text
				fill="#fff"
				fontSize="45"
				fontFamily="sans-serif"
				x="200" y="200"
				dominantBaseline="middle"
				textAnchor="middle">
				SVG</text>
		</svg>
	)
}

