import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Tag, Clock, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

const offers = [
  {
    title: 'Family Feast Deal',
    description: 'Mixed Grill Platter, 4 sides, naan basket, and 4 drinks.',
    discount: '25% OFF',
    price: '$49.99',
    originalPrice: '$66.99',
    validity: 'Mon - Thu',
  },
  {
    title: 'Lunch Special',
    description: 'Any burger or wrap with fries and a drink.',
    discount: '20% OFF',
    price: '$11.99',
    originalPrice: '$14.99',
    validity: '10:30AM - 3PM',
  },
  {
    title: 'Weekend BBQ',
    description: 'All-you-can-eat grill buffet with premium cuts.',
    discount: 'BUFFET',
    price: '$34.99',
    originalPrice: '$44.99',
    validity: 'Fri - Sat 6PM+',
  },
];

export default function SpecialOffers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="offers" className="py-16 sm:py-20 bg-dark-surface relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-flame/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-flame text-sm font-semibold tracking-widest uppercase">Special Offers</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Today's <span className="text-flame-gradient">Best Deals</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
            Don't miss our limited-time offers on your favorite halal dishes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="relative bg-dark-card border border-dark-border rounded-2xl p-5 sm:p-6 hover:border-flame/20 transition-all group"
            >
              {/* Discount Badge */}
              <div className="absolute -top-2.5 -right-2.5 px-3 py-1 rounded-full flame-gradient text-white font-bold text-xs shadow-lg">
                {offer.discount}
              </div>

              <Tag className="w-8 h-8 text-flame mb-3" />
              <h3 className="font-display text-xl font-bold text-white mb-2">{offer.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{offer.description}</p>

              <div className="flex items-end gap-2 mb-3">
                <span className="text-2xl font-bold text-flame">{offer.price}</span>
                <span className="text-sm text-gray-600 line-through">{offer.originalPrice}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Clock className="w-3.5 h-3.5 text-flame" />
                <span>{offer.validity}</span>
              </div>

              <a
                href={RESTAURANT_INFO.phoneLink}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border border-flame/30 text-flame font-medium text-sm hover:bg-flame hover:text-white transition-all"
              >
                <Phone className="w-4 h-4" />
                Order Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
