interface RightProps {
  width: number
}
export default function Right(props: RightProps) {
  const { width } = props
  return (
    <div style={{ width }}>Right</div>
  )
}