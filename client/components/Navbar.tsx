'use client'

import React, { useState } from 'react'
import { MessageCircle, Menu, X } from 'lucide-react'
import { FaPen, FaRegNewspaper } from 'react-icons/fa'
import WalletButton from './WalletButton'

const buttonClass =
  'border border-white text-white hover:border-red-500 hover:text-red-500 px-3 py-1 rounded-lg flex items-center space-x-2 transition-colors duration-200'

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-red-600 mr-3" />
            <span className="text-2xl font-bold text-white">Voice Chain</span>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className={buttonClass}
              onClick={() => window.location.href = '/upload'}
            >
              <FaPen />
              <span>Write Post</span>
            </button>
            <button 
              className={buttonClass}
              onClick={() => window.location.href = '/posts'}
            >
              <FaRegNewspaper />
              <span>Posts</span>
            </button>
            <WalletButton />
          </div>

          {/* Hamburger for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 px-4 pb-4">
          <div className="border-t border-gray-800 pt-4 space-y-3">
            <button 
              className={buttonClass + ' w-full justify-center'}
              onClick={() => window.location.href = '/upload'}
            >
              <FaPen />
              <span>Write Post</span>
            </button>
            <button 
              className={buttonClass + ' w-full justify-center'}
              onClick={() => window.location.href = '/posts'}
            >
              <FaRegNewspaper />
              <span>Posts</span>
            </button>
            <div className="w-full flex justify-center">
              <WalletButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
