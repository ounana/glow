# TensorFlow

## tf.tensor (values, shape?, dtype?)
创建一个规定形状类型的tf.Tensor。下面API创建不同维度的tf.Tensor使代码更易读。

* tf.tensor(values, shape?, dtype?): tf.Tensor
* tf.tensor1d (values, dtype?): tf.Tensor1D
* tf.tensor2d (values, shape?, dtype?): tf.Tensor2D
* tf.tensor3d (values, shape?, dtype?): tf.Tensor3D
* tf.tensor4d (values, shape?, dtype?): tf.Tensor4D
* tf.tensor5d (values, shape?, dtype?): tf.Tensor5D
* tf.tensor6d (values, shape?, dtype?): tf.Tensor6D

``` ts
tf.tensor([1, 2, 3, 4], [4])
tf.tensor1d([1, 2, 3, 4])
// Tensor
//     [1, 2, 3, 4]
tf.tensor([1, 2, 3, 4], [2, 2])
tf.tensor([[1, 2], [3, 4]])
tf.tensor2d([1, 2, 3, 4], [2, 2])
// Tensor
//    [[1, 2],
//     [3, 4]]
```

## tf.zeros (shape, dtype?)
创建一个tf. Tensor，所有元素都设置为0。
``` ts
tf.zeros([2, 2]).print()
```

Parameters:
* shape(number[]) 定义输出张量形状的整数数组
* dtype?('float32'|'int32'|'bool'|'complex64'|'string')

Renturns: tf. Tensor
