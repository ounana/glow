/**
 * 图片尺寸信息
 */
export const IMAGE_H = 28
export const IMAGE_W = 28
export const IMAGE_SIZE = IMAGE_H * IMAGE_W

/**
 * 图片像素点数据
 * 每784个位置表示一个图片
 * 每一个位置用三十二位浮点数存储一个像素点的灰度值，占用4个字节
 * 
 * Float32Array 用用三十二位浮点数存储
 * length = 65000 * 784 | byteLength = 65000 * 784 * 4
 */
const NUM_DATASET_ELEMENTS = 65000
const MNIST_IMAGES_SPRITE_PATH = './mnist_images.png'

/**
 * 图片的真实值数据
 * Uint8Array 用8位无符号整数存储
 * length = 65000 * 10 | byteLength = 65000 * 10
 * 
 * 用每十个字节位来表示 0 ~ 9
 * 1000000000 => 0
 * 0100000000 => 1
 * 0100000001 => 9
 */
export const NUM_CLASSES = 10
const MNIST_LABELS_PATH = './mnist_labels_uint8'

/**
 * 取前五万张
 */
const NUM_TRAIN_ELEMENTS = 50000

export function loadImageData(): Promise<Float32Array> {
  return new Promise((resolve) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    img.src = MNIST_IMAGES_SPRITE_PATH
    img.crossOrigin = ''
    img.onload = () => {
      img.width = img.naturalWidth
      img.height = img.naturalHeight
      const datasetBytesBuffer = new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE * 4);
      const chunkSize = 5000
      canvas.width = img.width
      canvas.height = chunkSize
      for (let i = 0; i < NUM_DATASET_ELEMENTS / chunkSize; i++) {
        const datasetBytesView = new Float32Array(
          datasetBytesBuffer,
          i * IMAGE_SIZE * chunkSize * 4,
          IMAGE_SIZE * chunkSize
        )
        ctx.drawImage(img, 0, i * chunkSize, img.width, chunkSize, 0, 0, img.width, chunkSize)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let j = 0; j < imageData.data.length / 4; j++) {
          // 因为图像是灰度的，所以所有通道的值都相等，所以只要红色通道
          datasetBytesView[j] = imageData.data[j * 4] / 255;
        }
      }
      const datasetImages = new Float32Array(datasetBytesBuffer)
      const res = datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS)
      resolve(res)
    }
  })
}

export function loadLabelData(): Promise<Uint8Array> {
  return new Promise(async (resolve) => {
    const labelsResponse = await fetch(MNIST_LABELS_PATH).then(r => r.arrayBuffer())
    const datasetLabels = new Uint8Array(labelsResponse)
    const res = datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS)
    resolve(res)
  })
}