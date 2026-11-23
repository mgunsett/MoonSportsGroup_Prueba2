import { Box, Flex, Grid, Image, Link, Text } from '@chakra-ui/react'
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FiArrowUp } from 'react-icons/fi'
import logo from '../../assets/images/logo_principal.webp'
import sportfolioWeb from '../../assets/images/logo_sport.webp'


const SOCIALS = [
  { label: 'WhatsApp', href: 'https://wa.me/5491100000000', icon: FaWhatsapp },
  { label: 'Instagram', href: 'https://www.instagram.com/moonsportsgroup_/', icon: FaInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/moon-sports-group/', icon: FaLinkedinIn },
]

const EASE = 'cubic-bezier(.23,1,.32,1)'
const hoverFine = (styles) => ({ '@media (hover: hover) and (pointer: fine)': { _hover: styles } })

export default function Footer() {
  const goTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <Box as="footer" bg="brand.black" borderTop="1px solid rgba(201,168,76,0.18)" px={{ base: 4, md: 12 }} zIndex={99999}>
      <Box maxW="1280px" mx="auto" pt={{ base: 12, md: 14 }} pb={7}>
        {/* Marca + redes */}
        <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={6}
          pb={{ base: 7, md: 8 }} borderBottom="1px solid rgba(255,255,255,0.09)">
          <Box>
            <Flex align="center" gap={3}>
              <Image src={logo} alt="" w="46px" h="46px" filter="brightness(0) invert(1)" />
              <Box lineHeight={0.95}>
                <Text fontFamily="label" fontSize="24px" letterSpacing="0.08em">MOON SPORTS</Text>
                <Text fontFamily="label" fontSize="13px" letterSpacing="0.5em" color="brand.gold">GROUP</Text>
              </Box>
            </Flex>
            <Text mt={3} fontSize="14px" color="rgba(255,255,255,0.42)">
              Representación de futbolistas y técnicos profesionales.
            </Text>
          </Box>
          <Flex gap="10px">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <Flex
                key={label} as="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Moon Sports Group en ${label}`}
                w="42px" h="42px" borderRadius="full" align="center" justify="center" border="1px solid rgba(255,255,255,0.18)"
                color="brand.whiteMuted" transition={`color 200ms ease, border-color 200ms ease, transform 160ms ${EASE}`}
                _active={{ transform: 'scale(0.95)' }}
                sx={hoverFine({ color: 'brand.gold', borderColor: 'brand.gold' })}
              >
                <Icon size={17} aria-hidden="true" />
              </Flex>
            ))}
          </Flex>
        </Flex>

        {/* Cierre */}
        <Grid templateColumns={{ base: '1fr', md: '1fr auto 1fr' }} alignItems="center" gap={{ base: 5, md: 5 }} pt={6}>
          <Text fontSize="12px" color="rgba(255,255,255,0.45)">
            © {new Date().getFullYear()} Moon Sports Group. Todos los derechos reservados.
          </Text>

          <Flex
            as="button" type="button" onClick={goTop} align="center" gap={2} justifySelf={{ base: 'start', md: 'center' }}
            fontSize="11.5px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="brand.whiteMuted"
            transition="color 200ms ease" sx={hoverFine({ color: 'brand.gold' })}
          >
            Volver arriba <FiArrowUp size={16} aria-hidden="true" />
          </Flex>

          <Flex direction="column" gap={1} justifySelf={{ base: 'start', md: 'end' }}
            fontSize="11px" letterSpacing="0.08em" textTransform="uppercase" color="rgba(255,255,255,0.35)">
            Desarrollo web
            <Link href="https://matiasgunsett.netlify.app/sportfolio" isExternal rel="noopener noreferrer" aria-label="Sportfolio Web"
              opacity={0.85} transition="opacity 200ms ease" sx={hoverFine({ opacity: 1 })}>
              <Image src={sportfolioWeb} alt="Sportfolio Web" w="96px" h="auto" display="block" />
            </Link>
          </Flex>
        </Grid>
      </Box>
    </Box>
  )
}
