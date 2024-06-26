# Echo 事件
## ~~backspace~~
退格事件，由 `backspace()` 方法触发，弃用。

## clear
清空事件，由 `clear()` 方法触发。开始打印时触发。

## customData
自定义数据，根据数据的存放位置不同分别由 `send()`、`groupStart()` 方法触发，在 `customEvent` 事件之后。

| 参数类型 | 描述 |
| - | - |
| Object | 自定义数据。 |

## customEvent
自定义事件，由 `groupStart()` 方法触发，在 `groupStart` 事件之前。

| 参数类型 | 描述 |
| - | - |
| String | 自定义事件名。 |

## customSequence 
自定义序列，在打印过程中遇到自定义序列时触发。

| 参数类型 | 描述 |
| - | - |
| Object | 自定义序列数据。 |

## groupEnd
分组结束事件，由 `groupEnd()` 方法触发。当消息对象中的段落打印完成时触发。

| 参数类型 | 描述 |
| - | - |
| Object | [序列化](../README.md#messageserialize)后的分组结束标志对象。 |

## groupStart
分组开始事件，由 `groupStart()` 方法触发。当消息对象中的段落开始打印时触发。

| 参数类型 | 描述 |
| - | - |
| Object | [序列化](../README.md#messageserialize)后的分组开始标志对象。 |

## next
打印下一条消息事件，由 `next()` 方法触发。以消息队列开始打印时触发。

| 参数类型 | 描述 |
| - | - |
| Object | 打印所使用的消息队列对象。 |

## print
打印循环事件，由 `print()` 方法触发。打印过程中的每一个打印循环结束时触发。

| 参数类型 | 描述 |
| - | - |
| String | 当前打印循环输出的字符。 |

## printEnd
打印结束事件，由 `print()` 方法触发。打印过程结束时触发。

## printStart
打印开始事件，由 `print()` 方法触发。打印过程开始时触发。

## rubyStart
包含注释内容的文本开始打印事件，由 `groupStart()` 方法触发。

| 参数类型 | 描述 |
| - | - |
| String | 注释内容。 |

## rubyEnd
包含注释内容的文本打印结束事件，由 `groupEnd()` 方法触发。

| 参数类型 | 描述 |
| - | - |
| String | 注释内容。 |

## send
发送消息事件，由 `send()` 方法触发。发送消息时触发，在 `printStart` 事件之前。

## sendList
发送消息队列事件，由 `sendList()` 方法触发。发送消息队列时触发，在 `next`、`send`、`printStart` 事件之前。

## ~~skip~~
跳过事件，由 `skip()` 方法触发，弃用，返回剩余未打印字符（不能正常工作）。

## stop
中断事件，由 `stop()` 方法触发。

## typewriteEnd
打字动作效果结束事件，由 `typewriteEnd()` 方法触发。打字动作效果完成后的下一个打印循环中触发，在 `print` 事件之前。