import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

export default function CustomCursor() {
  const cursorRef   = useRef(null)
  const followerRef = useRef(null)
  const mousePos    = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })
  const rafRef      = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
    }

    const animate = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.12
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.12
      if (followerRef.current) {
        followerRef.current.style.left = followerPos.current.x + 'px'
        followerRef.current.style.top  = followerPos.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    // Grow cursor on hoverable elements
    const onEnter = () => {
      if (!cursorRef.current || !followerRef.current) return
      cursorRef.current.style.width    = '20px'
      cursorRef.current.style.height   = '20px'
      followerRef.current.style.width  = '56px'
      followerRef.current.style.height = '56px'
      followerRef.current.style.opacity = '0.8'
    }
    const onLeave = () => {
      if (!cursorRef.current || !followerRef.current) return
      cursorRef.current.style.width    = '12px'
      cursorRef.current.style.height   = '12px'
      followerRef.current.style.width  = '36px'
      followerRef.current.style.height = '36px'
      followerRef.current.style.opacity = '0.5'
    }

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    addHoverListeners()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  const sharedStyle = {
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    transition: 'width 0.3s, height 0.3s',
  }

  return (
    <>
      {/* Dot */}
      <Box
        ref={cursorRef}
        w="12px"
        h="12px"
        bg="brand.gold"
        mixBlendMode="difference"
        style={sharedStyle}
      />
      {/* Ring */}
      <Box
        ref={followerRef}
        w="36px"
        h="36px"
        border="1.5px solid"
        borderColor="brand.gold"
        opacity={0.5}
        style={{ ...sharedStyle, zIndex: 9998 }}
      />
    </>
  )
}
