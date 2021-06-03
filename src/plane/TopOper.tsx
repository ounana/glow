import { useAppDispatch, useAppSelector } from "../store"
import { switchEditorType } from '../store/plane'

interface TopOperProps {
  height?: number
}

export default function TopOper(props: TopOperProps) {
  const dispatch = useAppDispatch()
  const { editorType } = useAppSelector(state => state.plane)

  const { height } = props
  function onClick(type: string) {
    dispatch(switchEditorType(type))
  }

  return (
    <div style={{ height, border: '1px solid', display: 'flex', alignItems: 'center' }}>
      {edts.map(e =>
        <EditorButton onClick={() => onClick(e.type)}
          style={{
            marginLeft: 10,
            color: editorType === e.type ? 'red' : 'inherit'
          }} key={e.type}
        >{e.label}</EditorButton>
      )}
    </div>
  )
}

const edts = [
  { type: 'draw', label: '勾画' },
  { type: 'move', label: '移动' },
  { type: 'daub', label: '涂抹' },
  { type: 'union', label: '联合' },
  { type: 'hide', label: '隐藏' },
  { type: 'show', label: '显示' }
]

type EditorButtonProps = React.PropsWithChildren<{
  style?: React.CSSProperties
  onClick?: () => void
}>

function EditorButton(props: EditorButtonProps) {
  const { style, children, onClick } = props
  return (
    <div className="hover1" onClick={onClick} style={{
      cursor: 'pointer',
      border: '1px solid',
      padding: '3px 10px',
      display: 'inline-block',
      ...style
    }}>{children}</div>
  )
}