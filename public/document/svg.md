# svg

## 通用属性
|attribute|value|
|---|---|
|fill|填充颜色 (rgb、颜色、十六进制、none)|
|fill-opacity|填充透明度 (0-1)|
|fill-rule|填充规则 (nonzero非零、evenodd奇偶)|
|opacity|整个元素透明度|
|stroke|轮廓颜色|
|stroke-opacity|轮廓透明度|
|stroke-width|轮廓大小|
|stroke-dasharray|定义虚线|
|stroke-linecap|路径的终结圆角(round、butt、square)|


## `<svg>`
|attribute|value|
|---|---|
|xmlns|命名空间|
|version|版本号|
|width|画布宽度|
|height|画布高度|
|viewBox|[min-x, min-y, width, height] <br/>指定一个矩形区域映射到给定的元素，然后通过修改svg尺寸，可调整大小|

## `<circle>`
|attribute<img width=100/>|value|
|:---|:---|
|cx|x坐标|
|cy|y坐标|
|r|半径|

## `<ellipse>`椭圆
|attribute<img width=100/>|value|
|:---|:---|
|rx x方向半径
|ry y方向半径

## `<rect>`
|attribute<img width=100/>|value|
|:---|:---|
|x|x坐标|
|y|y坐标|
|width|宽|
|height|高|
|rx|x方向圆角|
|ry|y方向圆角|

## `<line>`
|attribute<img width=100/>|value|
|:---|:---|
|x1|起点x坐标|
|y1|起点y坐标|
|x2|终点x坐标|
|y2|终点y坐标|

## `<polygon>`
points  坐标 --至少三个(多个点相连的图形，按顺序相连)

## `<polyline>`
points 坐标 --至少三个(多个点相连，fill要设置为none)

## `<path>`
d  路径
M=moveto  起点
L=lineto  中途点
Z=closepath  关闭路径
(大写表示绝对定位，小写表示相对定位，相对于上一个点)

Q=quadratic Bézier curve  二次贝塞尔曲线
q 150 -300 300 0
q 曲线量 曲线量 结束点点位置
A = elliptical Arc 圆弧
rx ry 旋转角度 大弧(1)还是小弧(0) 顺时针(1)还是逆时针(0) x y圆弧终点的坐标


## `<text>`
|attribute<img width=100/>|value|
|---|---|
|x|x坐标|
|y|y坐标|
|dx|x偏移量|
|dy|y偏移量|
|transform|旋转-rotate(30 20,40)|

## `<textPath>`
|attribute<img width=100/>|value|
|---|---|
|xlink:href|链接路径id|

## `<g>`
(把一些图形放在一起，可统一样式)
|attribute<img width=100/>|value|
|:---|:---|
|font|字体类型|
|font-size|字体大小|
|text-anchor|字体布局(middle)|

## `<filter>` 滤镜
id:滤镜的唯一名称

|标签|说明|参数
|---|---|---|
|`<feOffset>`|控制阴影图形|dx:x偏移 dy:y偏移|
|`<feGaussianBlur>`|控制阴影图形模糊|stdDeviation:模糊量|
|`<feBlend>`|是否显示原始图形|in:是否使用原始颜色|
|`<feColorMatrix>`|过滤器是用来转换偏移的图像使之更接近黑色的颜色|

## `<linearGradient>` 滤镜
|属性|值|
|:---|:---|
|offset|偏移位置|
|stop-color|偏移颜色|
|stop-opacity|偏移透明度|

水平渐变：x1="0%" y1="0%" x2="100%" y2="0%"

垂直：x1="0%" y1="0%" x2="0%" y2="100%"


## 其他标签
|标签|用途|
|:---|:---|
|`<defs>`|定义后续需要使用的引用图形|
|`<tspan>`|子文本标签|
|`<a>`|链接标签 -xlink:href|