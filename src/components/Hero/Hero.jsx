import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Heading, Image, Text, Button, VStack } from '@chakra-ui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../../assets/images/logo_principal.png'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef  = useRef(null)
  const logoRef     = useRef(null)
  const taglineRef  = useRef(null)
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef      = useRef(null)
  const scrollHint  = useRef(null)
  const contentRef  = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Entrance timeline ----
      const tl = gsap.timeline({ delay: 0.4 })

      tl.from(logoRef.current, {
          scale: 0,
          rotation: -20,
          duration: 1.2,
          ease: 'back.out(1.7)',
        })
        .to(taglineRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to(titleRef.current,    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to(scrollHint.current,  { opacity: 1, duration: 0.6 }, '-=0.2')

      // ---- Logo floating loop ----
      gsap.to(logoRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      })

      // ---- Parallax on scroll ----
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 120,
        opacity: 0,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={sectionRef}
      as="section"
      id="hero"
      mt={{base: 10, md: 0}}
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Radial background glow */}
      <Box
        position="absolute"
        inset={0}
        background="radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%),
                    radial-gradient(ellipse at 30% 80%, rgba(201,168,76,0.04) 0%, transparent 50%)"
        pointerEvents="none"
      />

      {/* Grid lines */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage="linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)"
        backgroundSize="80px 80px"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
        pointerEvents="none"
      />

      {/* Content */}
      <VStack ref={contentRef} spacing={6} position="relative" zIndex={2} textAlign="center" px={4}>

        {/* Logo with glow ring */}
        <Box position="relative" display="flex" alignItems="center" justifyContent="center">
          <Box
            className="logo-glow"
            position="absolute"
            w="300px"
            h="300px"
            background="radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)"
            borderRadius="50%"
            pointerEvents="none"
          />
          <Image
            ref={logoRef}
            src={logo}
            alt="Moon Sports Group"
            w="220px"
            h="220px"
            objectFit="contain"
            position="relative"
            zIndex={1}
            filter="drop-shadow(0 0 40px rgba(201,168,76,0.4))"
          />
        </Box>

        {/* Tagline */}
        <Text
          ref={taglineRef}
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '14px', md: '18px' }}
          letterSpacing="0.4em"
          color="brand.gold"
          opacity={0}
          transform="translateY(20px)"
        >
          Representación de Élite
        </Text>

        {/* Title */}
        <Heading
          ref={titleRef}
          as="h1"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '52px', md: '80px', lg: '96px' }}
          lineHeight="0.95"
          letterSpacing="0.02em"
          color="brand.white"
          opacity={0}
          transform="translateY(30px)"
        >
          MOON SPORTS
          <br />
          <Box as="span" color="brand.gold">GROUP</Box>
        </Heading>

        {/* Subtitle */}
        <Text
          ref={subtitleRef}
          fontSize={{ base: '14px', md: '16px' }}
          color="brand.whiteMuted"
          fontWeight={300}
          letterSpacing="0.05em"
          maxW="500px"
          lineHeight={1.7}
          opacity={0}
          transform="translateY(20px)"
        >
          Gestionamos carreras de futbolistas y técnicos profesionales
          con visión estratégica y compromiso total.
        </Text>

        {/* CTA Buttons */}
        <Flex ref={ctaRef} gap={4} flexWrap="wrap" justify="center" opacity={0} transform="translateY(20px)">
          <Link to="/jugadores">
            <Button variant="gold">Nuestros Representados</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contactar
          </Button>
        </Flex>
      </VStack>

      {/* Scroll hint */}
      <Flex
        ref={scrollHint}
        position="absolute"
        bottom="40px"
        direction="column"
        align="center"
        gap="8px"
        opacity={0}
        pointerEvents="none"
      >
        <Box
          className="scroll-line-anim"
          w="1px"
          h="60px"
          background="linear-gradient(to bottom, transparent, #C9A84C)"
        />
        <Text fontSize="10px" letterSpacing="0.3em" color="brand.gold" textTransform="uppercase">
          Scroll
        </Text>
      </Flex>
    </Box>
  )
}
