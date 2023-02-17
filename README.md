# Echo
这是一款可以滚动输出文本的工具，可以用在对话框之类的应用场景中。

<details>
<summary>示例文案</summary>

```
echo.send([
	{
		text: '大地被起因不明的天灾四处肆虐，经由天灾席卷过的土地上出现了大量的神秘矿物——',
		pause: 20
	},
	{
		text: '“源石”',
		bold: true,
	},
	{
		text: '。',
		pause: 20
	},
	'依赖于技术的进步，源石蕴含的能量投入工业后使得文明顺利迈入现代，与此同时，源石本身也催生出',
	{
		text: '“感染者”',
		color: 'red'
	},
	{
		text: '的存在。',
		pause: 20
	},
	{
		text: '“感染者”',
		color: 'red'
	},
	{
		text: '是身俱力量与不幸的存在，如今他们中的一部分，妄图与源石整合为一，为大地带来新的秩序。',
		pause: 20
	},
	{
		text: '这场战火阴谋是我们对抗天灾遇到的新的阻碍。',
		underline: true,
		pause: 20
	},
	{
		text: '你将作为罗德岛的一员，与罗德岛公开领导人阿米娅一同，雇佣人员频繁进入天灾影响后的高危地区，救助受难人群，处理矿石争端，',
	},
	{
		text: '以及对抗整合运动——',
		pause: 20
	},
	{
		text: '“罗德岛”',
		bold: true,
	},
	{
		text: '的战术头脑，',
		pause: 20
	},
	{
		text: '你准备好了吗？',
		pause: 20
	},
])
```

</details>

## 消息格式
支持输入 String、Array、Object 类型的消息。当类型为 String 时，消息将被直接使用。当类型为 Object 时，消息会被序列化后再使用。当类型为 Array 时，将会遍历每一个子元素进行上述操作。

每一个 Object 消息对象包含以下值：

| 名称 | 类型 | 描述 |
| - | - | - |
| text | String | 【必选】显示的文本。 |
| color | String | 文本颜色，可使用任何可被 CSS 识别的颜色格式。 |
| bold | Boolean | 是否为粗体。 |
| underline | Boolean | 是否有下划线。 |
| class | String | 该段消息的 class 属性。 |
| pause | Number | 当前文本输出完毕后的停顿时间。( `Echo.printSpeed * pause` ms ) |

## 类：Echo
### 属性
| 名称 | 类型 | 描述 | 默认值 |
| - | - | - | - |
| message | String / Array / Object | 上一条消息。 | '' |
| messageBuffer | Array | 消息缓冲区。 | [] |
| dbChrBuffer | String | 中日韩字符缓冲区。 | '' |
| timer | Number | 定时器ID。 | 0 |
| groupCount | Number | 分组计数。 | 0 |
| groupStack | Array | 分组堆栈。 | [] |
| printSpeed | Number | 打印速度。 | 30 |
| state | String | 运行状态。 | 'stop' |
| event | Object | 用于绑定事件。 | 略 |

### backspace
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

### on
绑定事件。

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
| data | Object | 额外参数。 | {} |

### skip
跳过打印过程，立即输出完整内容，触发 `skip` 事件。（弃用方法，需要重写）