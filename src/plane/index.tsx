import ViewGraphic from "./ViewGraphic"
import TopMenu from './TopMenu'
import './index.css'
import TopOper from "./TopOper"

export default function Paperd() {
  return (
    <div className="plane">
      <TopMenu height={50} />
      <TopOper height={80} />
      <ViewGraphic height='calc(100% - 130px)' />
    </div>
  )
}