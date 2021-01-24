import { useState } from "react"

export default function ImageUpload() {
  const [src, setSrc] = useState('')
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const file = files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64Url = reader.result as string
      setSrc(base64Url)
    }
  }
  return (
    <div>
      <input type="file" onChange={onInputChange} />
      <img src={src} alt="" />
    </div>
  )
}