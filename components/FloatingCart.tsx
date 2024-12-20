import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { CartItem } from '@/types/CartItem';

interface FloatingCartProps {
  items: CartItem[];
}

const FloatingCart: React.FC<FloatingCartProps> = ({ items }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-gold text-white p-3 rounded-full shadow-lg cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ShoppingBag className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      )}
    </motion.div>
  );
};

export default FloatingCart;

