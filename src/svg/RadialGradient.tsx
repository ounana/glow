export default function RadialGradient() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="500" height="500"
			viewBox="0 0 500 500"
			style={{ border: '1px solid' }}
		>
			<defs>
				<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
					<stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0" />
					<stop offset="100%" stopColor="rgb(0,0,255)" stopOpacity="1" />
				</radialGradient>
			</defs>
			<defs>
				<radialGradient id="grad2" cx="30%" cy="30%" r="40%" fx="50%" fy="30%">
					<stop offset="0%" stopColor="rgb(0,255,255)" stopOpacity=".3" />
					<stop offset="100%" stopColor="rgb(0,0,255)" stopOpacity="1" />
				</radialGradient>
			</defs>
			<circle cx="200" cy="200" r="150" fill="url(#grad2)" />
		</svg>
	)
}