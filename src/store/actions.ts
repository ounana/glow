import { PaperPath } from "./paperStore";
import { TodoData, TodoFilter } from "./todo";

export enum ACTION {
  /**
   * load music
   */
  FETCH_DATA = 'FETCH_DATA',
  FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
  FETCH_DATA_FAIL = 'FETCH_DATA_FAIL',

  /**
   * todo
   */
  ADD_TODO = 'ADD_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  SWITCH_TODO_FILTER = 'SWITCH_TODO_FILTER',

  /**
   * paper
   */

  ADD_PAPER_PATH = 'ADD_PAPER_PATH',
  REMOVE_PAPER_PATH = 'REMOVE_PATH',
  TOGGLE_PAPER_PATH = 'TOGGLE_PATH'
}


export type Action =
  { type: ACTION.FETCH_DATA, payload: string } |
  { type: ACTION.FETCH_DATA_SUCCESS, payload: string[] } |
  { type: ACTION.FETCH_DATA_FAIL } |

  { type: ACTION.ADD_TODO, payload: TodoData } |
  { type: ACTION.TOGGLE_TODO, payload: number } |
  { type: ACTION.SWITCH_TODO_FILTER, payload: TodoFilter } |

  { type: ACTION.ADD_PAPER_PATH, payload: PaperPath } |
  { type: ACTION.REMOVE_PAPER_PATH, payload: number } |
  { type: ACTION.TOGGLE_PAPER_PATH, payload: number }
