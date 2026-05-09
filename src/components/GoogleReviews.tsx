import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ExternalLink, Quote, ThumbsUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

const reviews = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    avatar: 'AH',
    rating: 5,
    date: '2 weeks ago',
    text: "Best halal restaurant in Houston! The lamb chops are cooked to perfection and the mixed grill platter is absolutely amazing. My family comes here every weekend.",
    helpful: 24,
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    avatar: 'SM',
    rating: 5,
    date: '1 month ago',
    text: "Absolutely loved the butter chicken and chicken biryani! The flavors are authentic and you can taste the quality. Will definitely be back!",
    helpful: 18,
  },
  {
    id: 3,
    name: 'Omar Rahman',
    avatar: 'OR',
    rating: 5,
    date: '3 weeks ago',
    text: "The ribeye steak here is outstanding - perfectly seasoned and cooked exactly how I asked. Great halal options that don't compromise on quality.",
    helpful: 31,
  },
  {
    id: 4,
    name: 'Fatima Al-Rashid',
    avatar: 'FA',
    rating: 4,
    date: '1 week ago',
    text: "Great food and amazing ambiance. The kunafa dessert is to die for! Service was excellent. Only minor issue was parking.",
    helpful: 12,
  },
];

const stats = {
  averageRating: 4.8,
  totalReviews: 1247,
  fiveStarPercent: 82,
  fourStarPercent: 14,
};

export default function GoogleReviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="reviews" className="py-20 bg-dark relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-white font-medium">Google Reviews</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            What Our <span className="text-flame-gradient">Guests Say</span>
          </h2>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="max-w-sm mx-auto mb-10"
        >
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-bold text-white">{stats.averageRating}</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(stats.averageRating) ? 'text-flame fill-flame' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{stats.totalReviews.toLocaleString()} reviews</span>
              </div>
            </div>
            
            {/* Rating Bars */}
            <div className="space-y-1.5 mt-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-6 text-gray-500">5★</span>
                <div className="flex-1 h-1.5 bg-dark rounded-full overflow-hidden">
                  <div className="h-full bg-flame rounded-full" style={{ width: `${stats.fiveStarPercent}%` }} />
                </div>
                <span className="w-8 text-gray-600 text-right">{stats.fiveStarPercent}%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-6 text-gray-500">4★</span>
                <div className="flex-1 h-1.5 bg-dark rounded-full overflow-hidden">
                  <div className="h-full bg-flame/70 rounded-full" style={{ width: `${stats.fourStarPercent}%` }} />
                </div>
                <span className="w-8 text-gray-600 text-right">{stats.fourStarPercent}%</span>
              </div>
            </div>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full border border-flame/30 text-flame font-medium text-sm hover:bg-flame/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View All on Google
            </a>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-dark-card border border-dark-border rounded-xl p-4 hover:border-flame/20 transition-colors relative group"
            >
              <Quote className="absolute top-3 right-3 w-6 h-6 text-flame/10 group-hover:text-flame/20 transition-colors" />
              
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full flame-gradient flex items-center justify-center text-white font-bold text-xs">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{review.name}</div>
                  <div className="text-[10px] text-gray-600">{review.date}</div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= review.rating ? 'text-flame fill-flame' : 'text-gray-700'}`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-4 mb-3">
                {review.text}
              </p>

              {/* Footer */}
              <div className="text-[10px] text-gray-600 flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                Helpful ({review.helpful})
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
