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

      {/* Número fantasma con contorno dorado
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
      </Text> */}

      {/* Header: ícono + título (+ flecha en mobile) */}
      <Flex
        align="flex-start"
        gap={4}
        cursor={{ base: 'pointer', md: 'default' }}
        onClick={() => isMobile && setIsOpen((prev) => !prev)}
        role={isMobile ? 'button' : undefined}
        aria-expanded={isMobile ? isOpen : undefined}
      >
        <Box position="relative" flexShrink={0} mt={{ md: 0.5 }}>
          {/* Halo dorado difuso — solo aparece en hover de la card */}
          <Box
            position="absolute"
            inset="-45%"
            borderRadius="full"
            background="radial-gradient(circle, rgba(201,168,76,0.35) 0%, transparent 65%)"
            filter="blur(12px)"
            opacity={0}
            pointerEvents="none"
            transition="opacity 0.5s ease"
            _groupHover={{ opacity: 1 }}
          />

          <Flex
            position="relative"
            w={{ base: '42px', md: '52px' }}
            h={{ base: '42px', md: '52px' }}
            align="center"
            justify="center"
            border="1px solid"
            borderColor="rgba(201,168,76,0.22)"
            borderRadius="xl"
            bg="linear-gradient(145deg, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.04) 48%, rgba(255,255,255,0.02) 100%)"
            boxShadow="inset 0 1px 0 rgba(232,201,106,0.22), inset 0 -8px 14px -8px rgba(0,0,0,0.55)"
            color="brand.gold"
            fontSize={{ base: '20px', md: '24px' }}
            transition="border-color 0.45s ease, background 0.45s ease, box-shadow 0.45s ease, color 0.45s ease, transform 0.45s ease"
            _groupHover={{
              borderColor: 'rgba(232,201,106,0.7)',
              bg: 'linear-gradient(145deg, rgba(201,168,76,0.28) 0%, rgba(201,168,76,0.08) 50%, rgba(255,255,255,0.03) 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(232,201,106,0.4), 0 10px 22px -8px rgba(201,168,76,0.45)',
              color: 'brand.goldLight',
              transform: { md: 'translateY(-2px)' },
            }}
            sx={{
              '& svg': {
                transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
              },
              '[role=group]:hover & svg': { transform: 'scale(1.08)' },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
                '& svg': { transition: 'none' },
              },
            }}
          >
            {service.icon}
          </Flex>
        </Box>

        <Heading
          as="h3"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '20px', md: '30px' }}
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
          alignSelf="center"
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
