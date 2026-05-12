import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Star, Clock, MapPin, ChevronDown } from 'lucide-react';
import { RESTAURANT_INFO, isOpenNow } from '../config/restaurant';

export default function Hero() {
  const [openStatus, setOpenStatus] = useState(isOpenNow());

  useEffect(() => {
    const timer = setInterval(() => setOpenStatus(isOpenNow()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Hot Grill Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/50 via-transparent to-dark/50" />
      </div>

      {/* Decorative Flame Glow */}
      <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-flame-red/8 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-flame-orange/8 rounded-full blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-flame/40 bg-flame/10"
            >
              <span className="w-2 h-2 rounded-full bg-flame animate-pulse" />
              <span className="text-flame text-xs sm:text-sm font-medium">100% Certified Halal</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border ${
                openStatus.isOpen 
                  ? 'border-green-500/40 bg-green-500/10 text-green-400' 
                  : 'border-red-500/40 bg-red-500/10 text-red-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs sm:text-sm font-medium">{openStatus.status}</span>
              <span className="text-xs text-gray-400 hidden sm:inline">· {openStatus.nextChange}</span>
            </motion.div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-4 sm:mb-5">
            <span className="text-white">Experience</span>
            <br />
            <span className="text-flame-gradient">Premium Halal</span>
            <br />
            <span className="text-white">Grilling</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-lg mx-auto text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4">
            Authentic flame-grilled cuisine with the finest halal ingredients. 
            Taste the tradition, feel the fire.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 sm:mb-10">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#menu"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full flame-gradient text-white font-bold text-base shadow-lg flame-glow-sm transition-all"
            >
              Explore Menu
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={RESTAURANT_INFO.phoneLink}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold text-base hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />
              {RESTAURANT_INFO.phone}
            </motion.a>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-400"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="w-4 h-4 text-flame fill-flame" />
              <span><strong className="text-white">4.8</strong> · 1,200+ Reviews</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-4 h-4 text-flame" />
              <span><strong className="text-white">10:30AM</strong> Daily</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-4 h-4 text-flame" />
              <span><strong className="text-white">Houston</strong>, TX</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-flame/50" />
        </motion.div>
      </div>
    </section>
  );
}
