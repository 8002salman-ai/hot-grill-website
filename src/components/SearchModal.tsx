import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, Clock } from 'lucide-react';
import { MenuItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}

export default function SearchModal({ isOpen, onClose, items }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = query.trim()
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : [];

  const handleResultClick = () => {
    onClose();
    // Scroll to menu section
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-border">
              <Search className="w-5 h-5 text-flame" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search menu items..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              />
              <button onClick={onClose} className="p-1 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-sm">No results found for "{query}"</p>
                </div>
              )}

              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={handleResultClick}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-dark-hover border-b border-dark-border/50 transition-colors text-left"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm truncate">{item.name}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <span className="text-flame">{item.category}</span>
                      <span>·</span>
                      <Star className="w-3 h-3 text-flame fill-flame" />
                      <span>{item.rating}</span>
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <div className="text-flame font-bold text-sm">${item.price.toFixed(2)}</div>
                </button>
              ))}

              {!query.trim() && (
                <div className="p-6 text-center text-gray-500">
                  <p className="text-sm mb-3">Start typing to search...</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Burgers', 'Grills', 'Wraps', 'Chicken', 'Steaks'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setQuery(cat)}
                        className="px-3 py-1 rounded-full bg-dark border border-dark-border text-xs text-gray-400 hover:text-flame hover:border-flame/30 transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-dark-border flex items-center justify-between text-xs text-gray-600">
              <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-dark-border text-gray-500">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
