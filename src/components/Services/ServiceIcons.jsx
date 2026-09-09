const iconProps = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const BallIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.2l4.3 3.1-1.6 5h-5.4l-1.6-5z" />
    <path d="M12 3v4.2M7.7 10.3L3.6 9M16.3 10.3L20.4 9M9.3 15.3l-2.5 3.4M14.7 15.3l2.5 3.4" />
  </svg>
)

export const BoardIcon = (props) => (
  <svg {...iconProps} {...props}>
    <rect x="5" y="5" width="14" height="16" rx="2" />
    <path d="M9 5a3 3 0 0 1 6 0" />
    <path d="M9 11h6M9 15h6M9 18h3.5" />
  </svg>
)

export const CameraIcon = (props) => (
  <svg {...iconProps} {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7l1.6-2.6h2.8L15 7" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
)

export const ScaleIcon = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M12 4v16M8 20h8M6 7h12" />
    <path d="M6 7l-3 6.5a3.2 3.2 0 0 0 6 0z" />
    <path d="M18 7l-3 6.5a3.2 3.2 0 0 0 6 0z" />
  </svg>
)

export const GlobeIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
  </svg>
)

export const TargetIcon = (props) => (
  <svg {...iconProps} {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </svg>
)
