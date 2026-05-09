import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Flame, Users, Leaf } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

const stats = [
  { icon: Flame, label: 'Years of Excellence', value: `${new Date().getFullYear() - RESTAURANT_INFO.established}+` },
  { icon: Users, label: 'Happy Customers', value: '50K+' },
  { icon: Award, label: 'Awards Won', value: '12' },
  { icon: Leaf, label: 'Fresh Ingredients', value: '100%' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-16 sm:py-20 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-flame/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <img
                src="/images/about-chef.jpg"
                alt="Our Chef"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-dark-card border border-dark-border rounded-xl p-4 sm:p-5 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-display font-black text-flame">
                  {new Date().getFullYear() - RESTAURANT_INFO.established}+
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Years of<br/>Excellence</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-flame text-sm font-semibold tracking-widest uppercase">Our Story</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
              Where Tradition Meets <span className="text-flame-gradient">Flavor</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
              Founded in {RESTAURANT_INFO.established}, {RESTAURANT_INFO.name} has become Houston's premier destination for authentic halal cuisine. 
              Our master chefs bring decades of experience, combining traditional recipes with modern culinary techniques.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6 text-sm sm:text-base">
              Every ingredient is carefully sourced, every spice meticulously blended, and every dish crafted 
              with love. We believe that halal food isn't just about certification—it's about purity and quality.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-card border border-dark-border hover:border-flame/20 transition-colors"
                >
                  <div className="p-2 rounded-lg flame-gradient">
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
