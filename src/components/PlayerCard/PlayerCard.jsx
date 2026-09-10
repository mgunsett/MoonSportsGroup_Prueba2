import { Box, Flex, Image, Text } from '@chakra-ui/react'

// Selectores de hover/foco basados en la clase de la card, para no ocupar el
// atributo `role` (que necesitamos libre para la semántica de botón).
const onHover = (styles) => ({
  '.player-card:hover &': styles,
  '.player-card:focus-visible &': styles,
})

/**
 * Card de representado — compartida por el slider del Home y la grilla de /jugadores.
 * `onClick` la vuelve interactiva (abre el modal) y accesible por teclado.
 */
export function PlayerCard({ player, onClick }) {
  const interactive = typeof onClick === 'function'

  const handleKeyDown = (e) => {
    if (!interactive) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(player)
    }
  }

  return (
    <Box
      className="player-card"
      h="100%"
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      border="1px solid"
      borderColor="rgba(255,255,255,0.07)"
      bg="#0A0A0A"
      cursor={interactive ? 'pointer' : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Ver perfil de ${player.name} ${player.lastname}` : undefined}
      onClick={interactive ? () => onClick(player) : undefined}
      onKeyDown={handleKeyDown}
      transition="border-color 0.45s ease, transform 0.45s ease, box-shadow 0.45s ease"
      _hover={{
        borderColor: 'rgba(201,168,76,0.55)',
        transform: { md: 'translateY(-6px)' },
        boxShadow: '0 28px 56px -20px rgba(0,0,0,0.9)',
      }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'brand.gold',
        outlineOffset: '2px',
      }}
      sx={{
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '& *': { transition: 'none !important' },
        },
      }}
    >
      {/* ---- Media ---- */}
      <Box position="relative" w="100%" overflow="hidden" flexShrink={0} sx={{ aspectRatio: '4 / 5' }}>
        {/* Spotlight dorado detrás del recorte del jugador */}
        <Box
          position="absolute"
          inset={0}
          background="radial-gradient(115% 78% at 50% 92%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.035) 38%, transparent 68%), linear-gradient(180deg, #151515 0%, #0A0A0A 100%)"
          pointerEvents="none"
        />

        <Image
          zIndex={99999999999999}
          src={player.image}
          alt={`${player.name} ${player.lastname}, ${player.position} de ${player.club}`}
          loading="lazy"
          position="absolute"
          inset={0}
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="top"
          filter="grayscale(25%) contrast(1.03)"
          transition="transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease"
          sx={onHover({ transform: 'scale(1.05)', filter: 'grayscale(0%) contrast(1.06)' })}
        />

        {/* Scrim: funde la foto con el bloque de datos */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          background="linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.82) 18%, rgba(10,10,10,0.15) 52%, transparent 76%)"
        />

        {/* Dorsal fantasma */}
        <Text
          aria-hidden="true"
          position="absolute"
          top={{ base: 1, md: -2 }}
          right={{ base: 2, md: -4 }}
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '38px', md: '250px' }}
          lineHeight={1}
          color="rgba(201,168,76,0.13)"
          pointerEvents="none"
          userSelect="none"
          transition="color 0.5s ease"
          sx={onHover({ color: 'rgba(201,168,76,0.28)' })}
          zIndex={0}
        >
          {player.number}
        </Text>
      </Box>

      {/* ---- Datos ---- */}
      <Box
        position="relative"
        flex="1"
        bg="#0A0A0A"
        px={{ base: 3, md: 5 }}
        pt={{ base: 2, md: 3 }}
        pb={{ base: 4, md: 5 }}
        zIndex={99999}
      >
        <Text
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '20px', md: '27px' }}
          lineHeight={1.05}
          letterSpacing="0.03em"
          color="brand.white"
        >
          {player.name}{' '}
          <Box as="span" color="brand.gold">
            {player.lastname}
          </Box>
        </Text>
        <Flex align="center" gap={2} mt={{ base: 1.5, md: 2 }}>
          {player.escudo && (
            <Image
              src={player.escudo}
              alt=""
              aria-hidden="true"
              w={{ base: '15px', md: '19px' }}
              h={{ base: '15px', md: '19px' }}
              objectFit="contain"
              flexShrink={0}
              opacity={0.85}
              transition="opacity 0.4s ease"
              sx={onHover({ opacity: 1 })}
            />
          )}
          <Text
            fontSize={{ base: '10px', md: '11px' }}
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="brand.gold"
            fontWeight={600}
            noOfLines={1}
          >
            {player.club}
          </Text>
        </Flex>

        <Text
          fontSize={{ base: '9px', md: '10px' }}
          mt={1}
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="brand.whiteMuted"
          noOfLines={1}
        >
          {player.position}
        </Text>
      </Box>

      {/* Hairline dorada inferior */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="2px"
        background="linear-gradient(90deg, transparent, #C9A84C, transparent)"
        transform="scaleX(0)"
        transformOrigin="center"
        transition="transform 0.6s ease"
        pointerEvents="none"
        sx={onHover({ transform: 'scaleX(1)' })}
      />
    </Box>
  )
}
