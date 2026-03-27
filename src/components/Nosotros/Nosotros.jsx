 import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapReveal, useGsapCounter } from '../../hooks/useGsapReveal'
import bgJugadores from '../../assets/images/bg_jugadores.png'

gsap.registerPlugin(ScrollTrigger)

function StatItem({ target, label }) {
  const counterRef = useGsapCounter(target)
  return (
    <Flex direction="column" gap={"4px"}>
      <Text
        ref={counterRef}
        fontFamily="'Bebas Neue', sans-serif"
        fontSize={{ base: '42px', md: '48px' }}
        color="brand.gold"
        lineHeight={1}
      >
        0+
      </Text>
      <Text
        fontSize={{ base: '10px', md: '14px' }}
        letterSpacing="0.15em"
        color="brand.whiteMuted"
        textTransform="uppercase"
      >
        {label}
      </Text>
    </Flex>
  )
}

export default function Nosotros() {
  const sectionRef = useGsapReveal('left', 0.15)

  return (
    <Flex
      as="section"
      id="nosotros"
      position="relative"
      mt={{base: 4, md: 0}}
      minH='70vh'
      alignItems="center"
      backgroundImage={`url(${bgJugadores})`}
      backgroundSize="cover"
      backgroundPosition={{ base: 'none', md: 'center' }}
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
    >
      {/* Gradient overlay */}
      <Box
        position="absolute"
        inset={0}
        background="linear-gradient(90deg, rgba(8,8,8,0.95) 30%, rgba(8,8,8,0.3) 70%, rgba(8,8,8,0.7) 100%)"
      />

      {/* Content */}
      <Box
        ref={sectionRef}
        position="relative"
        zIndex={2}
        maxW="650px"
        px={{ base: 6, md: 12 }}
        py={{ base: '80px', md: '120px' }}
        left={{ base: '0%', md: '12%' }}
      >
        <Text className="section-label gsap-reveal">Quiénes Somos</Text>

        <Heading
          className="gsap-reveal"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '50px', md: '72px' }}
          lineHeight={1}
          mb={0}
        >
          SOBRE <Box as="span" color="brand.gold">NOSOTROS</Box>
        </Heading>

        <Box className="gold-divider gsap-reveal" w={{ base: '160px', md: '60px' }}/>

        <Text
          className="gsap-reveal"
          fontSize={{ base: '15px', md: '17px' }}
          lineHeight={1.85}
          color="rgba(255,255,255,0.75)"
          fontWeight={300}
          mb={5}
        >
          Moon Sports Group es una agencia de representación especializada en fútbol
          profesional. Nuestro equipo combina experiencia en el ámbito deportivo con
          una visión estratégica única para posicionar a nuestros representados en las
          mejores ligas del mundo.
        </Text>

        <Text
          className="gsap-reveal"
          fontSize={{ base: '15px', md: '17px' }}
          lineHeight={1.85}
          color="rgba(255,255,255,0.75)"
          fontWeight={300}
        >
          Creemos en relaciones a largo plazo basadas en la confianza, la transparencia
          y el compromiso absoluto con los objetivos de cada jugador y técnico que
          forma parte de nuestra familia.
        </Text>

        {/* Stats */}
        <Flex gap={{ base: 6, md: 12 }} mt={12} flexWrap="wrap">
          <StatItem target={15} label="Representados" />
          <StatItem target={8}  label="Países" />
          <StatItem target={25} label="Transferencias" />
        </Flex>
      </Box>
    </Flex>
  )
}
