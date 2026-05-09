import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Clock, Flame as FlameIcon, ChevronLeft, ChevronRight, X, Phone, ShoppingBag, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { RESTAURANT_INFO } from '../config/restaurant';

const CATEGORIES = [
  'All', 'Burgers', 'Grills', 'Wraps', 'Chicken', 'Steaks', 'Seafood',
  'Appetizers', 'Sides', 'Salads', 'Desserts', 'Beverages',
];

const spiceIndicator = (level: string) => {
  const levels: Record<string, number> = { none: 0, mild: 1, medium: 2, hot: 3, 'extra hot': 4 };
  const count = levels[level] || 0;
  if (count === 0) return null;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i <= count ? 'bg-flame' : 'bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

interface MenuProps {
  items: MenuItem[];
}

export default function MenuSection({ items }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const catScrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory);

  const scrollCats = (dir: number) => {
    catScrollRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  const openModal = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-dark-surface relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-flame text-sm font-semibold tracking-widest uppercase">Our Menu</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Explore Our <span className="text-flame-gradient">Delicious</span> Menu
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Premium halal dishes crafted with passion and the finest ingredients.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="relative mb-6 sm:mb-8">
          <button
            onClick={() => scrollCats(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-dark-surface border border-dark-border rounded-full text-gray-400 hover:text-flame hover:border-flame/30 hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div
            ref={catScrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-none px-0 sm:px-10 py-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'flame-gradient text-white shadow-lg flame-glow-sm'
                    : 'bg-dark-card border border-dark-border text-gray-400 hover:border-flame/30 hover:text-flame'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollCats(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-dark-surface border border-dark-border rounded-full text-gray-400 hover:text-flame hover:border-flame/30 hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                onClick={() => openModal(item)}
                className="group bg-dark-card rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-flame/5 transition-all duration-300 border border-dark-border hover:border-flame/20"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-70" />
                  
                  {/* Popular Badge */}
                  {item.popular && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full flame-gradient text-white text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" /> Popular
                    </div>
                  )}
                  
                  {/* Rating */}
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm flex items-center gap-1">
                    <Star className="w-3 h-3 text-flame fill-flame" />
                    <span className="text-white text-[10px] sm:text-xs font-bold">{item.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg flame-gradient text-white text-xs sm:text-sm font-bold shadow-lg">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-display text-sm sm:text-base font-semibold text-white group-hover:text-flame transition-colors line-clamp-1 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-2 min-h-[32px] sm:min-h-[40px]">{item.description}</p>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between pt-2 border-t border-dark-border/50">
                    <div className="flex items-center gap-1 text-gray-400 text-[10px] sm:text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                    {item.spice !== 'none' && (
                      <div className="flex items-center gap-1">
                        <FlameIcon className="w-3 h-3 text-flame" />
                        {spiceIndicator(item.spice)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-dark-border mx-auto mb-3" />
            <p className="text-gray-500">No items in this category.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-card border border-dark-border rounded-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Image Carousel */}
              <div className="relative aspect-video bg-dark">
                <img
                  src={selectedItem.images[selectedImageIndex] || selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-black/30" />
                
                {/* Close */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Popular */}
                {selectedItem.popular && (
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full flame-gradient text-white text-sm font-bold flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-4 h-4" /> Popular
                  </div>
                )}

                {/* Image Navigation */}
                {selectedItem.images.length > 1 && (
                  <>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedItem.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === selectedImageIndex ? 'bg-flame w-5' : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedImageIndex((p) => (p > 0 ? p - 1 : selectedItem.images.length - 1)); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedImageIndex((p) => (p < selectedItem.images.length - 1 ? p + 1 : 0)); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-flame/10 text-flame text-sm font-medium">
                    {selectedItem.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-flame fill-flame" />
                    <span className="text-white font-bold">{selectedItem.rating}</span>
                  </div>
                </div>

                {/* Name & Price */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display text-xl font-bold text-white">{selectedItem.name}</h3>
                  <div className="text-xl font-bold text-flame">${selectedItem.price.toFixed(2)}</div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{selectedItem.description}</p>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <div className="bg-dark rounded-xl p-3 text-center">
                    <Clock className="w-4 h-4 text-flame mx-auto mb-1" />
                    <span className="text-[10px] text-gray-500 block">Prep Time</span>
                    <span className="text-xs text-white font-medium">{selectedItem.time}</span>
                  </div>
                  <div className="bg-dark rounded-xl p-3 text-center">
                    <FlameIcon className="w-4 h-4 text-flame mx-auto mb-1" />
                    <span className="text-[10px] text-gray-500 block">Spice</span>
                    <span className="text-xs text-white font-medium capitalize">{selectedItem.spice}</span>
                  </div>
                  <div className="bg-dark rounded-xl p-3 text-center">
                    <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-green-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 block">Status</span>
                    <span className="text-xs text-green-400 font-medium">Available</span>
                  </div>
                </div>

                {/* Spice Level Bar */}
                {selectedItem.spice !== 'none' && (
                  <div className="flex items-center gap-3 p-3 bg-dark rounded-xl mb-5">
                    <FlameIcon className="w-4 h-4 text-flame" />
                    <div className="flex-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => {
                          const levels: Record<string, number> = { mild: 1, medium: 2, hot: 3, 'extra hot': 4 };
                          const count = levels[selectedItem.spice] || 0;
                          return (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full ${
                                i <= count ? 'bg-flame' : 'bg-gray-700'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <span className="text-xs text-white font-medium capitalize">{selectedItem.spice}</span>
                  </div>
                )}

                {/* Call Button */}
                <a
                  href={RESTAURANT_INFO.phoneLink}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold transition-all hover:from-green-400 hover:to-green-500 shadow-lg shadow-green-500/30"
                >
                  <Phone className="w-5 h-5" />
                  Call to Order · {RESTAURANT_INFO.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
