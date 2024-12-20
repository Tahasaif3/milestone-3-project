'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '../app/contexts/CartContext'
import { Star, ShoppingCart, Heart } from 'lucide-react'

type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
  rating: number
  quantity:number
  category:string
  stock:number
}

export default function ProductDetail3D({ product }: { product: Product }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height
        setRotation({ x: (y - 0.5) * 30, y: (x - 0.5) * -30 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          ref={containerRef}
          style={{
            perspective: 1000,
          }}
          className="relative h-[500px] w-full"
        >
          <motion.div
            style={{
              rotateX: rotation.x,
              rotateY: rotation.y,
            }}
            className="w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">({product.rating})</span>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

