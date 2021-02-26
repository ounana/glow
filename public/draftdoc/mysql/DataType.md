# MYSQL数据类型
一个字符=一个汉字=一个字母=一个数字=一个标点符号

## Text 文本

CHAR(size)          固定长度，最多255字符
VARCHAR(size)       可变长度，最多255字符，（如果值的长度大于 255，则被转换为 TEXT 类型）
TEXT                最大长度为 65,535 个字符


## Number 数字

INT
	-2147483648 到 2147483647 常规。0 到 4294967295 无符号*。在括号中规定最大位数。
BIGINT
  -9223372036854775808 到 9223372036854775807 常规。0 到 18446744073709551615 无符号*。在括号中规定最大位数。

## Date 时间

DATE()
  日期。格式：YYYY-MM-DD
  注释：支持的范围是从 '1000-01-01' 到 '9999-12-31'

DATETIME()
  *日期和时间的组合。格式：YYYY-MM-DD HH:MM:SS
  注释：支持的范围是从 '1000-01-01 00:00:00' 到 '9999-12-31 23:59:59'