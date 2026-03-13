import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box, Grid, Heading, Image, Text, Flex, Link,
} from '@chakra-ui/react'
import gsap from 'gsap'
import { players } from '../utils/players'
import Footer from '../components/Footer/Footer'
import PlayerModal from '../components/PlayerModal/PlayerModal'

function JugadorCard({ player, index, onSelect }) {
  const cardRef = useRef(null)

  return (
    <Box
      ref={cardRef}
      className="jugador-card-full"
      position="relative"
      overflow="hidden"
      h="480px"
      cursor="pointer"
      data-cursor-hover
      onClick={() => onSelect(player)}
    >
      <Image
        src={player.image}
        alt={player.name}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="top"
        filter="grayscale(30%)"
        transition="transform 0.8s ease, filter 0.4s"
        sx={{
          '.jugador-card-full:hover &': {
            transform: 'scale(1.06)',
            filter: 'grayscale(0%)',
          },
        }}
      />

      {/* Overlay */}
      <Box
        className="jugador-card-overlay"
        position="absolute"
        inset={0}
        background="linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.3) 40%, transparent 70%)"
        transition="background 0.4s"
        sx={{
          '.jugador-card-full:hover &': {
            background: 'linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.6) 50%, rgba(201,168,76,0.05) 100%)',
          },
        }}
      />

      {/* Body */}
      <Box
        className="jugador-card-body"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p="32px 28px"
        transition="transform 0.4s ease"
      >
        <Text
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="64px"
          color="rgba(201,168,76,0.15)"
          lineHeight={1}
          mb="-8px"
        >
          {String(index + 1).padStart(2, '0')}
        </Text>

        <Text
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="32px"
          color="brand.white"
          letterSpacing="0.03em"
          lineHeight={1}
        >
          {player.name}
        </Text>

        <Flex gap={4} mt={3} align="center">
          <Text
            fontSize="12px"
            letterSpacing="0.15em"
            color="brand.gold"
            textTransform="uppercase"
            fontWeight={600}
          >
            {player.club}
          </Text>
          <Box w="4px" h="4px" bg="rgba(255,255,255,0.3)" borderRadius="50%" />
          <Text
            fontSize="12px"
            letterSpacing="0.1em"
            color="brand.whiteMuted"
            textTransform="uppercase"
          >
            {player.position}
          </Text>
        </Flex>

        <Text className="jugador-bio">{player.bio}</Text>
      </Box>
    </Box>
  )
}

export default function JugadoresPage() {
  const gridRef = useRef(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.jugador-card-full',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
      gsap.fromTo(
        '.jugadores-header-content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.1,
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <Box bg="brand.black" minH="100vh" pt="100px">

      {/* Header */}
      <Box py="80px" pb="64px" textAlign="center" position="relative" overflow="hidden">
        {/* Big watermark text */}
        <Text
          position="absolute"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '80px', md: '180px' }}
          color="rgba(201,168,76,0.03)"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          whiteSpace="nowrap"
          pointerEvents="none"
          letterSpacing="0.05em"
          userSelect="none"
        >
          REPRESENTADOS
        </Text>

        <Box className="jugadores-header-content" position="relative" zIndex={1}>
          <Text className="section-label" style={{ justifyContent: 'center' }}>
            Moon Sports Group
          </Text>

          <Heading
            fontFamily="'Bebas Neue', sans-serif"
            fontSize={{ base: '48px', md: '96px' }}
            lineHeight={1}
            mt={4} mb={6}
          >
            NUESTROS{' '}
            <Box as="span" color="brand.gold">
              REPRESENTADOS
            </Box>
          </Heading>

          <Text
            color="brand.whiteMuted"
            fontSize="16px"
            maxW="600px"
            mx="auto"
            lineHeight={1.7}
            fontWeight={300}
          >
            Un selecto grupo de futbolistas y técnicos profesionales que confían
            en Moon Sports Group para gestionar sus carreras al más alto nivel.
          </Text>
        </Box>
      </Box>

      {/* Grid */}
      <Box maxW="1280px" mx="auto" px={{ base: 4, md: 12 }} pb="120px">
        <Grid
          ref={gridRef}
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap="2px"
        >
          {players.map((player, i) => (
            <JugadorCard key={player.id} player={player} index={i} onSelect={setSelectedPlayer} />
          ))}

          {/* CTA Card */}
          <Box
            className="jugador-card-full"
            position="relative"
            h="480px"
            bg="brand.grayMid"
            border="1px dashed"
            borderColor="brand.grayBorder"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            transition="border-color 0.4s"
            _hover={{ borderColor: 'brand.goldDark' }}
            onClick={() => {
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
            }}
            data-cursor-hover
          >
            <Box textAlign="center" p={10}>
              <Text fontSize="48px" mb={4} color="brand.gold">+</Text>
              <Text
                fontFamily="'Bebas Neue', sans-serif"
                fontSize="28px"
                color="brand.white"
                letterSpacing="0.05em"
              >
                ¿Sos Jugador?
              </Text>
              <Text fontSize="14px" color="brand.whiteMuted" mt={2}>
                Sumate a nuestra agencia
              </Text>
              <RouterLink to="/#contacto">
                <Box
                  as="span"
                  display="inline-block"
                  mt={6}
                  px={6}
                  py={3}
                  bg="linear-gradient(135deg, #C9A84C, #9A7A35)"
                  color="brand.black"
                  fontWeight={700}
                  fontSize="12px"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  borderRadius="4px"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-2px)' }}
                >
                  Contactar
                </Box>
              </RouterLink>
            </Box>
          </Box>
        </Grid>
      </Box>

      <Footer />

      <PlayerModal
        player={selectedPlayer}
        isOpen={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </Box>
  )
}
