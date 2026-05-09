import { Flame, MapPin, Phone, Mail, Globe, MessageCircle, Camera, Settings } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

interface FooterProps {
  onAdminAccess: () => void;
}

export default function Footer({ onAdminAccess }: FooterProps) {
  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <Flame className="w-7 h-7 text-flame" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-white leading-tight">
                  Hot <span className="text-flame">Grill</span>
                </span>
                <span className="text-[8px] tracking-[0.2em] text-flame/70 font-medium uppercase -mt-0.5">
                  {RESTAURANT_INFO.tagline}
                </span>
              </div>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Houston's premier halal restaurant since {RESTAURANT_INFO.established}. 100% Halal Certified.
            </p>
            <div className="flex gap-2">
              {[Camera, Globe, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-dark-card border border-dark-border text-gray-500 hover:text-flame hover:border-flame/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-500 text-sm hover:text-flame transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Hours</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {RESTAURANT_INFO.hours.display.map((item, i) => (
                <li key={i} className="flex justify-between gap-2">
                  <span>{item.days}</span>
                  <span className="text-gray-300">{item.time.split(' – ')[0]} - {item.time.split(' – ')[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-flame flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address.full}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-flame flex-shrink-0" />
                <a href={RESTAURANT_INFO.phoneLink} className="text-gray-500 hover:text-flame transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-flame flex-shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-gray-500 hover:text-flame transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-flame transition-colors">Privacy</a>
            <a href="#" className="text-xs text-gray-600 hover:text-flame transition-colors">Terms</a>
            {/* Menu Management Button */}
            <button
              onClick={onAdminAccess}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dark-border text-xs text-gray-500 hover:text-flame hover:border-flame/30 transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Menu Management</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
