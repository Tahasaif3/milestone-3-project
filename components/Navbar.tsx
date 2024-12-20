'use client'

import Link from 'next/link'
import { Search, Heart, ShoppingCart, Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../app/contexts/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const { items } = useCart()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleAuth = () => setIsAuthOpen(!isAuthOpen)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Exclusive
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <Link href="/cart" className="text-gray-600 hover:text-blue-600 transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
            <div className="relative">
              <button onClick={toggleAuth} className="text-gray-600 hover:text-blue-600 transition-colors">
                <User className="h-6 w-6" />
              </button>
              <AnimatePresence>
                {isAuthOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                    <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 transition-colors">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink href="/" onClick={toggleMenu}>Home</MobileNavLink>
              <MobileNavLink href="/shop" onClick={toggleMenu}>Shop</MobileNavLink>
              <MobileNavLink href="/about" onClick={toggleMenu}>About</MobileNavLink>
              <MobileNavLink href="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
              <MobileNavLink href="/login" onClick={toggleMenu}>Login</MobileNavLink>
              <MobileNavLink href="/signup" onClick={toggleMenu}>Sign Up</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors">
      {children}
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

