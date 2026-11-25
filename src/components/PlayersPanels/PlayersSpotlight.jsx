import { useCallback, useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Flex, Image, Text } from '@chakra-ui/react'

// ─── Jugadores · "Plantel en foco" (solo mobile y tablet) ─────────
// Un jugador grande por vez que avanza solo, como las historias de
// Instagram. Se pasa tocando a los costados de la foto o deslizando;
// abajo, la tira de caritas salta a cualquiera del plantel.
// La autoplay se frena fuera de pantalla, con la ficha abierta y con
// prefers-reduced-motion.

const DURATION = 5000
const EASE = 'cubic-bezier(.23,1,.32,1)'

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2 1l9 5-9 5z" /></svg>
)
const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="3" height="10" /><rect x="7" y="1" width="3" height="10" /></svg>
)

const styles = {
  '.sp-stage': {
    position: 'relative', h: { base: '470px', sm: '560px' }, borderRadius: '16px', overflow: 'hidden', isolation: 'isolate', touchAction: 'pan-y',
    bg: 'radial-gradient(90% 60% at 72% 95%, rgba(201,168,76,.3), transparent 65%), linear-gradient(180deg, #191713, #0a0a0a)',
    border: '1px solid rgba(201,168,76,.25)',
  },
  '.sp-prog': { position: 'absolute', top: '12px', left: '12px', right: '52px', display: 'flex', gap: '4px', zIndex: 5 },
  '.sp-prog > i': { flex: 1, h: '2.5px', borderRadius: '2px', bg: 'rgba(255,255,255,.18)', overflow: 'hidden' },
  '.sp-prog > i > b': { display: 'block', h: '100%', w: '100%', bg: 'brand.gold', transform: 'scaleX(0)', transformOrigin: 'left' },
  '.sp-prog > i.done > b': { transform: 'none' },
  '.sp-slide': { position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 450ms ease', pointerEvents: 'none' },
  '.sp-slide.on': { opacity: 1 },
  '.sp-num': {
    position: 'absolute', left: '-4px', top: '36px', zIndex: -1, fontFamily: 'display', fontSize: { base: '330px', sm: '400px' },
    lineHeight: 0.8, color: 'rgba(201,168,76,.13)',
  },
  '.sp-photo': {
    position: 'absolute', right: '-40px', bottom: 0, h: '90%', w: 'auto', maxW: 'none', zIndex: -1,
    transform: 'translateX(24px)', transition: `transform 700ms ${EASE}`, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,.65))',
  },
  '.sp-slide.on .sp-photo': { transform: 'none' },
  '.sp-slide::after': { content: '""', position: 'absolute', inset: 0, zIndex: -1, bg: 'linear-gradient(180deg, transparent 42%, rgba(8,8,8,.95) 80%)' },
  '.sp-info': {
    position: 'absolute', left: '16px', right: '16px', bottom: '16px', display: 'flex', flexDirection: 'column', gap: '9px',
    transform: 'translateY(12px)', opacity: 0, transition: `transform 550ms ${EASE} 120ms, opacity 400ms ease 120ms`,
  },
  '.sp-slide.on .sp-info': { transform: 'none', opacity: 1 },
  '.sp-zone': { position: 'absolute', top: 0, bottom: '150px', zIndex: 4 },
  '.sp-pause': {
    position: 'absolute', top: '4px', right: '8px', zIndex: 6, w: '36px', h: '36px', borderRadius: '50%',
    display: 'grid', placeItems: 'center', color: 'brand.gold', bg: 'rgba(8,8,8,.55)',
  },
  '.sp-reel': { display: 'flex', gap: '12px', overflowX: 'auto', pt: 4, pb: 1, px: '2px', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } },
  '.sp-av': { flex: '0 0 auto', w: '66px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  '.sp-ring': { w: '62px', h: '62px', borderRadius: '50%', p: '2px', bg: 'rgba(255,255,255,.14)', transition: 'background 300ms ease' },
  '.sp-ring > span': { display: 'block', w: '100%', h: '100%', borderRadius: '50%', overflow: 'hidden', bg: '#1a1814', border: '2px solid #080808', position: 'relative' },
  '.sp-ring img': { position: 'absolute', left: '50%', top: '4px', h: '150%', w: 'auto', maxW: 'none', transform: 'translateX(-50%)' },
  '.sp-av[aria-current="true"] .sp-ring': { bg: 'conic-gradient(#E8C96A, #9A7A35, #E8C96A)' },
  '.sp-av em': { fontStyle: 'normal', fontSize: '10.5px', color: 'brand.whiteMuted', maxW: '66px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  '.sp-av[aria-current="true"] em': { color: 'brand.gold' },
  'button:focus-visible': { outline: '2px solid', outlineColor: 'brand.gold', outlineOffset: '2px' },
  '@media (prefers-reduced-motion: reduce)': { '.sp-slide, .sp-photo, .sp-info, .sp-ring': { transition: 'none !important' } },
}

export default function PlayersSpotlight({ list, statsOf, dorsal, onOpen, modalOpen }) {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [visible, setVisible] = useState(false)
  const rootRef = useRef(null)
  const reelRef = useRef(null)
  const barsRef = useRef([])
  const avRefs = useRef([])
  const elapsed = useRef(0)
  const touchX = useRef(null)

  const n = list.length
  const go = useCallback((i) => { elapsed.current = 0; setCur(((i % n) + n) % n) }, [n])

  // Arranca en el goleador del plantel
  useEffect(() => {
    const top = list.reduce((best, p, i) => ((p.stats.goals ?? -1) > (list[best].stats.goals ?? -1) ? i : best), 0)
    setCur(top)
  }, [list])

  // Solo corre mientras la sección está en pantalla
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    if (rootRef.current) io.observe(rootRef.current)
    return () => io.disconnect()
  }, [])

  const running = !paused && visible && !modalOpen

  // Barra de progreso + avance automático
  useEffect(() => {
    barsRef.current.forEach((b, k) => { if (b) b.style.transform = k < cur ? 'none' : 'scaleX(0)' })
    if (!running) {
      const b = barsRef.current[cur]
      if (b) b.style.transform = `scaleX(${elapsed.current / DURATION})`
      return undefined
    }
    let raf
    let last = performance.now()
    const tick = (now) => {
      elapsed.current += now - last
      last = now
      const p = Math.min(1, elapsed.current / DURATION)
      const b = barsRef.current[cur]
      if (b) b.style.transform = `scaleX(${p})`
      if (p >= 1) go(cur + 1)
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cur, running, go])

  // Centra la carita activa (scrollTo sobre la tira, sin mover la página)
  useEffect(() => {
    const reel = reelRef.current
    const a = avRefs.current[cur]
    if (!reel || !a) return
    reel.scrollTo({ left: a.offsetLeft - reel.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' })
  }, [cur])

  const p = list[cur]

  return (
    <Box ref={rootRef} sx={styles}>
      <Box
        className="sp-stage"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Plantel de Moon Sports Group"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1))
          touchX.current = null
        }}
      >
        <div className="sp-prog" aria-hidden="true">
          {list.map((pl, k) => (
            <i key={pl.id} className={k < cur ? 'done' : undefined}><b ref={(el) => { barsRef.current[k] = el }} /></i>
          ))}
        </div>

        {list.map((pl, k) => (
          <div key={pl.id} className={`sp-slide${k === cur ? ' on' : ''}`} aria-hidden={k !== cur}>
            <span className="sp-num" aria-hidden="true">{dorsal(pl)}</span>
            <img className="sp-photo" src={pl.image} alt="" loading={Math.abs(k - cur) <= 1 ? 'eager' : 'lazy'} />
            <div className="sp-info">
              <Text as="span" fontSize="10.5px" fontWeight={600} letterSpacing="0.22em" textTransform="uppercase" color="brand.gold">{pl.position}</Text>
              <Text as="span" fontFamily="display" fontSize={{ base: '52px', sm: '64px' }} lineHeight={0.86} textTransform="uppercase" color="brand.white">
                {pl.name}
                <Box as="span" display="block" color="brand.gold">{pl.lastname}</Box>
              </Text>
              <Flex as="span" align="center" gap="6px" fontSize="12px" color="brand.cream">
                {pl.escudo && <Image src={pl.escudo} alt="" w="18px" h="18px" objectFit="contain" />}
                {pl.club}
              </Flex>
              <Flex as="span" gap="18px" borderTop="1px solid rgba(255,255,255,0.16)" pt="10px">
                {statsOf(pl).map(([v, label]) => (
                  <Box as="span" key={label} display="flex" flexDirection="column">
                    <Text as="span" fontFamily="label" fontSize="26px" lineHeight={1} color="brand.gold">{v}</Text>
                    <Text as="span" fontSize="9px" letterSpacing="0.16em" textTransform="uppercase" color="rgba(255,255,255,0.45)">{label}</Text>
                  </Box>
                ))}
              </Flex>
              <Flex
                as="button" type="button" tabIndex={k === cur ? 0 : -1} onClick={() => onOpen(pl)}
                alignSelf="flex-start" align="center" gap={2} px={4} py="10px" borderRadius="full" bg="brand.gold" color="brand.black"
                fontSize="11px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" pointerEvents={k === cur ? 'auto' : 'none'}
              >
                Ver ficha <ArrowRight />
              </Flex>
            </div>
          </div>
        ))}

        {/* Toques: izquierda = anterior · centro = ficha · derecha = siguiente */}
        <button type="button" className="sp-zone" style={{ left: 0, width: '30%' }} aria-label="Jugador anterior" onClick={() => go(cur - 1)} />
        <button type="button" className="sp-zone" style={{ left: '30%', width: '40%' }} aria-label={`Abrir ficha de ${p.name} ${p.lastname}`} onClick={() => onOpen(p)} />
        <button type="button" className="sp-zone" style={{ right: 0, width: '30%' }} aria-label="Jugador siguiente" onClick={() => go(cur + 1)} />
        <button type="button" className="sp-pause" aria-label={paused ? 'Reproducir' : 'Pausar'} onClick={() => setPaused((v) => !v)}>
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </Box>

      {/* Tira de caritas */}
      <div ref={reelRef} className="sp-reel" aria-label="Todo el plantel">
        {list.map((pl, k) => (
          <button
            type="button"
            key={pl.id}
            ref={(el) => { avRefs.current[k] = el }}
            className="sp-av"
            aria-current={k === cur}
            aria-label={`${pl.name} ${pl.lastname}`}
            onClick={() => go(k)}
          >
            <span className="sp-ring"><span><img src={pl.image} alt="" loading="lazy" /></span></span>
            <em>{pl.lastname}</em>
          </button>
        ))}
      </div>

      <Flex justify="space-between" align="center" pt={3}>
        <Text fontSize="11px" letterSpacing="0.18em" textTransform="uppercase" color="rgba(255,255,255,0.42)">{n} representados</Text>
        <Flex as={RouterLink} to="/jugadores" align="center" gap="6px" fontSize="11px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="brand.gold">
          Ver todos <ArrowRight />
        </Flex>
      </Flex>
    </Box>
  )
}
