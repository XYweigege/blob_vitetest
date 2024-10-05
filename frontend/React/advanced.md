advance react

## 编写一个全局组件

react 中没有全局组件和局部组件这个说法，在哪用到就在哪里引入。但是我们可以将组件挂 window，实现全局组件这个功能
目录结构：

components
Message
index.tsx
index.css
Message/index.css

```css
.message {
  width: 160px;
  height: 30px;
  position: fixed;
  top: 10px;
  left: 50%;
  margin-left: -80px;
  background: #fff;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
}
```

Message/index.tsx

创建一个 queue 队列因为可以点击多次需要存到数组，并且累加每次的高度，使元素没有进行重叠，而是顺移，所以需要一个 queue 队列，删除的时候就按顺序删除即可。

```jsx
import ReactDom from 'react-dom/client'
import './index.css'
const Message = () => {
    return (
        <div>
            提示组件
        </div>
    )
}
interface Itesm {
    messageContainer: HTMLDivElement
    root: ReactDom.Root
}
const queue: Itesm[] = []
window.onShow = () => {
    const messageContainer = document.createElement('div')
    messageContainer.className = 'message'
    messageContainer.style.top = `${queue.length * 50}px`
    document.body.appendChild(messageContainer)
    const root = ReactDom.createRoot(messageContainer)
    root.render(<Message />) //渲染组件
    queue.push({
        messageContainer,
        root
    })
    //2秒后移除
    setTimeout(() => {
        const item = queue.find(item => item.messageContainer === messageContainer)!
        item.root.unmount() //卸载
        document.body.removeChild(item.messageContainer)
        queue.splice(queue.indexOf(item), 1)
    }, 2000)
}

//声明扩充
declare global {
    interface Window {
        onShow: () => void
    }
}


export default Message
```

在 main.tsx 注入即可使用 import './components/Message/index.tsx'

App.tsx Card.tsx 使用

```jsx
<button onClick={() => window.onShow()}>确认</button>
```
