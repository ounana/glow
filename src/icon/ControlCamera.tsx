import { IconProps } from "."
export default function ControlCamera(props: IconProps) {
	const { style, size = 24, color } = props
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			style={style}
			viewBox="0 0 24 24">
			<path fill="none" d="M0 0h24v24H0V0z" />
			<path fill={color} d="M5.54 8.46L2 12l3.54 3.54 1.76-1.77L5.54 12l1.76-1.77zm6.46 10l-1.77-1.76-1.77 1.76L12 22l3.54-3.54-1.77-1.76zm6.46-10l-1.76 1.77L18.46 12l-1.76 1.77 1.76 1.77L22 12zm-10-2.92l1.77 1.76L12 5.54l1.77 1.76 1.77-1.76L12 2z" />
			<circle fill={color} cx="12" cy="12" r="3" />
		</svg>
	)
}