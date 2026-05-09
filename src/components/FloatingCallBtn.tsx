import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

export default function FloatingCallBtn() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setIsVisible(true), 1500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-40"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <div className="bg-white rounded-xl px-4 py-2.5 shadow-2xl">
                  <p className="text-sm font-semibold text-gray-900">Call to Order</p>
                  <p className="text-xs text-flame font-medium">{RESTAURANT_INFO.phone}</p>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
          <span className="absolute inset-[-3px] rounded-full bg-green-500/20 animate-pulse" />

          {/* Button */}
          <motion.a
            href={RESTAURANT_INFO.phoneLink}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 transition-shadow hover:shadow-green-500/50"
            title="Call to Order"
          >
            <Phone className="w-6 h-6" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
