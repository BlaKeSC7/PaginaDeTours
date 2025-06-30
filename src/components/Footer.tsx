import React from 'react'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Punta Cana Tours</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Discover the beauty of Punta Cana with our expertly curated tours. 
              From pristine beaches to thrilling adventures, we make your Dominican Republic 
              experience unforgettable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/#tours" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Tours
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+1 (809) 555-0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">info@puntacanatours.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                <span className="text-gray-300">
                  Punta Cana, La Altagracia<br />
                  Dominican Republic
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Punta Cana Tours. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Inspired by{' '}
            <a href="https://gotuuri.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
              Gotuuri
            </a>
            {' '}and{' '}
            <a href="https://www.viator.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
              Viator
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer