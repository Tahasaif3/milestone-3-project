import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">FASHION</h2>
            <p className="text-gray-400 mb-4">
              Complete your style with awesome clothes from us.
            </p>
            <div className="flex space-x-3">
              {/* Social Media Icons */}
              <div className="bg-yellow-500 p-2 rounded-full text-black">
                <Facebook size={20} />
              </div>
              <div className="bg-yellow-500 p-2 rounded-full text-black">
                <Instagram size={20} />
              </div>
              <div className="bg-yellow-500 p-2 rounded-full text-black">
                <Twitter size={20} />
              </div>
              <div className="bg-yellow-500 p-2 rounded-full text-black">
                <Linkedin size={20} />
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact us</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* Quick Link Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/location">Share Location</Link></li>
              <li><Link href="/orders">Orders Tracking</Link></li>
              <li><Link href="/size-guide">Size Guide</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 flex justify-center text-gray-500">
          <p>&copy; 2024 Rimel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
