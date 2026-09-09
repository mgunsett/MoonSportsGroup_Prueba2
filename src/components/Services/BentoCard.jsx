import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Collapse,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

const ChevronIcon = (props) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export function BentoCard({ service, gridColumn, gridRow }) {
  const cardRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false })

  // Spotlight dorado que sigue al cursor (solo actualiza CSS vars)
  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }

    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <Flex
      ref={cardRef}
      className="bento-card"
      role="group"
      direction="column"
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      border="1px solid"
      borderColor="brand.grayBorder"
      bg="linear-gradient(160deg, #1A1A1A 0%, #111111 75%)"
      p={{ base: 4, md: 6, lg: 7 }}
      gridColumn={gridColumn}
      gridRow={gridRow}
      transition="border-color 0.45s ease, transform 0.45s ease, box-shadow 0.45s ease"
      _hover={{
        borderColor: 'rgba(201,168,76,0.5)',
        transform: { md: 'translateY(-4px)' },
        boxShadow: '0 24px 48px rgba(0,0,0,0.45)',
      }}
    >
      {/* Spotlight que sigue el cursor */}
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        opacity={0}
        transition="opacity 0.5s ease"
        _groupHover={{ opacity: 1 }}
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(201,168,76,0.1), transparent 60%)',
        }}
      />

      {/* Número fantasma con contorno dorado */}
      <Text
        aria-hidden="true"
        position="absolute"
        top={{ base: '50%', md: 3 }}
        right={{ base: 12, md: 5 }}
        transform={{ base: 'translateY(-50%)', md: 'none' }}
        fontFamily="'Bebas Neue', sans-serif"
        fontSize={{ base: '44px', md: '72px' }}
        lineHeight={1}
        color="transparent"
        pointerEvents="none"
        userSelect="none"
        sx={{
          WebkitTextStroke: '1px rgba(201,168,76,0.18)',
          transition: 'color 0.5s ease, -webkit-text-stroke-color 0.5s ease',
          '[role=group]:hover &': {
            color: 'rgba(201,168,76,0.08)',
            WebkitTextStroke: '1px rgba(201,168,76,0.35)',
          },
        }}
      >
        {service.num}
      </Text>

      {/* Header: ícono + título (+ flecha en mobile) */}
      <Flex
        align="center"
        gap={4}
        cursor={{ base: 'pointer', md: 'default' }}
        onClick={() => isMobile && setIsOpen((prev) => !prev)}
        role={isMobile ? 'button' : undefined}
        aria-expanded={isMobile ? isOpen : undefined}
      >
        <Flex
          w={{ base: '38px', md: '44px' }}
          h={{ base: '38px', md: '44px' }}
          flexShrink={0}
          align="center"
          justify="center"
          border="1px solid"
          borderColor="rgba(201,168,76,0.3)"
          borderRadius="lg"
          bg="rgba(201,168,76,0.06)"
          color="brand.gold"
          fontSize={{ base: '18px', md: '20px' }}
          transition="all 0.4s ease"
          _groupHover={{
            borderColor: 'brand.gold',
            bg: 'rgba(201,168,76,0.12)',
          }}
        >
          {service.icon}
        </Flex>

        <Heading
          as="h3"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '20px', md: '24px' }}
          letterSpacing="0.04em"
          lineHeight={1.1}
          color="brand.white"
          pr={{ base: 8, md: 10 }}
        >
          {service.title}
        </Heading>

        {/* Flecha solo visible en mobile */}
        <Box
          display={{ base: 'flex', md: 'none' }}
          ml="auto"
          color="brand.gold"
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
          transition="transform 0.35s ease"
        >
          <ChevronIcon />
        </Box>
      </Flex>

      {/* Descripción: acordeón en mobile, siempre visible en desktop */}
      {isMobile ? (
        <Collapse in={isOpen} animateOpacity>
          <Text
            pt={3}
            fontSize="sm"
            lineHeight={1.7}
            color="brand.whiteMuted"
            fontWeight={300}
            whiteSpace="pre-line"
          >
            {service.desc}
          </Text>
        </Collapse>
      ) : (
        <Text
          pt={4}
          fontSize="sm"
          lineHeight={1.7}
          color="brand.whiteMuted"
          fontWeight={300}
          whiteSpace="pre-line"
        >
          {service.desc}
        </Text>
      )}

      {/* Línea dorada inferior */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        h="2px"
        bg="linear-gradient(90deg, transparent, #C9A84C, transparent)"
        transform="scaleX(0)"
        transformOrigin="center"
        transition="transform 0.6s ease"
        _groupHover={{ transform: 'scaleX(1)' }}
      />
    </Flex>
  )
}
