import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGsapReveal
 * Attach to a container ref — animates all children with
 * class .gsap-reveal on scroll into view.
 *
 * @param {string} direction - 'up' | 'left' | 'right'
 * @param {number} stagger   - stagger delay between children (default 0.12)
 */
export function useGsapReveal(direction = 'up', stagger = 0.12) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    const fromVars = {
      opacity: 0,
      y: direction === 'up'    ?  50 : 0,
      x: direction === 'left'  ? -60 : direction === 'right' ? 60 : 0,
    }

    const ctx = gsap.context(() => {
      const els = ref.current.querySelectorAll('.gsap-reveal')
      if (els.length === 0) return

      gsap.fromTo(
        els,
        fromVars,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [direction, stagger])

  return ref
}

/**
 * useGsapCounter
 * Animates a number counter when element enters viewport.
 */
export function useGsapCounter(target, suffix = '+') {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate() {
              if (ref.current) {
                ref.current.textContent = Math.round(this.targets()[0].val) + suffix
              }
            },
          })
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [target, suffix])

  return ref
}
