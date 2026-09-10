import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Grid, Heading, Text, Flex } from '@chakra-ui/react'
import gsap from 'gsap'
import { players } from '../utils/players'
import Footer from '../components/Footer/Footer'
import PlayerModal from '../components/PlayerModal/PlayerModal'
import { PlayerCard } from '../components/PlayerCard/PlayerCard'
import { Seo } from '../components/Seo/Seo'
import { breadcrumbSchema, playersListSchema } from '../utils/seo'

export default function JugadoresPage() {
  const gridRef = useRef(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [activeTab, setActiveTab] = useState('player')

  const filteredPlayers = players.filter(p => p.type === activeTab)

  const handleTabChange = (tab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    // Re-animate cards on tab change
    gsap.fromTo(
      '.jugador-card-full',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.05 }
    )
  }

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
      <Seo
        title="Nuestros Representados — Futbolistas y Directores Técnicos"
        description="Conocé a los futbolistas y directores técnicos representados por Moon Sports Group: perfiles, clubes y trayectoria de jugadores profesionales en ligas de Sudamérica y Europa."
        path="/jugadores"
        type="profile"
        jsonLd={[
          playersListSchema(players),
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Representados', path: '/jugadores' },
          ]),
        ]}
      />

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
            as="h1"
            fontFamily="heading"
            fontSize={{ base: '90px', md: '122px' }}
            lineHeight={1}
            letterSpacing="0.02em"
            mt={4} 
            mb={{ base: 2, md: 6 }}
          >
            NUESTROS{' '}
            <Box as="span" color="brand.gold">
              REPRESENTADOS
            </Box>
          </Heading>

          <Text
            color="brand.whiteMuted"
            fontSize="16px"
            px={{ base: 4, md: 0 }}
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

      {/* Tab selector */}
      <Box maxW="1280px" mx="auto" px={{ base: 4, md: 12 }} mb={10}>
        <Flex justify="center" align="center" position="relative">
          {/* Gradient line behind */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            h="1px"
            background="linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)"
          />

          {[
            { key: 'player', label: 'JUGADORES' },
            { key: 'coach', label: 'ENTRENADORES' },
          ].map((tab) => (
            <Box
              key={tab.key}
              as="button"
              onClick={() => handleTabChange(tab.key)}
              position="relative"
              px={{ base: 6, md: 10 }}
              py={3}
              fontFamily="'Bebas Neue', sans-serif"
              fontSize={{ base: '18px', md: '22px' }}
              letterSpacing="0.15em"
              color={activeTab === tab.key ? 'brand.gold' : 'brand.whiteMuted'}
              bg="transparent"
              border="none"
              cursor="pointer"
              transition="color 0.3s"
              _hover={{ color: 'brand.gold' }}
            >
              {tab.label}
              {/* Active indicator */}
              <Box
                position="absolute"
                bottom={0}
                left="50%"
                transform="translateX(-50%)"
                w={activeTab === tab.key ? '60%' : '0%'}
                h="2px"
                bg="brand.gold"
                borderRadius="1px"
                transition="width 0.3s ease"
              />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Grid */}
      <Box maxW="1280px" mx="auto" px={{ base: 6, md: 12 }} pb="120px">
        <Grid
          ref={gridRef}
          templateColumns={{
            base: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={{ base: 3, md: 4 }}
        >
          {filteredPlayers.map((player) => (
            <Box key={player.id} className="jugador-card-full">
              <PlayerCard player={player} onClick={setSelectedPlayer} />
            </Box>
          ))}

          {/* CTA Card */}
          <Box
            className="jugador-card-full"
            as={RouterLink}
            to="/#contacto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH={{ base: '260px', md: '340px' }}
            borderRadius="xl"
            border="1px dashed"
            borderColor="rgba(201,168,76,0.25)"
            bg="radial-gradient(120% 90% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 65%), #0A0A0A"
            transition="border-color 0.45s ease, transform 0.45s ease, background 0.45s ease"
            _hover={{
              borderColor: 'rgba(201,168,76,0.6)',
              transform: { md: 'translateY(-6px)' },
              textDecoration: 'none',
            }}
          >
            <Box textAlign="center" px={{ base: 4, md: 8 }} py={8}>
              <Flex
                w={{ base: '42px', md: '52px' }}
                h={{ base: '42px', md: '52px' }}
                mx="auto"
                mb={4}
                align="center"
                justify="center"
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(201,168,76,0.22)"
                bg="linear-gradient(145deg, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.04) 48%, rgba(255,255,255,0.02) 100%)"
                boxShadow="inset 0 1px 0 rgba(232,201,106,0.22)"
                color="brand.gold"
                fontSize={{ base: '22px', md: '26px' }}
                fontWeight={300}
                lineHeight={1}
              >
                +
              </Flex>

              <Text
                fontFamily="'Bebas Neue', sans-serif"
                fontSize={{ base: '20px', md: '26px' }}
                color="brand.white"
                letterSpacing="0.05em"
                lineHeight={1.1}
              >
                {activeTab === 'player' ? '¿Sos Jugador?' : '¿Sos Entrenador?'}
              </Text>
              <Text
                fontSize={{ base: '11px', md: '13px' }}
                color="brand.whiteMuted"
                mt={2}
                fontWeight={300}
              >
                Sumate a nuestra agencia
              </Text>

              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                gap={2}
                mt={5}
                fontSize={{ base: '10px', md: '11px' }}
                letterSpacing="0.18em"
                textTransform="uppercase"
                fontWeight={600}
                color="brand.gold"
              >
                Contactar
              </Box>
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
