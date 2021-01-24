export default function Ellipse() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={500}
			height={500}
			style={{ border: '1px solid' }}
			viewBox="0 0 200 200"
		>
			<ellipse cx="50%" cy="0" rx="50%" ry="25%" fill="red" />
			<ellipse cx="50%" cy="50%" rx="50%" ry="25%" fill="green" />
			<ellipse cx="50%" cy="100%" rx="50%" ry="25%" fill="blue" />
		</svg>
	)
}