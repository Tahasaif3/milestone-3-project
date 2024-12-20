'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Users, TrendingUp, Award, Mail, Star } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Hero />
      <OurStory />
      <OurValues />
      <Timeline />
      <FeaturedProducts />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  )
}

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        About Exclusive
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover our journey, values, and the team behind your favorite online shopping destination.
      </p>
    </motion.div>
  )
}

function OurStory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Exclusive was founded in 2010 with a simple mission: to provide high-quality products at affordable prices. Over the years, we have grown from a small local shop to a global e-commerce platform, serving customers in over 50 countries.
        </p>
        <p className="text-gray-600 mb-4">
          Our success is built on our commitment to customer satisfaction, innovative product curation, and a passion for staying ahead of the latest trends in fashion, technology, and lifestyle products.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        >
          Learn More
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image src="/about.png?height=300&width=500" alt="About Exclusive" width={500} height={300} className="rounded-lg shadow-lg" />
      </motion.div>
    </div>
  )
}

function OurValues() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-24"
    >
      <h2 className="text-3xl font-semibold mb-8 text-center">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ValueCard
          icon={<Users className="w-12 h-12 text-purple-600" />}
          title="Customer Focus"
          description="Our customers are at the heart of everything we do. We strive to exceed expectations and build lasting relationships."
        />
        <ValueCard
          icon={<TrendingUp className="w-12 h-12 text-purple-600" />}
          title="Innovation"
          description="We constantly seek new ways to improve our products, services, and the overall shopping experience for our customers."
        />
        <ValueCard
          icon={<Award className="w-12 h-12 text-purple-600" />}
          title="Quality"
          description="We are committed to offering only the best products, carefully curated to ensure the highest standards of quality and value."
        />
      </div>
    </motion.div>
  )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

function Timeline() {
  const events = [
    { year: 2010, title: "Founded", description: "Exclusive launches as a small local shop." },
    { year: 2015, title: "Expansion", description: "We expand to serve customers nationwide." },
    { year: 2018, title: "Going Global", description: "Exclusive becomes an international e-commerce platform." },
    { year: 2023, title: "Innovation", description: "Launch of AI-powered personalized shopping experience." },
  ]

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-semibold mb-8 text-center">Our Journey</h2>
      <div className="relative">
        {/* Vertical line that connects all points */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-purple-600/20 transform -translate-x-1/2 z-0" />

        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-8 mb-16 relative z-10"
          >
            <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'order-2 text-left'}`}>
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
              {event.year}
            </div>
            <div className={`flex-1 ${index % 2 === 0 ? 'order-2' : ''}`} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Testimonials() {
  const testimonials = [
    { name: "Alex M.", text: "Exclusive has been my go-to for years. Their product quality and customer service are unmatched!" },
    { name: "Emily R.", text: "I love how easy it is to find exactly what I'm looking for on Exclusive. The website is so user-friendly!" },
    { name: "Chris T.", text: "The variety of products on Exclusive is amazing. I always find unique items that I can't get anywhere else." },
  ]

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-semibold mb-8 text-center">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <p className="text-gray-600 mb-4">`{testimonial.text}`</p>
            <p className="font-semibold">{testimonial.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FAQ() {
  const faqs = [
    { question: "How do I track my order?", answer: "You can track your order by logging into your account and viewing the order status in your order history." },
    { question: "What is your return policy?", answer: "We offer a 30-day return policy for most items. Please check our Returns page for more details." },
    { question: "Do you ship internationally?", answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location." },
  ]

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgb(243 244 246)" : "rgb(255 255 255)" }}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left"
      >
        <span className="font-semibold">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <motion.div
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 pt-0">
          <p className="text-gray-600">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Newsletter() {
  return (
    <div className="bg-purple-100 rounded-lg p-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
      <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
      <form className="flex max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-6 py-2 rounded-r-full font-semibold hover:bg-purple-700 transition-colors flex items-center"
        >
          Subscribe
          <Mail className="w-5 h-5 ml-2" />
        </motion.button>
      </form>
    </div>
  )
}

function FeaturedProducts() {
  const products = [
    { id: 1, name: "Eco-Friendly Water Bottle", price: 24.99, rating: 4.5, image: "/fa1.jpeg?height=300&width=300" },
    { id: 2, name: "Wireless Noise-Cancelling Headphones", price: 199.99, rating: 4.8, image: "/fa2.jpeg?height=300&width=300" },
    { id: 3, name: "Organic Cotton T-Shirt", price: 29.99, rating: 4.2, image: "/fa3.avif?height=300&width=300" },
  ]

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-semibold mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-transparent'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.rating})</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

