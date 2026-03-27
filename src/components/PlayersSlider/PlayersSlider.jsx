import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { players } from '../../utils/players'

gsap.registerPlugin(ScrollTrigger)

function PlayerCard({ player }) {
  return (
    <Link to="/jugadores" style={{ textDecoration: 'none', flexShrink: 0 }}>
      <Box
        className="player-card"
        w={{ base: '340px', md: '280px' }}
        position="relative"
        overflow="hidden"
        borderRadius="4px"
        bg="brand.grayMid"
        border="1px solid"
        borderColor="brand.grayBorder"
        transition="border-color 0.4s"
        _hover={{ borderColor: 'brand.goldDark' }}
        data-cursor-hover
      >
        <Image  
          className="player-card-img"
          width="100%"
          height={{ base: '380px', md: '340px' }}
          src={player.image}
          alt={player.name}
        />
        <Box
          p={{ base: '6px 18px', md: '15px 15px' }}
          background="linear-gradient(to top, #1A1A1A 0%, rgba(26,26,26,0.9) 100%)"
        > 
          <Text
            fontFamily="'Bebas Neue', sans-serif"
            fontSize={{ base: '32px', md: '28px' }}
            letterSpacing="0.05em"
            color="brand.white"
          >
            {player.name}{'  '}
            <Box as="span" color="brand.gold">{player.lastname}</Box>
          </Text>
          <Text
            fontSize="12px"
            letterSpacing="0.15em"
            color="brand.gold"
            textTransform="uppercase"
            fontWeight={500}
            mt={{ base: "2px", md: "4px" }}
          >
            {player.club}
          </Text>
          <Text
            fontSize="11px"
            color="brand.whiteMuted"
            mt="2px"
            textTransform="uppercase"
            letterSpacing="0.1em"
          >
            {player.position}
          </Text>
        </Box>
      </Box>
    </Link>
  )
}

export default function PlayersSlider() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const headerRef  = useGsapReveal('up', 0.15)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        -(track.scrollWidth - section.offsetWidth + 96)

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 15%',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      id="jugadores-home"
      ref={sectionRef}
      py={{ base: '80px', md: '120px' }}
      bg="brand.black"
      overflow="hidden"
    >
      {/* Header */}
      <Box maxW="1280px" mx="auto" px={{ base: 6, md: 12 }} ref={headerRef} mb={16}>
        <Text className="section-label gsap-reveal">Nuestros Representados</Text>
        <Heading
          className="gsap-reveal"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '50px', md: '72px' }}
          lineHeight={1}
        >
          LOS <Box as="span" color="brand.gold">JUGADORES</Box>
        </Heading>
      </Box>

      {/* Scrollable track */}
      <Box 
      overflow="hidden" 
      w={{ base: '100%', md: '80vw' }} 
      alignContent={'center'}
      ml={{ base: 0, md: 40 }}
      px={{ base: 6, md: 12 }}
      >
        <Flex
          ref={trackRef}
          gap="28px"
          width="max-content"
          willChange="transform"
        >
          {/* Render twice for a seamless feel */}
          {[...players, ...players.slice(0, 3)].map((player, i) => (
            <PlayerCard key={`${player.id}-${i}`} player={player} />
          ))}
        </Flex>
      </Box>

      {/* Manual nav buttons (below the pinned area) */}
      <Flex gap={3} px={{ base: 6, md: 12 }} mt={10} ml={28}>
        <Box
          as="button"
          w="48px"
          h="48px"
          border="1px solid"
          borderColor="brand.grayBorder"
          bg="transparent"
          color="brand.white"
          borderRadius="4px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="18px"
          transition="all 0.3s"
          _hover={{ borderColor: 'brand.gold', color: 'brand.gold' }}
          onClick={() => {
            const track = trackRef.current
            const currentX = gsap.getProperty(track, 'x') || 0
            gsap.to(track, { x: Math.min(+currentX + 300, 0), duration: 0.6, ease: 'power2.out' })
          }}
        >
          ←
        </Box>
        <Box
          as="button"
          w="48px"
          h="48px"
          border="1px solid"
          borderColor="brand.grayBorder"
          bg="transparent"
          color="brand.white"
          borderRadius="4px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="18px"
          transition="all 0.3s"
          _hover={{ borderColor: 'brand.gold', color: 'brand.gold' }}
          onClick={() => {
            if (!trackRef.current) return
            const track       = trackRef.current
            const currentX    = gsap.getProperty(track, 'x') || 0
            const maxScroll   = -(track.scrollWidth - window.innerWidth + 192)
            gsap.to(track, { x: Math.max(+currentX - 300, maxScroll), duration: 0.6, ease: 'power2.out' })
          }}
        >
          →
        </Box>
      </Flex>
    </Box>
  )
}
