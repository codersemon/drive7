import React from 'react'

import { AdminLogo } from './AdminLogo'

/**
 * Injected via `admin.components.beforeNavLinks`. Gives the sidebar a brand
 * anchor instead of starting straight into group labels.
 */
export const NavBrand = () => (
  <div className="d7-nav-brand">
    <AdminLogo />
    <span className="d7-nav-brand__caption">Content management</span>
  </div>
)
