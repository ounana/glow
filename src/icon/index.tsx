import AccountCircle from './AccountCircle'
import BrightnessAuto from './BrightnessAuto'
import BrightnessHigh from './BrightnessHigh'
import BugReport from './BugReport'
import Cancel from './Cancel'
import Chat from './Chat'
import ControlCamera from './ControlCamera'
import Email from './Email'
import Error from './Error'
import ErrorOutline from './ErrorOutline'
import ExitToApp from './ExitToApp'
import ExploreOff from './ExploreOff'
import Help from './Help'
import Input from './Input'
import Language from './Language'
import ListAlt from './ListAlt'
import Menu from './Menu'
import Notifications from './Notifications'
import PanTool from './PanTool'
import ScreenLockPortrait from './ScreenLockPortrait'
import SentimentSatisfied from './SentimentSatisfied'
import Settings from './Settings'
import SettingsApplications from './SettingsApplications'
import Stars from './Stars'

export default function IconView() {
  return (
    <div style={{ padding: 20 }}>
      <AccountCircle size={50} style={{ marginRight: 10 }} />
      <BrightnessAuto size={50} style={{ marginRight: 10 }} />
      <BrightnessHigh size={50} style={{ marginRight: 10 }} />
      <BugReport size={50} style={{ marginRight: 10 }} />
      <Cancel size={50} style={{ marginRight: 10 }} />
      <Chat size={50} style={{ marginRight: 10 }} />
      <ControlCamera size={50} style={{ marginRight: 10 }} />
      <Email size={50} style={{ marginRight: 10 }} />
      <Error size={50} style={{ marginRight: 10 }} />
      <ErrorOutline size={50} style={{ marginRight: 10 }} />
      <ExitToApp size={50} style={{ marginRight: 10 }} />
      <ExploreOff size={50} style={{ marginRight: 10 }} />
      <Help size={50} style={{ marginRight: 10 }} />
      <Input size={50} style={{ marginRight: 10 }} />
      <Language size={50} style={{ marginRight: 10 }} />
      <ListAlt size={50} style={{ marginRight: 10 }} />
      <Menu size={50} style={{ marginRight: 10 }} />
      <Notifications size={50} style={{ marginRight: 10 }} />
      <PanTool size={50} style={{ marginRight: 10 }} />
      <ScreenLockPortrait size={50} style={{ marginRight: 10 }} />
      <SentimentSatisfied size={50} style={{ marginRight: 10 }} />
      <Settings size={50} style={{ marginRight: 10 }} />
      <SettingsApplications size={50} style={{ marginRight: 10 }} />
      <Stars size={50} style={{ marginRight: 10 }} />
    </div>
  )
}

export interface IconProps {
  style?: React.CSSProperties
  size?: number
  color?: string
}
