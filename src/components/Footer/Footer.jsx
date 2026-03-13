import { Box, Flex, Grid, Image, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import logo from '../../assets/images/logo_principal.png'

const navLinks = [
  { label: 'Home',      to: '/',           hash: '#hero' },
  { label: 'Nosotros',  to: '/',           hash: '#nosotros' },
  { label: 'Jugadores', to: '/jugadores',  hash: '' },
  { label: 'Servicios', to: '/',           hash: '#services' },
  { label: 'Contacto',  to: '/',           hash: '#contacto' },
]

const socialLinks = [
  {
    href: 'https://www.instagram.com/moonsportsgroup_/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/moon-sports-group/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/5491100000000',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const handleNavClick = (e, link) => {
    if (link.hash) {
      setTimeout(() => {
        const el = document.querySelector(link.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <Box
      as="footer"
      bg="brand.black"
      borderTop="1px solid"
      borderColor="brand.grayBorder"
      pt="60px"
      pb="40px"
    >
      <Box maxW="1280px" mx="auto" px={{ base: 6, md: 12 }}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3,1fr)' }}
          gap={12}
          alignItems="start"
          className="footer-inner"
        >
          {/* Logo + Description */}
          <Box>
            <Image
              src={logo}
              alt="Moon Sports Group"
              h="48px"
              filter="brightness(0) invert(1)"
              opacity={0.6}
            />
            <Text
              fontSize="13px"
              color="rgba(255,255,255,0.3)"
              mt={4}
              lineHeight={1.7}
              maxW="240px"
            >
              Representación profesional de futbolistas y técnicos a nivel internacional.
            </Text>
          </Box>

          {/* Navigation */}
          <Box>
            <Text
              fontSize="11px"
              letterSpacing="0.2em"
              color="brand.gold"
              textTransform="uppercase"
              mb={5}
            >
              Navegación
            </Text>
            <Flex direction="column" gap={3}>
              {navLinks.map((link) => (
                <RouterLink
                  key={link.label}
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{ textDecoration: 'none' }}
                >
                  <Text
                    fontSize="13px"
                    color="brand.whiteMuted"
                    letterSpacing="0.05em"
                    transition="color 0.3s"
                    _hover={{ color: 'brand.gold' }}
                  >
                    {link.label}
                  </Text>
                </RouterLink>
              ))}
            </Flex>
          </Box>

          {/* Contact + Social */}
          <Box>
            <Text
              fontSize="11px"
              letterSpacing="0.2em"
              color="brand.gold"
              textTransform="uppercase"
              mb={5}
            >
              Contacto
            </Text>
            <Text fontSize="13px" color="rgba(255,255,255,0.5)" mb={2}>
              info@moonsportsgroup.com
            </Text>
            <Text fontSize="13px" color="rgba(255,255,255,0.5)" mb={6}>
              +54 911 0000 0000
            </Text>

            <Flex gap={4}>
              {socialLinks.map((s, i) => (
                <Link key={i} href={s.href} isExternal>
                  <Box
                    w="40px"
                    h="40px"
                    border="1px solid"
                    borderColor="brand.grayBorder"
                    borderRadius="4px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="brand.whiteMuted"
                    transition="all 0.3s"
                    _hover={{ borderColor: 'brand.gold', color: 'brand.gold' }}
                  >
                    {s.icon}
                  </Box>
                </Link>
              ))}
            </Flex>
          </Box>
        </Grid>

        {/* Bottom bar */}
        <Flex
          mt={12}
          pt={6}
          borderTop="1px solid rgba(255,255,255,0.06)"
          justify="space-between"
          align="center"
          flexWrap="wrap"
          gap={4}
        >
          <Text fontSize="12px" color="rgba(255,255,255,0.3)" letterSpacing="0.05em">
            © 2025 Moon Sports Group. Todos los derechos reservados.
          </Text>
          <Text fontSize="12px" color="rgba(255,255,255,0.3)" letterSpacing="0.05em">
            Diseñado con excelencia
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}
