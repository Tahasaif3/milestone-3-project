import { NextResponse } from 'next/server'

const products = [
  // Tech Products
  {
    id: 1,
    name: "Smart Pro Wireless Earbuds",
    price: 129.99,
    category: "Electronics",
    image: "/f1.jpg?height=400&width=400",
    description: "Premium wireless earbuds with active noise cancellation",
    rating: 4.5,
    stock: 50
  },
  {
    id: 2,
    name: "Ultra HD Smart Watch",
    price: 199.99,
    category: "Electronics",
    image: "/f2.jpg?height=400&width=400",
    description: "Advanced smartwatch with health monitoring features",
    rating: 4.8,
    stock: 30
  },
  // Fashion - Clothes
  {
    id: 3,
    name: "Summer Breeze Dress",
    price: 79.99,
    category: "Fashion",
    image: "/f3.png?height=400&width=400",
    description: "Light and flowy summer dress with floral pattern",
    rating: 4.6,
    stock: 25
  },
  {
    id: 4,
    name: "Classic Denim Jacket",
    price: 89.99,
    category: "Fashion",
    image: "/f4.webp?height=400&width=400",
    description: "Timeless denim jacket for any occasion",
    rating: 4.7,
    stock: 40
  },
  // Shoes
  {
    id: 5,
    name: "Urban Runner Sneakers",
    price: 119.99,
    category: "Shoes",
    image: "/f5.avif?height=400&width=400",
    description: "Comfortable and stylish running shoes",
    rating: 4.4,
    stock: 35
  },
  {
    id: 6,
    name: "Classic Leather Boots",
    price: 149.99,
    category: "Shoes",
    image: "/f6.webp?height=400&width=400",
    description: "Durable leather boots for everyday wear",
    rating: 4.9,
    stock: 20
  },
  // Sweaters
  {
    id: 7,
    name: "Cozy Knit Sweater",
    price: 69.99,
    category: "Fashion",
    image: "/f7.avif?height=400&width=400",
    description: "Warm and comfortable knit sweater",
    rating: 4.3,
    stock: 45
  },
  {
    id: 8,
    name: "Cashmere Blend Cardigan",
    price: 129.99,
    category: "Fashion",
    image: "/f8.webp?height=400&width=400",
    description: "Luxury cashmere blend cardigan",
    rating: 4.7,
    stock: 15
  },

  {
    id: 9,
    name: "The North Coat",
    price: 260,
    originalPrice: 360,
    category: "Fashion",
    image: "/f9.webp?height=400&width=400",
    description: "Stylish and warm coat for the winter season",
    rating: 5,
    stock: 20
  },
  {
    id: 10,
    name: "Gucci Duffle Bag",
    price: 960,
    originalPrice: 1160,
    category: "Fashion",
    image: "/f10.jpeg?height=400&width=400",
    description: "Luxury duffle bag from Gucci",
    rating: 4.5,
    stock: 15
  },
  {
    id: 11,
    name: "RGB Liquid CPU Cooler",
    price: 160,
    originalPrice: 170,
    category: "Electronics",
    image: "/f11.webp?height=400&width=400",
    description: "High-performance CPU cooler with RGB lighting",
    rating: 4,
    stock: 30
  },
  {
    id: 12,
    name: "Small BookShelf",
    price: 360,
    originalPrice: 400,
    category: "Furniture",
    image: "/f12.webp?height=400&width=400",
    description: "Compact bookshelf for small spaces",
    rating: 4.5,
    stock: 25
  },
  {
    id: 13,
    name: "PlayStation 5",
    price: 499,
    category: "Electronics",
    image: "/f13.jpeg?height=400&width=400",
    description: "Next-gen gaming console from Sony",
    rating: 4.8,
    stock: 10
  },
  {
    id: 14,
    name: "Women's Hat Collection",
    price: 99,
    category: "Fashion",
    image: "/f14.webp?height=400&width=400",
    description: "Elegant hat collection for women",
    rating: 4.3,
    stock: 50
  },
  {
    id: 15,
    name: "Amazon Echo",
    price: 99,
    category: "Electronics",
    image: "/f15.webp?height=400&width=400",
    description: "Smart speaker with Alexa",
    rating: 4.5,
    stock: 100
  },
  {
    id: 16,
    name: "Gucci Intense Oud EDP",
    price: 129,
    category: "Beauty",
    image: "/f16.webp?height=400&width=400",
    description: "Luxurious perfume from Gucci",
    rating: 4.7,
    stock: 30
  },
  {
    id: 17,
    name: "Ergonomic Office Chair",
    price: 199,
    category: "Furniture",
    image: "/f17.webp?height=400&width=400",
    description: "Comfortable chair designed for extended work hours",
    rating: 4.6,
    stock: 12
  },
  {
    id: 18,
    name: "Gaming Keyboard",
    price: 149,
    category: "Electronics",
    image: "/f18.jpeg?height=400&width=400",
    description: "Mechanical keyboard with customizable RGB lighting",
    rating: 4.5,
    stock: 22
  },
  {
    id: 19,
    name: "Portable BBQ Grill",
    price: 249,
    category: "Home",
    image: "/f19.jpeg?height=400&width=400",
    description: "Compact BBQ grill for outdoor cooking",
    rating: 4.8,
    stock: 18
  },
  {
    id: 20,
    name: "Luxury Silk Scarf",
    price: 79,
    category: "Fashion",
    image: "/f20.jpg?height=400&width=400",
    description: "Elegant silk scarf with vibrant colors",
    rating: 4.6,
    stock: 35
  },
  {
    id: 21,
    name: "Noise Cancelling Headphones",
    price: 349,
    category: "Electronics",
    image: "/f21.jpeg?height=400&width=400",
    description: "High-quality headphones with superior noise isolation",
    rating: 4.9,
    stock: 25
  },
  {
    id: 22,
    name: "Yoga Mat Pro",
    price: 49,
    category: "Fitness",
    image: "/f22.jpeg?height=400&width=400",
    description: "Non-slip yoga mat with extra cushioning",
    rating: 4.7,
    stock: 40
  },
  {
    id: 23,
    name: "Leather Wallet",
    price: 59,
    category: "Accessories",
    image: "/f23.jpg?height=400&width=400",
    description: "Classic leather wallet with multiple compartments",
    rating: 4.4,
    stock: 50
  },
  {
    id: 24,
    name: "Stainless Steel Water Bottle",
    price: 25,
    category: "Home",
    image: "/f24.jpeg?height=400&width=400",
    description: "Durable and reusable water bottle",
    rating: 4.8,
    stock: 60
  },
  {
    id: 25,
    name: "4K Ultra HD Monitor",
    price: 499,
    category: "Electronics",
    image: "/f25.jpeg?height=400&width=400",
    description: "Stunning 4K display for professionals and gamers",
    rating: 4.7,
    stock: 15
  },
  {
    id: 26,
    name: "Handcrafted Wooden Bowl",
    price: 35,
    category: "Home",
    image: "/f26.jpeg?height=400&width=400",
    description: "Rustic wooden bowl for serving or decoration",
    rating: 4.5,
    stock: 30
  },
  {
    id: 27,
    name: "Fitness Tracker",
    price: 89,
    category: "Electronics",
    image: "/f27.jpeg?height=400&width=400",
    description: "Monitor your health and fitness activities",
    rating: 4.6,
    stock: 28
  },
  {
    id: 28,
    name: "Bamboo Laptop Stand",
    price: 49,
    category: "Furniture",
    image: "/f28.jpeg?height=400&width=400",
    description: "Eco-friendly stand for ergonomic laptop use",
    rating: 4.4,
    stock: 25
  },
  {
    id: 29,
    name: "Men's Leather Belt",
    price: 45,
    category: "Fashion",
    image: "/f29.jpeg?height=400&width=400",
    description: "Durable belt with a classic buckle",
    rating: 4.3,
    stock: 50
  },
  {
    id: 30,
    name: "Wireless Phone Charger",
    price: 59,
    category: "Electronics",
    image: "/f30.jpeg?height=400&width=400",
    description: "Fast wireless charging pad for smartphones",
    rating: 4.7,
    stock: 40
  },
]

export async function GET() {
  return NextResponse.json(products)
}

