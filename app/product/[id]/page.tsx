'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '@/app/contexts/CartContext'
import Link from 'next/link'

type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
  quantity:number
  rating: number
  stock: number
}

type Size = 'S' | 'M' | 'L' | 'XL'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<Size>('M')
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    // Fetch main product
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => setProduct(data))

    // Fetch similar products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setSimilarProducts(data.slice(0, 4)))
  }, [params.id])

  if (!product) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Image */}
        <div className="md:w-1/2">
          <div className="aspect-square relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-2xl font-medium text-teal-600 mb-6">${product.price}</p>
          
          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">SELECT SIZE</h3>
            <div className="flex gap-3">
              {(['S', 'M', 'L', 'XL'] as Size[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    selectedSize === size
                      ? 'border-teal-600 bg-teal-600 text-white'
                      : 'border-gray-300 hover:border-teal-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-teal-600 text-white py-3 rounded flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors"
            >
              <ShoppingCart size={20} />
              ADD TO CART
            </button>
            <button className="w-12 h-12 border border-gray-300 rounded flex items-center justify-center hover:border-teal-600">
              <Heart size={20} />
            </button>
          </div>

          {/* Product Details */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">PRODUCT DETAILS</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Light Gray solid Top, has a boat neck, 3/4 sleeves</li>
              <li>Material: Cotton</li>
              <li>Machine wash</li>
            </ul>
          </div>

          {/* Seller Info */}
          <div>
            <h3 className="font-medium mb-2">SOLD BY</h3>
            <p className="text-gray-600">Wind & Stars, Stillwater</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-xl font-medium mb-6">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similarProducts.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className="group">
              <div className="aspect-[3/4] relative mb-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-sm mb-1 group-hover:text-teal-600">{item.name}</h3>
              <p className="text-teal-600">${item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

