import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { position } from './utils'
import './styles.scss'

const Portal = ({ children }) => {
  const [node, setNode] = useState()

  useEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    setNode(node)
    return () => {
      document.body.removeChild(node)
    }
  }, [])

  return node ? ReactDOM.createPortal(children, node) : null
}

const Popover = ({ children, targetRef }) => {
  const popoverRef = useRef()
  const [styles, setStyles] = useState({})

  function initRef(node) {
    if (node && !popoverRef.current) {
      popoverRef.current = node
      const targetRect = targetRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      setStyles(position(targetRect, popoverRect))
    }
  }

  return (
    <Portal>
      <div ref={initRef} className="popover" style={{ position: 'absolute', ...styles }}>
        {children}
      </div>
    </Portal>
  )
}

const Define = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const buttonRef = useRef()

  return (
    <>
      <button ref={buttonRef} onClick={() => setOpen(!open)} className="as-link">
        {children}
      </button>
      {open && (
        <Popover targetRef={buttonRef}>Hooks are a way to compose behavior into components</Popover>
      )}
    </>
  )
}

export default function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>. They work with function-components and
      they give us an ability to use state and other React features similarly to class-based
      components.
    </p>
  )
}