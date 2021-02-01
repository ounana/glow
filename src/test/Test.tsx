import { Button, Divider, Input } from "antd"
import { useState } from "react"
import { getCookie, setCookie } from "./cookie"


export default function Test() {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')

  return (
    <div style={{ padding: '50px' }}>
      <Input value={key} style={{ width: 200 }} onChange={v => setKey(v.target.value)} />
      <Input value={value} style={{ width: 200 }} onChange={v => setValue(v.target.value)} />
      <Button onClick={() => setCookie({ key, value })}>设置</Button>
      <Divider />
      <Input value={search} style={{ width: 200 }} onChange={v => setSearch(v.target.value)} />
      <Button onClick={() => console.log(
        getCookie(search)
      )}>获取</Button>
    </div>
  )
}