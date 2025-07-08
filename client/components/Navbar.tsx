import { MessageCircle } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div>
              {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <MessageCircle className="w-8 h-8 text-red-600 mr-3" />
                <span className="text-2xl font-bold text-white">VoiceChain</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white">Features</a>
                <a href="#onboard" className="text-gray-300 hover:text-white">Onboard</a>
                <a href="#join" className="text-gray-300 hover:text-white">Join Platform</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar