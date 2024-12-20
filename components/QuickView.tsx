'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Heart, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'

type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
  rating: number
  stock: number
  category: string
}

export default function QuickView({ 
  product, 
  isOpen, 
  onClose 
}: { 
  product: Product | null
  isOpen: boolean
  onClose: () => void 
}) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const [imageIndex, setImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  if (!product) return null

  const images = [
    product.image,
    product.image, 
    product.image,
  ]

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stock))
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    onClose()
  }

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left side - Image Gallery */}
              <div className="relative group">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[imageIndex]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`relative w-20 aspect-square rounded-lg overflow-hidden flex-shrink-0 ${
                        idx === imageIndex ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right side - Product Details */}
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                      {product.description}
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      ({product.rating})
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700 dark:text-gray-300">Quantity</span>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={decrementQuantity}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="w-12 text-center text-lg font-medium">
                          {quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={incrementQuantity}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsLiked(!isLiked)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          isLiked 
                            ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/20' 
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
