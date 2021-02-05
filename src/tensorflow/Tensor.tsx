import { PureComponent } from "react";
import * as tf from '@tensorflow/tfjs';
import { data } from './data'

/**
 * Tensor -> 张量
 * 
 * tf.tensor<R extends Rank>(
 * values: TensorLike, shape?: ShapeMap[R], dtype?: DataType
 * ): Tensor<R>
 * 
 * values 值
 * shape  形状
 * dtype  类型
 * 
 * 1d = [1,2,3]
 * 2d = [[1],[2],[3]]      shape [3, 1]
 * 3d = [[[1,2]],[[3,4]]]  shape [2, 1, 2]
 * 4d = [[[[1]]],[[[2]]]]  shpe  [2, 1, 1, 1]
 */

export default class TestTensor extends PureComponent {
  componentDidMount() {
    this.trainIris()
  }
  tensor() {
    //一个2层张量，第一层三个值，第二层两个值
    const a = tf.tensor([1, 2, 3, 4, 5, 6], [3, 2])
    console.log(a)
    a.print()
    //返回多维数组的值
    console.log(a.arraySync())
    // 返回张量所包含的所有值的一维数组
    console.log(a.dataSync())
  }
  tensorD() {
    tf.tensor1d([1, 2, 3, 4]).print()
    tf.tensor2d([1, 2], [2, 1]).print()
    /** shape 表示每一层的个数 */
    tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [4, 2, 1]).print()
    tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 1, 2]).print()
  }
  train() {
    // simulation -> y = 2x - 1
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])

    //定义线性回归模型
    const model = tf.sequential()
    //一个神经元 一个输入参数
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
    //损失函数 优化器
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
    model.summary()
    model.fit(xs, ys, {
      epochs: 500,
      callbacks: {
        onEpochEnd: (_, logs) => {
          console.log(logs)
        },
        onTrainEnd: () => {
          const res = model.predict(tf.tensor2d([10], [1, 1])) as tf.Tensor<tf.Rank>
          console.log(res.dataSync())
        }
      }
    })
  }

  trainIris() {
    /**
     * d =[[[5.1, 3.5, 1.4, 0.2], ['setosa']], [[7, 3.2, 4.7, 1.4], ['versicolor']]]
     * xs = [[5.1, 3.5, 1.4, 0.2], [7, 3.2, 4.7, 1.4]]
     * ys = [[1, 0, 0], [0, 1, 0]]
     */
    const d1 = data.map(d => d[0])
    const d2 = data.map(d => [
      d[1][0] === 'setosa' ? 1 : 0,
      d[1][0] === "virginica" ? 1 : 0,
      d[1][0] === "versicolor" ? 1 : 0
    ])
    const xs = tf.tensor2d(d1, [d1.length, 4])
    const ys = tf.tensor2d(d2, [d2.length, 3])

    const numOfFeatures = 4
    const model = tf.sequential()

    //隐藏层
    model.add(tf.layers.dense({
      inputShape: [numOfFeatures], // 4个输入值
      activation: "sigmoid",
      units: 5 //神经元
    }))

    model.add(tf.layers.dense({ activation: "softmax", units: 3 }))
    model.compile({ loss: "categoricalCrossentropy", optimizer: tf.train.adam(0.06) })

    model.fit(xs, ys, {
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, logs: any) => {
          console.log("Epoch: " + epoch + " Loss: " + logs.loss)
        },
        onTrainEnd: () => {
          // Setosa
          // const testVal = tf.tensor2d([4.4, 2.9, 1.4, 0.2], [1, 4])
          // Versicolor
          // const testVal = tf.tensor2d([6.4, 3.2, 4.5, 1.5], [1, 4])
          // Virginica
          const testVal = tf.tensor2d([5.8, 2.7, 5.1, 1.9], [1, 4])
          const prediction = model.predict(testVal) as tf.Tensor
          prediction.print()
          //返回每行最大值的索引
          const pIndex: any = tf.argMax(prediction, 1).dataSync()
          const classNames = ["Setosa", "Virginica", "Versicolor"]
          console.log(classNames[pIndex])
        }
      }
    })
  }
  render() {
    return (
      <div>
        <h1>Tensor 张量</h1>
      </div>
    )
  }
}