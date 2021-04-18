
interface TopOperProps {
  height?: number
}
export default function TopOper(props: TopOperProps) {
  const { height } = props
  return (
    <div style={{
      height, border: '1px solid'
    }}>TopOper</div>
  )
}