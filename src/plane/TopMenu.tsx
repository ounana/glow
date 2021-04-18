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
    <div className="TopMenu" style={{ height }}>
      { menuList.map(v => <div key={v.value}>{v.label}</div>)}
    </div>
  )
}