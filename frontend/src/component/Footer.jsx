import React from 'react'
import { useNavigate } from 'react-router-dom'

const companyLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Collections', path: '/collection' },
  { label: 'Contact', path: '/contact' },
]

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="w-full border-t border-white/10 bg-[#0c2025] text-white pb-24 lg:pb-0">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 md:px-10 md:py-14">
        <div className="text-center sm:text-left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/Counter-Strike_CS_logo.svg"
            className="mx-auto mb-4 h-12 w-auto object-contain sm:mx-0"
            alt="CS Store"
          />
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#d5eef2] sm:mx-0">
            CS Store is your all-in-one online shopping destination, offering top
            quality products, unbeatable deals, and fast delivery—all backed by
            trusted service designed to make your life easier every day.
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#8ee9f2]">COMPANY</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => navigate(link.path)}
                  className="cursor-pointer text-[#f3fafa] transition hover:text-[#8ee9f2]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:col-span-2 sm:text-left lg:col-span-1 lg:text-right">
          <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#8ee9f2]">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-[#f3fafa]">
            <li>+91-7680914066</li>
            <li className="break-all">cjanipireddy@gmail.com</li>
            <li>+1-123-456-7890</li>
            <li className="break-all">admin@cs.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-[#b7d5da] sm:text-sm">
        Copyright 2025 @cs.com - All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer
