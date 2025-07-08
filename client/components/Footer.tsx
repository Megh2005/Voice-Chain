import { MessageCircle } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-black border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <MessageCircle className="w-8 h-8 text-red-600 mr-2" />
                <h3 className="text-2xl font-bold text-white">Voice Chain</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Decentralized platform for transparent reporting and fighting corruption through blockchain technology.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Submit Report</a></li>
                <li><a href="#" className="hover:text-white">Verify Reports</a></li>
                <li><a href="#" className="hover:text-white">Browse Cases</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Whitepaper</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Telegram</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VoiceChain. Empowering transparency through blockchain technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer