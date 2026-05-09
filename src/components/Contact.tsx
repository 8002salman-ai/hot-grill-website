import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Phone, Mail, CheckCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';
import LocationMap from './LocationMap';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-dark-surface relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-flame/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="text-flame text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Contact <span className="text-flame-gradient">Us</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
            Questions, reservations, or catering inquiries? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-dark-card border border-dark-border rounded-2xl p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-white mb-5">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm placeholder-gray-600 focus:border-flame/50 outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm placeholder-gray-600 focus:border-flame/50 outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm placeholder-gray-600 focus:border-flame/50 outline-none transition-colors"
                    placeholder="(281) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm placeholder-gray-600 focus:border-flame/50 outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg flame-gradient text-white font-semibold text-sm hover:scale-[1.02] transition-transform disabled:opacity-70"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>

              {/* Quick Contact */}
              <div className="mt-5 pt-5 border-t border-dark-border grid grid-cols-2 gap-3">
                <a
                  href={RESTAURANT_INFO.phoneLink}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-dark border border-dark-border hover:border-flame/30 transition-colors"
                >
                  <div className="p-2 rounded-lg flame-gradient">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Call</div>
                    <div className="text-white text-sm font-medium">{RESTAURANT_INFO.phone}</div>
                  </div>
                </a>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-dark border border-dark-border hover:border-flame/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-flame/20">
                    <Mail className="w-4 h-4 text-flame" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Email</div>
                    <div className="text-white text-sm font-medium">{RESTAURANT_INFO.email}</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <LocationMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
