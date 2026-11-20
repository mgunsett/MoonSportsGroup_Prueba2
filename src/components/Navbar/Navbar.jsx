import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Image, Text, useDisclosure,
} from '@chakra-ui/react'
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import gsap from 'gsap'
import logo from '../../assets/images/logo_principal.webp'
import { useWeekAgenda } from '../../hooks/useWeekAgenda'

// ─── NAVBAR · Barra ──────────────────────────────────────────────
// Barra de ancho completo con la marca escrita. Transparente sobre el
// Hero, sólida al bajar y con una línea dorada de progreso de lectura.
// Marca la sección en la que estás. En mobile, el menú es una hoja que
// sube desde abajo (igual que la agenda).

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/moonsportsgroup_/', icon: FaInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/moon-sports-group/', icon: FaLinkedinIn },
  { label: 'WhatsApp', href: 'https://wa.me/5491100000000', icon: FaWhatsapp },
]

// Mismo orden que las secciones de la home. "Inicio" va en el logo.
// `section` es el id que se marca como activo al scrollear la home.
const NAV_LINKS = [
  { label: 'Jugadores', to: '/jugadores', section: 'jugadores-home', hint: 'Nuestros representados' },
  { label: 'Agenda', to: '/', hash: '#agenda', section: 'agenda' },
  { label: 'Servicios', to: '/', hash: '#services', section: 'services', hint: 'Qué hacemos por cada carrera' },
  { label: 'Nosotros', to: '/', hash: '#nosotros', section: 'nosotros', hint: 'Quiénes somos' },
  { label: 'Contacto', to: '/', hash: '#contacto', section: 'contacto', hint: 'WhatsApp, email y redes' },
]
const SECTION_IDS = ['hero', ...NAV_LINKS.map((l) => l.section)]

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Navbar() {
  const navRef = useRef(null)
  const progressRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const menu = useDisclosure()
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState(null)
  const isHome = location.pathname === '/'

  // "Agenda" sólo aparece cuando la sección tiene partidos esta semana.
  const { matches } = useWeekAgenda()
  const links = NAV_LINKS.filter((l) => l.section !== 'agenda' || matches.length > 0)
  const agendaHint = `${matches.length} ${matches.length === 1 ? 'partido' : 'partidos'} esta semana`

  // Cerrar el menú al cambiar de ruta
  useEffect(() => { menu.onClose() }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Entrada
  useEffect(() => {
    if (reduceMotion()) return
    gsap.fromTo(navRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 })
  }, [])

  // Fondo sólido, progreso de lectura y sección activa
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setSolid(y > 40)
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`

      if (!isHome) { setActive(location.pathname.startsWith('/jugadores') ? 'jugadores-home' : null); return }
      const line = y + window.innerHeight * 0.35
      let current = 'hero'
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + y <= line) current = id
      })
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [isHome, location.pathname])

  const hrefOf = (l) => (l.hash ? `${l.to}${l.hash}` : l.to)

  // En la home, los links a secciones hacen scroll suave en vez de navegar
  const handleClick = (e, l) => {
    menu.onClose()
    if (l.hash && isHome) {
      e.preventDefault()
      document.querySelector(l.hash)?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' })
    }
  }

  const goHome = (e) => {
    menu.onClose()
    if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' }) }
  }

  const goContact = (e) => {
    menu.onClose()
    e.preventDefault()
    if (isHome) document.getElementById('contacto')?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' })
    else navigate('/#contacto')
  }

  return (
    <>
      <Box
        ref={navRef}
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        pt="env(safe-area-inset-top, 0px)"
        bg={solid ? 'rgba(8,8,8,0.88)' : 'linear-gradient(180deg, rgba(8,8,8,0.75), rgba(8,8,8,0))'}
        backdropFilter={solid ? 'blur(12px)' : 'none'}
        borderBottom="1px solid"
        borderColor={solid ? 'rgba(201,168,76,0.18)' : 'transparent'}
        transition="background-color 300ms ease, border-color 300ms ease"
      >
        <Flex
          maxW="1360px"
          mx="auto"
          h={{ base: solid ? '58px' : '64px', md: solid ? '64px' : '78px' }}
          px={{ base: 4, md: 6 }}
          align="center"
          justify="space-between"
          gap={6}
          transition="height 300ms cubic-bezier(.23,1,.32,1)"
        >
          {/* Marca */}
          <Link to="/" onClick={goHome} aria-label="Moon Sports Group, ir al inicio">
            <Flex align="center" gap={3}>
              <Image src={logo} alt="" w={{ base: '34px', md: '38px' }} h={{ base: '34px', md: '38px' }} filter="brightness(0) invert(1)" />
              <Flex direction="column" lineHeight={0.95} aria-hidden="true">
                <Text fontFamily="label" fontSize={{ base: '19px', md: '21px' }} letterSpacing="0.08em" color="brand.white">MOON SPORTS</Text>
                <Text fontFamily="label" fontSize="12px" letterSpacing="0.5em" color="brand.gold">GROUP</Text>
              </Flex>
            </Flex>
          </Link>

          {/* Links (desktop) */}
          <Flex as="nav" aria-label="Principal" display={{ base: 'none', lg: 'flex' }} gap="30px">
            {links.map((l) => {
              const on = active === l.section
              return (
                <Box
                  key={l.label}
                  as={Link}
                  to={hrefOf(l)}
                  onClick={(e) => handleClick(e, l)}
                  aria-current={on ? 'true' : undefined}
                  position="relative"
                  py={2}
                  fontSize="11.5px"
                  fontWeight={500}
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color={on ? 'brand.white' : 'brand.whiteMuted'}
                  transition="color 200ms ease"
                  _after={{
                    content: '""', position: 'absolute', left: 0, right: 0, bottom: 0, h: '1px', bg: 'brand.gold',
                    transform: on ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
                    transition: 'transform 300ms cubic-bezier(.23,1,.32,1)',
                  }}
                  sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { color: 'brand.white', _after: { transform: 'scaleX(1)' } } } }}
                >
                  {l.label}
                </Box>
              )
            })}
          </Flex>

          {/* Acciones */}
          <Flex align="center" gap="10px">
            <Box
              as="a"
              href={SOCIALS[0].href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Moon Sports Group"
              display={{ base: 'none', lg: 'grid' }}
              placeItems="center"
              w="42px"
              h="42px"
              borderRadius="full"
              border="1px solid rgba(255,255,255,0.14)"
              color="brand.whiteMuted"
              transition="color 200ms ease, border-color 200ms ease"
              sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { color: 'brand.gold', borderColor: 'brand.gold' } } }}
            >
              <FaInstagram size={17} />
            </Box>
            <Box
              as="a"
              href="/#contacto"
              onClick={goContact}
              display={{ base: 'none', lg: 'inline-flex' }}
              alignItems="center"
              px={5}
              py="12px"
              borderRadius="4px"
              border="1px solid"
              borderColor="brand.gold"
              color="brand.gold"
              fontSize="11.5px"
              fontWeight={600}
              letterSpacing="0.12em"
              textTransform="uppercase"
              transition="background-color 200ms ease, color 200ms ease, transform 160ms cubic-bezier(.23,1,.32,1)"
              _active={{ transform: 'scale(0.97)' }}
              sx={{ '@media (hover: hover) and (pointer: fine)': { _hover: { bg: 'brand.gold', color: 'brand.black' } } }}
            >
              Hablemos
            </Box>

            {/* Botón de menú (mobile y tablet) */}
            <Box
              as="button"
              type="button"
              onClick={menu.onOpen}
              aria-label="Abrir menú"
              aria-expanded={menu.isOpen}
              display={{ base: 'grid', lg: 'none' }}
              placeItems="center"
              w="44px"
              h="44px"
              borderRadius="full"
              border="1px solid rgba(201,168,76,0.4)"
              _active={{ transform: 'scale(0.95)' }}
              transition="transform 160ms cubic-bezier(.23,1,.32,1)"
            >
              <Box position="relative" w="18px" h="10px" aria-hidden="true">
                <Box position="absolute" left={0} right={0} top={0} h="2px" borderRadius="1px" bg="brand.gold" />
                <Box position="absolute" left={0} right={0} bottom={0} h="2px" borderRadius="1px" bg="brand.gold" />
              </Box>
            </Box>
          </Flex>
        </Flex>

        {/* Progreso de lectura */}
        <Box
          ref={progressRef}
          aria-hidden="true"
          position="absolute"
          left={0}
          right={0}
          bottom="-1px"
          h="2px"
          bg="linear-gradient(90deg, #9A7A35, #E8C96A)"
          transformOrigin="left"
          transform="scaleX(0)"
          opacity={solid ? 1 : 0}
          transition="opacity 300ms ease"
        />
      </Box>

      {/* Menú mobile: hoja que sube desde abajo */}
      <Drawer isOpen={menu.isOpen} onClose={menu.onClose} placement="bottom" returnFocusOnClose>
        <DrawerOverlay bg="rgba(5,4,3,0.7)" backdropFilter="blur(3px)" />
        <DrawerContent
          bg="brand.coal2"
          color="brand.cream"
          borderTopRadius="18px"
          borderTop="1px solid"
          borderColor="brand.line"
          maxH="88dvh"
          aria-label="Menú"
        >
          <DrawerBody px={5} pt="10px" pb="calc(24px + env(safe-area-inset-bottom, 0px))">
            <Box w="40px" h="4px" borderRadius="2px" bg="brand.line2" mx="auto" mb={4} aria-hidden="true" />
            <Box as="nav" aria-label="Menú principal">
              <Box as="ul" listStyleType="none">
                {[{ label: 'Inicio', to: '/', hash: '#hero', section: 'hero', hint: 'Volver al principio' }, ...links].map((l) => {
                  const on = active === l.section
                  return (
                    <Box as="li" key={l.label}>
                      <Flex
                        as={Link}
                        to={hrefOf(l)}
                        onClick={(e) => handleClick(e, l)}
                        aria-current={on ? 'true' : undefined}
                        align="center"
                        justify="space-between"
                        gap={3}
                        py="14px"
                        px={1}
                        borderBottom="1px solid"
                        borderColor="brand.line"
                      >
                        <Box>
                          <Text fontWeight={600} fontSize="17px" color={on ? 'brand.gold' : 'brand.cream'}>{l.label}</Text>
                          <Text fontSize="13px" color="brand.creamMuted">{l.section === 'agenda' ? agendaHint : l.hint}</Text>
                        </Box>
                        <Box color="brand.creamFaint" aria-hidden="true"><FiArrowRight size={18} /></Box>
                      </Flex>
                    </Box>
                  )
                })}
              </Box>
            </Box>

            <Box
              as="a"
              href="/#contacto"
              onClick={goContact}
              display="flex"
              justifyContent="center"
              mt={5}
              py={4}
              borderRadius="4px"
              bg="brand.gold"
              color="brand.black"
              fontSize="12px"
              fontWeight={600}
              letterSpacing="0.12em"
              textTransform="uppercase"
              _active={{ transform: 'scale(0.98)' }}
            >
              Quiero ser representado
            </Box>

            <Flex justify="center" gap="10px" mt={4}>
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <Box
                  key={label}
                  as="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  display="grid"
                  placeItems="center"
                  w="44px"
                  h="44px"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="brand.line2"
                  color="brand.cream"
                >
                  <Icon size={17} />
                </Box>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
