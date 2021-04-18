interface LeftProps {
  width: number
}
export default function Left(props: LeftProps) {
  const { width } = props
  return (
    <div style={{ width }}>Left</div>
  )
}