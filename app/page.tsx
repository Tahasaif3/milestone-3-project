'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ArrowRight, ShoppingBag, Heart, Eye, Truck, Headphones, ShieldCheck, Twitter, Instagram, Linkedin } from 'lucide-react'
import QuickView from '@/components/QuickView'
import RecentlyViewed from '@/components/RecentlyViewed'
import BackToTop from '@/components/BackToTop'

type Product = {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  description: string
  rating: number
  stock: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection />
      <NewArrivalSection />
      <FeaturedProductsSection
        products={products}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setQuickViewProduct={setQuickViewProduct}
      />
      <PromotionalBanner />
      <BestSellingProductsSection products={products} setQuickViewProduct={setQuickViewProduct} />
      <PromotionalBanner3 />
      <PromotionalBanner2 />
      <RecentlyViewed />
      <TeamSection />
      <ServiceFeaturesSection />
      <NewsFeed/>
      <TestimonialsSection />
      <Voucher/>
      <NewsletterSection />
      <QuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <BackToTop />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full inline-block mb-4"
            >
              SUMMER IS COMING
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              FIND YOUR <br />
              TRUE STYLE <br />
              HERE
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Our fashion collection is made with high-quality materials and designed to fit your body like a glove. 
              Shop now to find the perfect pieces for your wardrobe.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/shop"
                className="bg-black text-white px-8 py-4 rounded-full inline-flex items-center hover:bg-gray-800 transition-colors"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full">
              <Image
                src="/hero.png?height=500&width=500"
                alt="Fashion Collection"
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute -right-4 -top-4 bg-yellow-400 text-black font-bold px-6 py-2 rounded-full">
                50% OFF
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className='mb-20'>
      <h2 className="text-3xl font-bold mb-8">Our Brands</h2>
        <Image
                src="/Brands.png?height=500&width=500"
                alt="Fashion Collection"
                width={1920}
                height={186}
                className="object-cover rounded-2xl"
              />   
      </div>
      <div className="bg-black text-white py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex space-x-8 whitespace-nowrap"
        >
          <span>New Collection 2024</span>
          <span>Get Up To 50% Off</span>
          <span>Best Fashion</span>
          <span>Summer Collection</span>
          <span>Winter Specials</span>
          <span>Premium Quality</span>
          <span>New Collection 2024</span>
          <span>Get Up To 50% Off</span>
          <span>Best Fashion</span>
          <span>Summer Collection</span>
          <span>Winter Specials</span>
          <span>Premium Quality</span>
        </motion.div>
      </div>
    </section>
  )
}

function NewArrivalSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <Image
       src={"/newarrivals.png"}
       alt='new arrivals'
       width={1638}
       height={967}/>
      </div>
    </section>
  )
}

interface FeaturedProductsSectionProps {
  products: Product[]
  activeCategory: string
  setActiveCategory: (category: string) => void
  setQuickViewProduct: (product: Product | null) => void
}

function FeaturedProductsSection({ products, activeCategory, setActiveCategory, setQuickViewProduct }: FeaturedProductsSectionProps) {
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 sm:mb-0">Featured Products</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Electronics', 'Fashion', 'Shoes'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                  } transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative group">
                <div className="relative h-[300px] rounded-t-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                    <ShoppingBag className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">({product.rating})</span>
                </div>
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">{product.stock} left</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function PromotionalBanner() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <Image
       src={"/Banner.png"}
       alt='Banne'
       width={1924}
       height={968}/>
      </div>
    </section>
  )
}

interface BestSellingProductsSectionProps {
  products: Product[]
  setQuickViewProduct: (product: Product | null) => void
}

function BestSellingProductsSection({ products, setQuickViewProduct }: BestSellingProductsSectionProps) {
  const bestSellers = products.slice(0, 4) 
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">This Month</h2>
          <Link href="/shop" className="text-red-500 hover:underline">View All</Link>
        </div>
        <h3 className="text-2xl font-bold mb-6">Best Selling Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative group">
                <div className="relative h-64 rounded-t-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                    <ShoppingBag className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">({product.rating})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PromotionalBanner3() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <Image
       src={"/banner1.png"}
       alt='Banne'
       width={1440}
       height={664}/>
      </div>
    </section>
  )
}

function PromotionalBanner2() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <Image
       src={"/favourite.png"}
       alt='Banne'
       width={1720}
       height={847}/>
      </div>
    </section>
  )
}

function TeamSection() {
  const teamMembers = [
    { name: "Tom Cruise", role: "Founder & Chairman", image: "/team1.jpg?height=300&width=300&text=Tom Cruise" },
    { name: "Emma Watson", role: "Managing Director", image: "/team3.webp?height=300&width=300&text=Emma Watson" },
    { name: "Will Smith", role: "Product Designer", image: "/team2.webp?height=300&width=300&text=Will Smith" },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                  <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer" />
                  <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceFeaturesSection() {
  const features = [
    { icon: Truck, title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140" },
    { icon: Headphones, title: "24/7 CUSTOMER SERVICE", description: "Friendly 24/7 customer support" },
    { icon: ShieldCheck, title: "MONEY BACK GUARANTEE", description: "We return money within 30 days" },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <feature.icon className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsFeed() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <Image
       src={"/instagram.png"}
       alt='newsfeed'
       width={1440}
       height={550}/>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Fashion Enthusiast",
              comment: "The quality of products is outstanding. I'm always excited to shop here!",
              rating: 5
            },
            {
              name: "Mike Thompson",
              role: "Tech Reviewer",
              comment: "Great selection of electronics and amazing customer service.",
              rating: 5
            },
            {
              name: "Emily Davis",
              role: "Regular Customer",
              comment: "The best shopping experience I've had online. Fast delivery and great prices!",
              rating: 4
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.comment}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? 'fill-current' : 'fill-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Voucher() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <Image
       src={"/Vouchers.png"}
       alt='coucher'
       width={1483}
       height={710}/>
      </div>
    </section>
  )
}

function NewsletterSection() {
  return (
    <section className="bg-yellow-500 py-16">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          JOIN SHOPPING COMMUNITY TO <br /> GET MONTHLY PROMO
        </h2>
        <p className="text-white mb-6 sm:mb-8 text-lg">
          Type your email down below and be young wild generation
        </p>
        <form className="max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Add your email here"
            className="flex-1 px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}

