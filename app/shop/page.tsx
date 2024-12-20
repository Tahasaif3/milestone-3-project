'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Star, ShoppingBag, Heart, Search, Eye, Grid, List, ChevronDown } from 'lucide-react';
import { useCart } from '@/app/contexts/CartContext';
import QuickView from '@/components/QuickView';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  stock: number;
};

const categories = ['All', 'Electronics', 'Fashion', 'Shoes', 'Watches', 'Jewelry'];

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setFeaturedProduct(data[Math.floor(Math.random() * data.length)]);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === 'priceAsc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery, sortOption, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("/luxury-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY,
        }}
      />

      <div className="relative z-10">
        {/* Featured Product */}
        {featuredProduct && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity }}
            className="bg-black bg-opacity-80 text-white py-16 px-4 sm:px-6 lg:px-8 mb-8"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-extrabold mb-4">Featured Product</h2>
                <h3 className="text-2xl font-semibold mb-2">{featuredProduct.name}</h3>
                <p className="text-gray-300 mb-4">{featuredProduct.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart({ ...featuredProduct, quantity: 1 })}
                  className="px-6 py-3 bg-gold text-black rounded-full font-semibold flex items-center transition-colors duration-300 hover:bg-white"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart - ${featuredProduct.price.toFixed(2)}
                </motion.button>
              </div>
              <div className="md:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    width={500}
                    height={500}
                    className="rounded-lg shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold mb-4 md:mb-0 text-gold"
            >
              Exclusive Collection
            </motion.h1>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-gold rounded-full focus:ring-2 focus:ring-gold focus:outline-none bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg transition-all duration-300 hover:bg-opacity-30"
                />
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-colors duration-300 ${viewMode === 'grid' ? 'bg-gold text-white' : 'bg-white text-gold hover:bg-gold hover:text-white'}`}
                >
                  <Grid className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-colors duration-300 ${viewMode === 'list' ? 'bg-gold text-white' : 'bg-white text-gold hover:bg-gold hover:text-white'}`}
                >
                  <List className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </header>

          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gold">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="md:hidden text-gold"
                  >
                    <ChevronDown className={`transform transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <AnimatePresence>
                  {(isFilterOpen || window.innerWidth >= 768) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
                        {categories.map(category => (
                          <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`block w-full text-left px-4 py-2 rounded-full mb-2 transition-colors duration-300 ${
                              activeCategory === category
                                ? 'bg-gold text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </div>
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Sort By</h3>
                        <select
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="w-full p-2 border-2 border-gold rounded-full focus:ring-2 focus:ring-gold focus:outline-none transition-all duration-300 hover:bg-gray-50"
                        >
                          <option value="default">Default</option>
                          <option value="priceAsc">Price: Low to High</option>
                          <option value="priceDesc">Price: High to Low</option>
                          <option value="rating">Rating</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </aside>

            {/* Products Grid */}
            <motion.div
              layout
              className={`flex-1 grid ${
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'
              }`}
            >
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
                      viewMode === 'list' ? 'flex' : 'flex flex-col'
                    }`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'h-64'}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 space-y-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-gold hover:text-white"
                          onClick={() => setQuickViewProduct(product)}
                        >
                          <Eye className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-gold hover:text-white"
                        >
                          <Heart className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                    <div className={`p-4 flex flex-col justify-between ${viewMode === 'list' ? 'w-2/3' : 'flex-grow'}`}>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-gold">${product.price.toFixed(2)}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart({ ...product, quantity: 1 })}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-full flex items-center transition-colors duration-300 hover:bg-indigo-700"
                        >
                          <ShoppingBag className="h-5 w-5 mr-2" />
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>

        <QuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />

      </div>
    </div>
  );
}

