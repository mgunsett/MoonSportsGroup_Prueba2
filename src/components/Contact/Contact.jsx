import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FiArrowUpRight, FiMail } from 'react-icons/fi'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import logoMoon from '../../assets/images/logo_principal.webp'


export const CONTACT_CHANNELS = [
  { label: 'WhatsApp', handle: '+54 9 11 0000 0000', note: 'La vía más rápida', href: 'https://wa.me/5491100000000', icon: FaWhatsapp },
  { label: 'Email', handle: 'info@moonsportsgroup.com', note: 'Propuestas y documentación', href: 'mailto:info@moonsportsgroup.com', icon: FiMail },
  { label: 'Instagram', handle: '@moonsportsgroup_', note: 'Novedades y agenda', href: 'https://www.instagram.com/moonsportsgroup_/', icon: FaInstagram },
  { label: 'LinkedIn', handle: 'Moon Sports Group', note: 'Clubes y empresas', href: 'https://www.linkedin.com/company/moon-sports-group/', icon: FaLinkedinIn },
]

const EASE = 'cubic-bezier(.23,1,.32,1)'

export default function Contact() {
  const sectionRef = useGsapReveal('up', 0.08)

  return (
    <Box as="section" id="contacto" aria-labelledby="contacto-title" py={{ base: '72px', md: '110px' }} bg="brand.grayDark" overflow="clip">
      <Grid
        ref={sectionRef}
        maxW="1280px" mx="auto" px={{ base: 4, md: 12 }}
        templateColumns={{ base: '1fr', lg: 'minmax(0,.8fr) minmax(0,1.2fr)' }}
        gap={{ base: 2, lg: 14 }}
        alignItems="start"
        
      >
        <Flex direction="column" gap={4} mb={{ base: 8, lg: 0 }} position="relative">
          <Text className="section-label gsap-reveal">Médios y redes</Text>
          <Heading id="contacto-title" className="gsap-reveal" as="h2" fontFamily="display" fontWeight={400} textTransform="uppercase"
            fontSize={{ base: '58px', md: '84px', xl: '96px' }} lineHeight={0.88} letterSpacing="0.01em">
            CONT<Box as="span" color="brand.gold">ACTO</Box>
          </Heading>
          {/* Logo en monocromo, como marca de agua (solo desktop) */}
          <Box
            as="img" src={logoMoon} alt="" aria-hidden="true" loading="lazy" position="absolute"
            display='block'
            w={{ lg: '10px', xl: '450px' }} h="auto" left={{ base: 40, md: 0 }} top={{ base: -56, md: 60 }}
            transform={{ base: 'rotate(25deg)', md: 'translate(-40%,0) rotate(20deg) ' }}
            filter="grayscale(1) brightness(1.6)" opacity={0.12}
            pointerEvents="none" userSelect="none"
            zIndex={0}
          />
        </Flex>

        <Box borderTop="1px solid rgba(255,255,255,0.18)">
          {CONTACT_CHANNELS.map(({ label, handle, note, href, icon: Icon }) => (
            <Grid
              key={label}
              as="a"
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`Escribir a Moon Sports Group por ${label}: ${handle}`}
              className="gsap-reveal"
              templateColumns={{ base: '42px minmax(0,1fr) 20px', md: '48px minmax(0,1fr) auto' }}
              gap={4}
              alignItems="center"
              py={{ base: 4, md: 5 }}
              px={{ base: 0, md: '6px' }}
              borderBottom="1px solid rgba(255,255,255,0.18)"
              transition="background-color 200ms ease"
              sx={{
                '@media (hover: hover) and (pointer: fine)': {
                  _hover: { bg: 'rgba(255,255,255,0.03)', '.go-icon': { transform: 'translate(2px,-2px)' } },
                },
              }}
            >
              <Flex w={{ base: '42px', md: '48px' }} h={{ base: '42px', md: '48px' }} borderRadius="full" align="center" justify="center"
                border="1px solid rgba(201,168,76,0.4)" color="brand.gold" fontSize="19px">
                <Icon aria-hidden="true" />
              </Flex>
              <Box minW={0}>
                <Text fontFamily="label" fontSize={{ base: '23px', md: '28px' }} letterSpacing="0.03em" lineHeight={1}>{label}</Text>
                <Text mt={1} fontSize="13px" color="rgba(255,255,255,0.42)" noOfLines={2}>
                  <Box as="span" color="brand.whiteMuted">{handle}</Box>
                </Text>
              </Box>
              <Flex align="center" gap={2} color="brand.gold" fontSize="11.5px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase">       
                <Box as="span" className="go-icon" display="flex" transition={`transform 250ms ${EASE}`}><FiArrowUpRight size={28} aria-hidden="true" /></Box>
              </Flex>
            </Grid>
          ))}
        </Box>
      </Grid>
    </Box>
  )
}
