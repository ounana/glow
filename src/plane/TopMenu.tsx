interface TopMenuProps {
  height?: number
}

const menuList = [
  { label: 'File', value: 0 },
  { label: 'Edit', value: 1 },
  { label: 'Layout', value: 2 },
  { label: 'View', value: 3 },
  { label: 'Help', value: 4 }
]

export default function TopMenu(props: TopMenuProps) {
  const { height } = props
  return (
    <div style={{ height, display: 'flex', alignItems: 'center' }}>
      { menuList.map(v => <Button style={{
        marginLeft: 10
      }} key={v.value}>{v.label}</Button>)}
    </div>
  )
}

type ButtonProps = React.PropsWithChildren<{
  style?: React.CSSProperties
  onClick?: () => void
}>

function Button(props: ButtonProps) {
  const { children, style, onClick } = props
  return (
    <div style={{
      display: 'inline-block',
      cursor: 'pointer',
      ...style
    }} onClick={onClick}>{children}</div>
  )
}