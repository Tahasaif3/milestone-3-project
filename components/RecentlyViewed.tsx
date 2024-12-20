'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Product = {
  id: number
  name: string
  price: number
  image: string
}

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([])

  useEffect(() => {
    const storedProducts = localStorage.getItem('recentlyViewed')
    if (storedProducts) {
      setRecentProducts(JSON.parse(storedProducts))
    }
  }, [])

  if (recentProducts.length === 0) return null

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentProducts.slice(0, 5).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 truncate">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

