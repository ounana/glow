export default function Circle() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={200}
			height={200}
			viewBox="0 0 100 100"
			style={{ border: '1px solid' }}
		>
			<circle cx="50%" cy="50%" r="50" fill="red" />
		</svg>
	)
}