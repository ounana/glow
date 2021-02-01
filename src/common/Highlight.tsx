export default 2

/*
  import { useEffect, useRef } from 'react'
  import 'highlight.js/styles/androidstudio.css';

  import hljs from 'highlight.js/lib/highlight';
  import typescript from 'highlight.js/lib/languages/typescript';
  hljs.registerLanguage('typescript', typescript)

  export default function Highlight() {
    const codeNode = useRef<HTMLElement>(null)
    useEffect(() => {
      hljs.highlightBlock(codeNode.current!)
    })
    return (
      <div>
        <h3>highlight example</h3>
        <pre><code ref={codeNode}>{code}</code></pre>
      </div>
    )
  }

  const code = `function todo(state = initToDoState, action: ToDoAction): ToDoState {
    switch (action.type) {
      case UPDATE_TODO_FILTER:
        return { ...state, filter: action.filter }
      case ADD_TODO:
        return {
          ...state,
          todos: [...state.todos, action.todo]
        }
      case TOGGLE_TODO:
        return {
          ...state,
          todos: state.todos.map(
            todo => todo.id === action.id ?
              { ...todo, completed: !todo.completed }
              : todo
          )
        }
      default:
        return state
    }
  }`


*/