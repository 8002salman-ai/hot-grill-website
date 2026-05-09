import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Ahmed K.',
    rating: 5,
    text: "Absolutely the best halal restaurant in Houston! The lamb chops are cooked to perfection. My family comes here every weekend.",
    avatar: '👨‍💼',
    date: '2 weeks ago',
  },
  {
    name: 'Sarah M.',
    rating: 5,
    text: "The mixed grill platter is massive and delicious. Love that everything is 100% halal certified. Will definitely be back!",
    avatar: '👩‍💻',
    date: '1 month ago',
  },
  {
    name: 'Omar R.',
    rating: 5,
    text: "Best burgers I've had in years. The meat quality is outstanding and you can really taste the difference with fresh halal ingredients.",
    avatar: '👨‍🍳',
    date: '3 weeks ago',
  },
  {
    name: 'Fatima A.',
    rating: 4,
    text: "Great food and amazing ambiance. The desserts are to die for! Only wish they had more parking. Otherwise, a perfect dining experience.",
    avatar: '👩‍🎨',
    date: '1 week ago',
  },
  {
    name: 'Hassan T.',
    rating: 5,
    text: "Been coming here for 5 years and the quality never drops. The seekh kebabs and chicken tikka are absolutely phenomenal.",
    avatar: '🧑‍💼',
    date: '2 months ago',
  },
  {
    name: 'Aisha B.',
    rating: 5,
    text: "The staff is incredibly friendly and the food comes out fast. My kids love the chicken tenders and I love the shawarma wraps!",
    avatar: '👩‍🏫',
    date: '3 days ago',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const perPage = 3;
  const maxIndex = Math.max(0, reviews.length - perPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p >= maxIndex ? 0 : p + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section id="reviews" className="py-24 bg-dark relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            What Our <span className="text-gold-gradient">Guests Say</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${current * (100 / perPage + 2)}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="bg-dark-card border border-dark-border rounded-2xl p-6 h-full hover:border-gold/30 transition-colors relative">
                    <Quote className="w-8 h-8 text-gold/20 absolute top-4 right-4" />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{review.avatar}</span>
                      <div>
                        <div className="font-semibold text-white">{review.name}</div>
                        <div className="text-xs text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className={`w-4 h-4 ${si < review.rating ? 'text-gold fill-gold' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((p) => Math.max(0, p - 1))}
              className="p-2 rounded-full border border-dark-border text-gray-400 hover:text-gold hover:border-gold/50 transition-colors disabled:opacity-30"
              disabled={current === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-gold' : 'bg-dark-border'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((p) => Math.min(maxIndex, p + 1))}
              className="p-2 rounded-full border border-dark-border text-gray-400 hover:text-gold hover:border-gold/50 transition-colors disabled:opacity-30"
              disabled={current === maxIndex}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
