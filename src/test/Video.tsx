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
    />
  )
}