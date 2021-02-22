# TensorFlow

## tf.tensor(values, shape?, dtype?): tf.Tensor
创建规定形状类型的张量
``` ts
tf.tensor([1, 2, 3, 4])
// Tensor [1, 2, 3, 4]
tf.tensor([[1, 2], [3, 4]])
// Tensor [[1, 2], [3, 4]]
tf.tensor([1, 2, 3, 4], [2, 2])
// Tensor [[1, 2], [3, 4]]
```
Parameters:
* values (TypedArray | Array) 可以是一纬和多维数组
* shape (number[]) 整型数组，表示张量的形状
* dtype ('float32'|'int32'|'bool'|'complex64'|'string')

## tf.tensorNd
创建不同维度的张量，使代码更易读
* tf.tensor1d (values, dtype?): tf.Tensor1D
* tf.tensor2d (values, shape?, dtype?): tf.Tensor2D
* tf.tensor3d (values, shape?, dtype?): tf.Tensor3D
* tf.tensor4d (values, shape?, dtype?): tf.Tensor4D
* tf.tensor5d (values, shape?, dtype?): tf.Tensor5D
* tf.tensor6d (values, shape?, dtype?): tf.Tensor6D
``` ts
tf.tensor1d([1, 2, 3, 4])
// Tensor [1, 2, 3, 4]
tf.tensor2d([1, 2, 3, 4], [2, 2])
// Tensor [[1, 2], [3, 4]]
```

## tf.zeros(shape, dtype?): tf.Tensor
创建所有元素都设置为0的张量
``` ts
tf.zeros([2, 2])
// Tensor [[0, 0], [0, 0]]
```

## tf.zerosLike(x): tf.Tensor
创建张量所有元素都设置为0，形状与给定的张量相同。
```ts
const x = tf.tensor([1, 2])
tf.zerosLike(x)
// Tensor [0, 0]
```

## f.ones(shape, dtype?): tf.Tensor
创建所有元素都设置为1的张量
```ts
tf.ones([2, 2])
// Tensor [[1, 1], [1, 1]]
```

## tf.onesLike(x): tf.Tensor
创建张量所有元素都设为1，形状与给定张量相同。
```ts
const x = tf.tensor([1, 2])
tf.onesLike(x)
// Tensor [1, 1]
```

## tf.fill(shape, value, dtype?): tf.Tensor
创建张量所有元素用标量值填充
```ts
tf.fill([2, 2], 4)
// Tensor [[4, 4], [4, 4]]
```

## tf.print(x, verbose?): void
打印张量信息包括它的数据
```ts
tf.tensor2d([1, 2, 3, 4], [2, 2]).print(true)
```
Parameters:
* x (tf.Tensor) 要打印的张量
* verbose (boolean) 是否打印张量的详细信息

## tf.range(start, stop, step?, dtype?): tf.Tensor1D
创建一个一维张量，按照范围创建，可设置步调
```ts
tf.range(0, 9, 2)
// Tensor [0, 2, 4, 6, 8]
```

## tf.linspace(start, stop, num): tf.Tensor1D
返回给定间隔内的等距数字序列
```ts
tf.linspace(0, 9, 10).print();
// Tensor [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## tf.clone(x): tf.Tensor
创建与指定张量具有相同值和形状的新张量
```ts
const x = tf.tensor([1, 2])
x.clone().print()
```