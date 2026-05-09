import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, ExternalLink, Navigation, CheckCircle } from 'lucide-react';
import { RESTAURANT_INFO, isOpenNow } from '../config/restaurant';

export default function LocationMap() {
  const [openStatus, setOpenStatus] = useState(isOpenNow());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setOpenStatus(isOpenNow());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={ref} className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden h-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="h-full flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-dark-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-1">{RESTAURANT_INFO.name}</h3>
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                100% Halal Certified
              </p>
            </div>
            <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
              openStatus.isOpen 
                ? 'bg-green-500/15 border border-green-500/30 text-green-400' 
                : 'bg-red-500/15 border border-red-500/30 text-red-400'
            }`}>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${openStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                {openStatus.status}
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-flame flex-shrink-0" />
              <span className="text-gray-400">{RESTAURANT_INFO.address.full}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-flame flex-shrink-0" />
              <a href={RESTAURANT_INFO.phoneLink} className="text-flame hover:text-flame-orange transition-colors">
                {RESTAURANT_INFO.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-flame flex-shrink-0" />
              <span className="text-gray-400">{openStatus.nextChange}</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative flex-1 min-h-[180px] bg-dark-surface">
          <iframe
            title="Hot Grill Location"
            src={RESTAURANT_INFO.googleMapsEmbed}
            className="w-full h-full border-0 grayscale-[40%] hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-gray-900 font-medium text-xs shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            Directions
          </a>
        </div>

        {/* Hours */}
        <div className="p-5 border-t border-dark-border">
          <h4 className="font-medium text-white text-sm mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-flame" />
            Hours
          </h4>
          <div className="space-y-1.5">
            {RESTAURANT_INFO.hours.display.map((h, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-gray-500">{h.days}</span>
                <span className="text-gray-300">{h.time}</span>
              </div>
            ))}
          </div>

          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2.5 rounded-lg border border-flame/30 text-flame font-medium text-sm hover:bg-flame/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View on Google Maps
          </a>
        </div>
      </motion.div>
    </div>
  );
}
