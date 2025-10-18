import React from 'react'

const Footer = () => {
  return (
      <footer className="bg-purple-950 text-gray-200 text-center py-6">
        <p className="text-sm md:text-base tracking-wide">
          © {new Date().getFullYear()} <span className="font-semibold">CareerPathAI</span>. All rights reserved.
        </p>
      </footer>
  )
}

export default Footer
