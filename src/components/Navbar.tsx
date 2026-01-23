'use client'

import { CompanyInfo } from '@/data/properties'
import Link from 'next/link'
// import { useState } from 'react'

export default function Navbar() {
  // const [searchQuery, setSearchQuery] = useState('')

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-section border-bottom sticky-top" style={{ zIndex: 10 }}>
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold fs-4 text-white">
          🏠 {CompanyInfo[0].companyName}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Buy
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Rent
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
