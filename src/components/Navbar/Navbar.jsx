import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../../assets/images/logo_principal.png'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Home',      to: '/',           hash: '#hero' },
  { label: 'Nosotros',  to: '/',           hash: '#nosotros' },
  { label: 'Jugadores', to: '/jugadores',  hash: '' },
  { label: 'Servicios', to: '/',           hash: '#services' },
  { label: 'Contacto',  to: '/',           hash: '#contacto' },
]

function HamburgerIcon({ isOpen }) {
  return (
    <Box w="22px" h="16px" position="relative" display="flex" flexDirection="column" justifyContent="space-between">
      <Box
        as="span"
        w="100%"
        h="2px"
        bg="brand.gold"
        borderRadius="1px"
        transition="all 0.3s ease"
        transformOrigin="center"
        transform={isOpen ? 'translateY(7px) rotate(45deg)' : 'none'}
      />
      <Box
        as="span"
        w="100%"
        h="2px"
        bg="brand.gold"
        borderRadius="1px"
        transition="all 0.3s ease"
        opacity={isOpen ? 0 : 1}
      />
      <Box
        as="span"
        w="100%"
        h="2px"
        bg="brand.gold"
        borderRadius="1px"
        transition="all 0.3s ease"
        transformOrigin="center"
        transform={isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'}
      />
    </Box>
  )
}

export default function Navbar() {
  const navRef    = useRef(null)
  const location  = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useBreakpointValue({ base: true, md: false })

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
    )
  }, [])

  // Background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, link) => {
    setMenuOpen(false)
    if (link.hash && location.pathname === '/') {
      e.preventDefault()
      const el = document.querySelector(link.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Box
        ref={navRef}
        as="nav"
        position="fixed"
        top="20px"
        left="50%"
        transform="translateX(-50%)"
        zIndex={1000}
        bg={scrolled || menuOpen ? 'rgba(8,8,8,0.95)' : 'rgba(8, 8, 8, 0.36)'}
        backdropFilter="blur(5px)"
        border="1px solid"
        borderColor="rgba(201,168,76,0.25)"
        borderRadius={isMobile && menuOpen ? '20px' : '50px'}
        px={{ base: 5, md: 8 }}
        py="12px"
        transition="all 0.4s ease"
        opacity={0}
        w={{ base: 'calc(100% - 32px)', md: 'auto' }}
        maxW="900px"
      >
        <Flex align="center" justify="space-between" gap={{ base: 0, md: 12 }}>
          {/* Logo */}
          <Link to="/" onClick={() => { window.scrollTo(0, 0); setMenuOpen(false) }}>
            <Image
              src={logo}
              alt="Moon Sports Group"
              h="36px"
              filter="brightness(0) invert(1)"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.3s"
            />
          </Link>

          {/* Desktop Links */}
          <Flex display={{ base: 'none', md: 'flex' }} align="center" gap={12}>
            {navLinks.map((link) => (
              <Box key={link.label} position="relative" role="group">
                <Link
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  <Text
                    fontSize="10px"
                    fontWeight="500"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                    color="brand.whiteMuted"
                    _groupHover={{ color: 'brand.gold' }}
                    transition="color 0.3s"
                  >
                    {link.label}
                  </Text>
                </Link>
                {/* Underline */}
                <Box
                  position="absolute"
                  bottom="-4px"
                  left="0"
                  h="1px"
                  w="0"
                  bg="brand.gold"
                  transition="width 0.3s ease"
                  _groupHover={{ width: '100%' }}
                />
              </Box>
            ))}
          </Flex>

          {/* Hamburger Button (mobile only) */}
          <Box
            display={{ base: 'flex', md: 'none' }}
            as="button"
            alignItems="center"
            justifyContent="center"
            w="40px"
            h="40px"
            bg="transparent"
            border="none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            data-cursor-hover
          >
            <HamburgerIcon isOpen={menuOpen} />
          </Box>
        </Flex>

        {/* Mobile Menu */}
        <Box
          display={{ base: 'block', md: 'none' }}
          overflow="hidden"
          maxH={menuOpen ? '400px' : '0px'}
          opacity={menuOpen ? 1 : 0}
          transition="all 0.4s ease"
          mt={menuOpen ? 4 : 0}
        >
          <Box
            h={menuOpen ? '1px' : '0px'}
            bg="rgba(201,168,76,0.2)"
            mb={4}
            transition="height 0.3s"
          />
          <Flex direction="column" gap={1} pb={2}>
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={(e) => handleNavClick(e, link)}
                style={{ textDecoration: 'none' }}
              >
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="12px"
                  transition="background 0.3s"
                  _hover={{ bg: 'rgba(201,168,76,0.08)' }}
                  data-cursor-hover
                >
                  <Text
                    fontSize="11px"
                    fontFamily="'Bebas Neue', sans-serif"
                    color="brand.goldDark"
                    w="20px"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Text
                    fontSize="15px"
                    fontWeight="500"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="brand.whiteMuted"
                    _hover={{ color: 'brand.gold' }}
                    transition="color 0.3s"
                  >
                    {link.label}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Backdrop overlay when menu is open */}
      {menuOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="rgba(0,0,0,0.5)"
          zIndex={999}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
