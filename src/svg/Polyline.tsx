export default function Polyline() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={500}
			height={500}
			viewBox="0 0 500 500"
			style={{ border: '1px solid' }}
		>
			<polyline
				points="20,20 100,20 200,300 300,300 350,250"
				stroke="red"
				strokeWidth="5"
				fill="none"
			/>
		</svg>
	)
}

