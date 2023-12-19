# Echo
这是一款可以滚动输出文本的工具，可以用在对话框之类的应用场景中。

- [示例文案](doc/model_text.md)

## 消息格式
支持输入 String、Array、Object 类型的消息。当类型为 String 时，消息将被直接使用。当类型为 Object 时，消息会被序列化后再使用。当类型为 Array 时，将会遍历每一个子元素进行上述操作。

每一个 Object 消息对象包含以下值：

| 名称 | 类型 | 描述 |
| - | - | - |
| text | String | 【必选】显示的文本。 |
| class | String | 文本的 class 属性。 |
| style | Object | 文本的自定义样式。Echo 本身不定义样式，样式需要下游代码实现。 |
| pause | Number | 当前文本输出完毕后的停顿时间。( `Echo.printSpeed * pause` ms ) |
| speed | Number | 当前文本的打印速度，即每个打印循环所用时间（ms）。 |
| typewrite | String | 模拟打字动作。在输出 `text` 字段的内容之前先打印此字段的内容，随后被 `text` 字段的内容替换。 |
| event | String | 自定义事件名。 |

## 消息队列格式
消息队列为 Array 类型，每一个数组元素包含以下值：

| 名称 | 类型 | 描述 |
| - | - | - |
| message | String / Array / Object | 消息对象。 |
| data | Object | 打印启动参数。 |

## 打印启动参数格式
打印启动参数为 Object 类型，包含以下值：

| 名称 | 类型 | 描述 |
| - | - | - |
| printSpeed | Number | 打印速度。 |

## 类：Echo
### 构建参数
| 名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| $sel | String | 见 [#rd](#rd)。内容为空则不执行 `rd()` 方法。 | '' |

### 属性
| 名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| message | String / Array / Object | 上一条消息。 | '' |
| messageBuffer | Array | 消息缓冲区。 | [] |
| messageList | Array | 消息队列。 | [] |
| dbChrBuffer | String | 中日韩字符缓冲区。 | '' |
| timer | Number | 定时器 ID。 | 0 |
| groupCount | Number | 分组计数。 | 0 |
| groupStack | Array | 分组堆栈。 | [] |
| printSpeed | Number | 打印速度。 | 30 |
| printSpeedStart | Number | 启动时的打印速度。 | 30 |
| printSpeedChange | Number | 打印过程中的打印速度。 | 30 |
| state | String | 运行状态。 | 'stop' |
| typewrite | String | 打字动作状态。 | 'none' |
| filter | Object | 过滤器状态开关。 | 见下文。 |
| event | Object | 用于绑定事件。 | 略 |

#### 属性 filter 中的值
| 名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| HTMLFormat | Boolean | HTML 格式化，用于过滤空格、尖括号等可能影响 HTML 渲染的字符，阻止脚本注入。 | true |

### rd
快速部署，需要 JQuery 支持，适用于简单的应用场景，仅提供基本功能，不支持自定义样式、动作等高级功能。
| 名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| $sel | String | JQuery 选择器，选择需要输出的元素。 |  |

### ~~backspace~~
退格，触发 `backspace` 事件。（弃用方法，需要重写）

### clear
清空内容，触发 `clear` 事件。

### groupEnd
分组结束，触发 `groupEnd` 事件。

### groupStart
分组开始，触发 `groupStart` 事件。

| 参数名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| obj | Object | 产生新分组的序列对象。 | |

### messageSerialize
序列化消息对象。

| 参数名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| msg | String / Array / Object | 消息对象。 | |

### next
打印消息队列中的下一条消息，触发 `next` 事件。

### on
绑定事件。可绑定的事件详见[事件列表](doc/event.md)。

| 参数名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| eventName | String | 事件名称。| |
| action | Function | 函数。| function() {} |

### print
尝试从消息缓冲区中打印新字符，触发 `print` 事件。首次打印触发 `printStart` 事件，最后一次打印结束后触发 `printEnd` 事件。

| 参数名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| that | String | Echo 对象自己，用于修正定时器 this 问题。 | this |

### send
开始打印新消息，触发 `send` 事件。

| 参数名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| text | String / Array / Object | 消息对象。 | |
| data | Object | 打印启动参数。 | {} |

### sendList
使用消息队列开始打印新消息，依次触发 `sendList`、`next`、`send` 事件。

| 参数名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| messageList | Array | 消息队列。 | |

### ~~skip~~
跳过打印过程，立即输出完整内容，触发 `skip` 事件。（弃用方法，需要重写）

### speed
在打印过程中修改打印速度。

| 参数名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| value | Number | 定时器延时毫秒。 | undefined |

### stop
立即停止打印，触发 `stop` 事件，且不触发其他事件。

### typewriteEnd
打字动作效果结束，触发 `typewriteEnd` 事件。
