
export default function Video() {
  return (
    <video
      src="http://www.w3school.com.cn/i/movie.ogg"
      controls={true}
      autoPlay={true}
      style={{
        background: '#000',
        width: 500,
        height: 600
      }}
    >
      您的浏览器不支持 video 标签。
    </video>
  )
}