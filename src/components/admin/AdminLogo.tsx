import React from 'react'

const GREY = '#7E7F7F'
const RED = '#EE0606'

/** Full wordmark — used on the login screen and the admin nav header. */
export const AdminLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={230}
    viewBox="0 0 131.319 19.604"
    role="img"
    aria-label="Drive7"
  >
    <g transform="translate(-23.455)">
      <path
        d="M134.846,0h17.137s4.025,1.247,2.408,6.086L139.426,19.6h-7.5l16.278-14.81-8.315-.015-5.71-.045L134.853,0Z"
        fill={RED}
      />
      <path
        d="M131.1,4.591,131.829,0H114.916a3.4,3.4,0,0,0-3.092,2.908L109.172,19.6H128.71l.724-4.583H115.152l.46-2.915H129.9l.73-4.583H116.343l.467-2.923H131.1Z"
        fill={GREY}
      />
      <path
        d="M109.659,0,97.948,19.6h-8.1L84.35,0h5.859l4.316,15.591L102.6,2.014C103.272.932,104.017,0,105.153,0Z"
        fill={GREY}
      />
      <path
        d="M82.219,0,79.107,19.6h-5.25L76.5,2.938V2.915A3.412,3.412,0,0,1,79.594,0Z"
        fill={GREY}
      />
      <path
        d="M70.7,0H55A3.394,3.394,0,0,0,51.91,2.893L49.251,19.6h5.257l.825-5.215h8.626L65.421,19.6h5.8L69.7,14.134a4.958,4.958,0,0,0,2.983-3.787l.541-3.374.46-2.923C74.046,1.818,72.714,0,70.7,0ZM68.018,6.7l-.156.954v.015A2.473,2.473,0,0,1,65.61,9.806H56.064l.825-5.215h9.539A1.7,1.7,0,0,1,68.012,6.7Z"
        fill={GREY}
      />
      <path
        d="M44.942,0H29.192A3.392,3.392,0,0,0,26.1,2.923L23.455,19.6H41.837c2.645,0,5.175-2.382,5.642-5.327l.751-4.764.67-4.178C49.367,2.389,47.594,0,44.942,0ZM43.312,7.4l-.284,1.773-.48,3.028A3.266,3.266,0,0,1,39.57,15.02H29.429L31.08,4.6H41.221A2.236,2.236,0,0,1,43.3,7.409Z"
        fill={GREY}
      />
    </g>
  </svg>
)

/**
 * Square mark for the breadcrumb / favicon slot. The full wordmark is far too
 * wide for it, so this crops to the "7".
 */
export const AdminIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="109.4 -2 23.6 23.6"
    role="img"
    aria-label="Drive7"
    style={{ width: '100%', height: '100%' }}
  >
    <g transform="translate(-23.455)">
      <path
        d="M134.846,0h17.137s4.025,1.247,2.408,6.086L139.426,19.6h-7.5l16.278-14.81-8.315-.015-5.71-.045L134.853,0Z"
        fill={RED}
      />
    </g>
  </svg>
)
