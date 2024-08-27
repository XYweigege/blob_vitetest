## 用 hook 封装一个 Modal

```jsx
import React, { useCallback, useRef } from 'react'
import ReactDOM from 'react-dom'
import CommonModal, { IProps as ModalProps } from './index'


const Modal: React.FC<ModalProps> = React.memo(({ visible, ...res }) => <CommonModal visible={ visible } { ...res } />)

type IProps = Pick<ModalProps, 'mainText' | 'subText' | 'btnText' | 'type' | 'onClose'>

const useCommonModal = (
  props: IProps,
): {
  closeModal: () => void
  showModal: () => void
} => {

  const domRef = useRef(null)

  /**
   *  关闭弹窗
   */
  const closeModal = useCallback(() => {

    const dom = domRef.current

    ReactDOM.unmountComponentAtNode(dom)

    if (dom && dom.parentNode) {
      dom.parentNode.removeChild(dom)
    }

    const { onClose } = props
    if (typeof onClose === 'function') {
      onClose()
    }
  }, [props])

  /**
   *  展示弹窗
   */
  const showModal = useCallback(() => {
    const Root = document.body

    if (!domRef.current) {
      // 创建一个dom
      domRef.current = document.createElement('div')
      Root.appendChild(domRef.current)
    }

    const dom = domRef.current

    const ele = React.createElement(
      Modal,
      {
        visible: true,
        onClose: closeModal,
        onClickBtn: closeModal,
        maskClosable: true,
        ...props,
      },
      null,
    )
    ReactDOM.render(ele, dom)
  }, [closeModal, props])

  return {
    closeModal,
    showModal,
  }
}

export default useCommonModal


```

使用该 hook

```js
const { show, close } = useCommonModal({
  title: "",
  content: "",
  btnText: "",
});
```
