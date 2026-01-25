import React, { useState } from 'react'
import type { CSSProperties } from 'react'
// import Popup from '@/components/popup'
import { Popup } from '@dpzvc3/react' // 如果发布包可直接用 '@dpzvc3/react'
import type { PopupProps } from '@dpzvc3/react'
import './popup.css';

type Side = 'top' | 'right' | 'bottom' | 'left'

const sideList: Side[] = ['top', 'right', 'bottom', 'left']

const ViewPopup: React.FC = () => {
  const [side, setSide] = useState<PopupProps['position']>('top')
  const [show, setShow] = useState<PopupProps['modelValue']>(false)
  const [width, setWidth] = useState<PopupProps['width']>('100%')
  const [height, setHeight] = useState<PopupProps['height']>('100%')

  const showPop = (s: Side) => {
    // 先关闭，保证重新触发动画
    setShow(false)

    // React 不需要 nextTick，用微任务即可
    Promise.resolve().then(() => {
      if (!sideList.includes(s)) s = 'top'

      switch (s) {
        case 'top':
          setWidth('100%')
          setHeight('70%')
          break
        case 'right':
          setWidth('70%')
          setHeight('100%')
          break
        case 'bottom':
          setWidth('100%')
          setHeight('70%')
          break
        case 'left':
          setWidth('70%')
          setHeight('100%')
          break
      }

      setSide(s)

      // 等上一次关闭动画结束
      setTimeout(() => {
        setShow(true)
      }, 350)
    })
  }

  return (
    <div className="Popup">
      <button width="50%" onClick={() => showPop('top')}>
        Top
      </button>
      <button width="50%" onClick={() => showPop('right')}>
        Right
      </button>
      <button width="50%" onClick={() => showPop('bottom')}>
        Bottom
      </button>
      <button width="50%" onClick={() => showPop('left')}>
        Left
      </button>

      <Popup
        modelValue={show}
        position={side}
        width={width}
        height={height}
        showMask={true}
        onUpdateModelValue={setShow}
      />
    </div>
  )
}

export default ViewPopup