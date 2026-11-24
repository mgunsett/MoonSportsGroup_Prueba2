// Iconos de servicios — grilla 24x24, trazo optimizado para lectura a ~22px.
// El detalle secundario va con opacidad reducida para dar jerarquía dentro del glifo.
const iconProps = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export const BallIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 9l2.85 2.07-1.09 3.36h-3.52L9.15 11.07z" />
    <g opacity="0.5">
      <path d="M12 9V3.4M14.85 11.07l5.33-1.73M13.76 14.43l3.29 4.53M10.24 14.43l-3.29 4.53M9.15 11.07L3.82 9.34" />
    </g>
  </svg>
)

export const BoardIcon = (props) => (
  <svg {...iconProps} {...props}>
    <rect x="5" y="5.5" width="14" height="15" rx="2.4" />
    <path d="M9.2 5.5V4.6A1.1 1.1 0 0 1 10.3 3.5h3.4A1.1 1.1 0 0 1 14.8 4.6v0.9" />
    <g opacity="0.5">
      <path d="M8.7 10.4h6.6M8.7 13.6h6.6M8.7 16.8h3.8" />
    </g>
  </svg>
)

export const CameraIcon = (props) => (
  <svg {...iconProps} {...props}>
    <rect x="3.4" y="7" width="17.2" height="12.6" rx="2.4" />
    <circle cx="12" cy="13.3" r="3.3" />
    <g opacity="0.5">
      <path d="M9.2 7l1.35-2.2h2.9L14.8 7" />
      <circle cx="17.4" cy="10.4" r="0.75" fill="currentColor" stroke="none" />
    </g>
  </svg>
)

export const ScaleIcon = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M12 4.4v15.2M6 7.6h12" />
    <path d="M6 7.6l-2.7 5.8a3 3 0 0 0 5.4 0z" />
    <path d="M18 7.6l-2.7 5.8a3 3 0 0 0 5.4 0z" />
    <path d="M8.4 19.6h7.2" opacity="0.5" />
  </svg>
)

export const GlobeIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 3.4c2.35 2.3 3.6 5.3 3.6 8.6s-1.25 6.3-3.6 8.6c-2.35-2.3-3.6-5.3-3.6-8.6s1.25-6.3 3.6-8.6z" />
    <path d="M3.4 12h17.2" opacity="0.5" />
  </svg>
)

export const TargetIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <circle cx="12" cy="12" r="4.6" opacity="0.5" />
    <circle cx="12" cy="12" r="1.35" fill="currentColor" stroke="none" />
  </svg>
)
