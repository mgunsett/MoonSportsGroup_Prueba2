import { useLayoutEffect, useRef } from 'react'
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
  const dividerRef  = useRef(null)
  const bgGlow1     = useRef(null)
  const bgGlow2     = useRef(null)
  const bgGlow3     = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Animated background glows ----
      gsap.to(bgGlow1.current, {
        x: 80, y: -40, scale: 1.2, opacity: 0.12,
        duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
      gsap.to(bgGlow2.current, {
        x: -60, y: 50, scale: 0.9, opacity: 0.06,
        duration: 10, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
      gsap.to(bgGlow3.current, {
        x: 40, y: -30, scale: 1.1, opacity: 0.08,
        duration: 12, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })

      // ---- Entrance timeline ----
      const tl = gsap.timeline({ delay: 0.4 })

      tl.from(logoRef.current, {
          x: 100, scale: 0, rotation: -15,
          duration: 1.2, ease: 'back.out(1.4)',
        })
        .to(taglineRef.current,  { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .to(titleRef.current,    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(subtitleRef.current, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to(dividerRef.current,  { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .to(scrollHint.current,  { opacity: 1, duration: 0.6 }, '-=0.2')

      // ---- Logo floating loop ----
      gsap.to(logoRef.current, {
        y: -18, duration: 3, ease: 'sine.inOut',
        yoyo: true, repeat: -1, delay: 1.8,
      })

      // ---- Logo subtle rotation ----
      gsap.to(logoRef.current, {
        rotation: 3, duration: 5, ease: 'sine.inOut',
        yoyo: true, repeat: -1, delay: 1.8,
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
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      bg="linear-gradient(135deg, #080808 0%, #0d0d0d 25%, #080808 50%, #0f0e0a 75%, #080808 100%)"
    >
      {/* Animated background orbs */}
      <Box
        ref={bgGlow1}
        position="absolute"
        top="-10%"
        right="10%"
        w="600px"
        h="600px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)"
        filter="blur(80px)"
        pointerEvents="none"
        opacity={0.06}
      />
      <Box
        ref={bgGlow2}
        position="absolute"
        bottom="-15%"
        left="5%"
        w="500px"
        h="500px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)"
        filter="blur(100px)"
        pointerEvents="none"
        opacity={0.04}
      />
      <Box
        ref={bgGlow3}
        position="absolute"
        top="30%"
        left="40%"
        w="400px"
        h="400px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
        opacity={0.03}
      />

      {/* Subtle grid overlay */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage="linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)"
        backgroundSize="80px 80px"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        }}
        pointerEvents="none"
      />

      {/* Vertical accent line */}
      <Box
        position="absolute"
        top="0"
        right="45%"
        w="1px"
        h="100%"
        background="linear-gradient(to bottom, transparent 10%, rgba(201,168,76,0.06) 50%, transparent 90%)"
        pointerEvents="none"
        display={{ base: 'none', lg: 'block' }}
      />

      {/* Content — split layout */}
      <Flex
        ref={contentRef}
        w="full"
        maxW="1400px"
        mx="auto"
        px={{ base: 6, md: 12, lg: 20 }}
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: 'column-reverse', lg: 'row' }}
        gap={{ base: 8, lg: 60 }}
        position="relative"
        zIndex={2}
      >
        {/* LEFT — Text content */}
        <VStack
          align={{ base: 'center', lg: 'flex-start' }}
          textAlign={{ base: 'center', lg: 'left' }}
          spacing={5}
          maxW={{ base: '100%', lg: '50%' }}
        >
          <Text
            ref={taglineRef}
            fontFamily="'Bebas Neue', sans-serif"
            fontSize={{ base: '13px', md: '16px' }}
            letterSpacing="0.4em"
            color="brand.gold"
            opacity={0}
            transform="translateX(-40px)"
          >
            ◆ Representación de Élite
          </Text>

          <Heading
            ref={titleRef}
            as="h1"
            fontFamily="'Bebas Neue', sans-serif"
            fontSize={{ base: '48px', md: '72px', lg: '88px', xl: '96px' }}
            lineHeight="0.95"
            letterSpacing="0.02em"
            color="brand.white"
            opacity={0}
            transform="translateX(-50px)"
          >
            MOON SPORTS
            <br />
            <Box as="span" color="brand.gold">GROUP</Box>
          </Heading>

          <Text
            ref={subtitleRef}
            fontSize={{ base: '14px', md: '16px' }}
            color="brand.whiteMuted"
            fontWeight={300}
            letterSpacing="0.05em"
            maxW="480px"
            lineHeight={1.8}
            opacity={0}
            transform="translateX(-40px)"
          >
            Gestionamos carreras de futbolistas y técnicos profesionales
            con visión estratégica y compromiso total.
          </Text>

          {/* Gold divider */}
          <Box
            ref={dividerRef}
            w="60px"
            h="2px"
            background="linear-gradient(90deg, #C9A84C, transparent)"
            mt={2}
            opacity={0}
            transform="scaleX(0)"
            transformOrigin="left"
          />

          <Flex
            ref={ctaRef}
            gap={4}
            flexWrap="wrap"
            justify={{ base: 'center', lg: 'flex-start' }}
            opacity={0}
            transform="translateY(20px)"
            mt={2}
          >
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

        {/* RIGHT — Logo */}
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          {/* Glow ring */}
          <Box
            className="logo-glow"
            position="absolute"
            w={{ base: '320px', lg: '420px' }}
            h={{ base: '320px', lg: '420px' }}
            background="radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)"
            borderRadius="50%"
            pointerEvents="none"
          />
          {/* Inner orbit ring */}
          <Box
            position="absolute"
            w={{ base: '280px', lg: '360px' }}
            h={{ base: '280px', lg: '360px' }}
            borderRadius="50%"
            border="1px solid rgba(201,168,76,0.08)"
            pointerEvents="none"
          />
          {/* Outer orbit ring */}
          <Box
            position="absolute"
            w={{ base: '340px', lg: '440px' }}
            h={{ base: '340px', lg: '440px' }}
            borderRadius="50%"
            border="1px solid rgba(201,168,76,0.04)"
            pointerEvents="none"
          />
          <Image
            ref={logoRef}
            src={logo}
            alt="Moon Sports Group"
            w={{ base: '240px', lg: '320px' }}
            h={{ base: '240px', lg: '320px' }}
            objectFit="contain"
            position="relative"
            zIndex={1}
            filter="drop-shadow(0 0 60px rgba(201,168,76,0.3))"
          />
        </Box>
      </Flex>

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
