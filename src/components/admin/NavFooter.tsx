import React from 'react'

/** Injected via `admin.components.afterNavLinks`. */
export const NavFooter = () => (
  <a className="d7-nav-view-site" href="/" target="_blank" rel="noopener noreferrer">
    <span>View site</span>
    <svg viewBox="0 0 16 16" aria-hidden="true" width="13" height="13">
      <path
        d="M6 3h7v7M13 3 4 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </a>
)
