export default function Polygon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="500"
			height="500"
			viewBox="0 0 500 500"
			style={{ border: '1px solid' }}
		>
			<polygon points="220,30 350,30 400,180 220,180" fill="blue" />
			<polygon points="100,10 40,180 190,60 10,60 160,180" fill="blue" fillRule="evenodd" />
		</svg>
	)
}