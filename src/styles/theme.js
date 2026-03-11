import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      black:     '#080808',
      grayDark:  '#111111',
      grayMid:   '#1A1A1A',
      grayLight: '#2A2A2A',
      grayBorder:'#333333',
      gold:      '#C9A84C',
      goldLight: '#E8C96A',
      goldDark:  '#9A7A35',
      white:     '#FFFFFF',
      whiteMuted:'rgba(255,255,255,0.7)',
      whiteDim:  'rgba(255,255,255,0.15)',
    },
  },
  fonts: {
    heading: "'Bebas Neue', sans-serif",
    body:    "'Outfit', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg:    '#080808',
        color: '#FFFFFF',
        fontFamily: "'Outfit', sans-serif",
        overflowX: 'hidden',
        cursor: 'none',
      },
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      '::-webkit-scrollbar': {
        width: '4px',
      },
      '::-webkit-scrollbar-track': {
        background: '#080808',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#9A7A35',
        borderRadius: '2px',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: '600',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: '4px',
        cursor: 'none',
        _focus: { boxShadow: 'none' },
      },
      variants: {
        gold: {
          bg: 'linear-gradient(135deg, #C9A84C, #9A7A35)',
          color: '#080808',
          fontSize: '13px',
          px: 8,
          py: 4,
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(201,168,76,0.4)',
            bg: 'linear-gradient(135deg, #E8C96A, #C9A84C)',
          },
          _active: { transform: 'translateY(0)' },
        },
        outline: {
          bg: 'transparent',
          color: '#C9A84C',
          border: '1px solid #C9A84C',
          fontSize: '13px',
          px: 8,
          py: 4,
          _hover: {
            bg: 'rgba(201,168,76,0.1)',
            transform: 'translateY(-2px)',
          },
          _active: { transform: 'translateY(0)' },
        },
      },
    },
  },
})

export default theme
