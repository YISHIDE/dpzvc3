# dpzvc3-ui

## 一、说明

> 一套基于 **Vue 3.X** 的h5移动端通用组件库，提供丰富 UI 组件，兼容最新Vue3.x +Typescript Cli项目（可以在Vue3.x+ Typescript Cli项目直接引用组件并使用）使用最新的Webpack5构建，并支持 组件以及CSS样式**全量引入** 和 **按需引入**，同时提供公共样式、基础工具样式和服务组件方法（如 Message、Modal、Indicator）。会一直不断完善体验，使用过程有问题欢迎在https://github.com/yishide/dpzvc3/issues提交bug，看到了会及时修复！！！

---

## 二、组件库预览地址（查看各个组件库的使用效果）
```bash
   https://yishide.github.io/dpzvc3/#/guide
```
---

## 三、安装

```bash
npm install dpzvc3-ui

```
---


## 四、全量使用


全量引入组件库，包括 JS 组件和全量 CSS 样式（适合小型项目或快速开发）。

1. 引入组件库 JS

```bash
import { createApp } from 'vue'
import App from './components/app.vue'
import dpzvc3 from 'dpzvc3-ui'

// 1️⃣ 创建 app
const app = createApp(App)

// 2️⃣ 安装你的组件库
app.use(dpzvc3)
```

2. 引入全量样式

/* 在入口文件或全局样式中引入 */
```bash
@import "~dpzvc3-ui/dist/styles/dpzvc3.css";
```

此方式会包含 components、base、utils 下的全部样式。
---

## 五、按需使用

按需引入可以减小打包体积，只引入你需要的组件及样式。

1. 引入组件
```bash
import { createApp } from 'vue'
import App from './components/app.vue'
import { VButton, Badge } from 'dpzvc3-ui'

// 1️⃣ 创建 app
const app = createApp(App)

// 2️⃣ 安装你的组件库
app.use(VButton)
app.use(Badge)
```

2. 引入组件 CSS
```bash
@import "~dpzvc3-ui/dist/styles/components/button.css";
@import "~dpzvc3-ui/dist/styles/components/badge.css";
```
3. 公共样式按需引入（可选）建议全部加上
```bash
@import "~dpzvc3-ui/dist/styles/base/font.css";
@import "~dpzvc3-ui/dist/styles/base/variable.css";
@import "~dpzvc3-ui/dist/styles/base/reset.css";
@import "~dpzvc3-ui/dist/styles/utils/1px.css";
@import "~dpzvc3-ui/dist/styles/utils/animation.css";
@import "~dpzvc3-ui/dist/styles/utils/nowrap.css";
```
注意：按需引入组件时，如果组件依赖变量或 mixin，需要保证 base / utils 样式已引入。

---

## 六、服务组件使用

dpzvc3-ui 提供一些 服务组件，无需注册即可使用，如：
	•	Message
	•	Modal
	•	Prompt
	•	Indicator

使用示例    
```bash
import { createApp } from 'vue'
import App from './components/app.vue'
import { Message, Modal, Prompt, Indicator } from 'dpzvc3-ui'

// 1️⃣ 创建 app
const app = createApp(App)

// 2️⃣ 安装你的组件库
app.use(Message)
app.use(Modal)
app.use(Prompt)
app.use(Indicator)

// 直接使用服务组件 this指向Vue实例
需要拿到vue实例
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() // 用于访问全局 当前vue组件实例
proxy.$Message.show('操作成功！')
proxy.$Modal.confirm({body:'这是内容',onOk:function(){})
proxy.$Prompt.info({title:'Prompt',spec:'ccc',text:'vvvv'})
proxy.$Indicator.blade()

```

---

## 七、目录结构（dist 打包示例）
```bash
dist/
 └── styles/
      ├── dpzvc3.css               # 全量 CSS
      ├── components/
      │     ├── button.css
      │     ├── badge.css
      │     └── ...
      ├── base/
      │     ├── reset.css
      │     ├── variables.css
      │     └── ...
      └── utils/
            ├── mixins.css
            └── ...
```            
---            

## 八、开发和调试
	开发组件请放在 src/components
	•	公共变量、样式放在 src/styles/base
	•	工具 mixin 放在 src/styles/utils
	•	组件样式放在 src/styles/components
	•	Gulp 任务已支持按需打包和全量打包
---
## 九、注意事项

	1.	按需引入组件时，请确保 依赖的 base / utils 样式 已引入，否则可能出现变量未定义的错误。
	2.	服务组件如 Message、Modal 等无需单独注册，全局可直接使用。
	3.	全量引入适合快速开发，但会增加打包体积；按需引入可减小体积，推荐生产环境使用。

⸻

现在可以开始在项目中愉快地使用 dpzvc3-ui 组件库了 🎉
---

## 十、我要支持作者
如果该项目组件库帮到了您，节省了您宝贵的开发时间，还请您不吝给项目点个免费的赞。
当然了，如果您能请作者喝杯咖啡，哪怕喝瓶娃娃哈矿泉水，也是对作者最真诚的鼓励，
![微信收款码打赏图片](images/IMG_2614.JPG)
![支付宝收款码打赏图片](images/IMG_2615.JPG)

