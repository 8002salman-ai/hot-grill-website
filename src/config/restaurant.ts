// Centralized Restaurant Configuration
// All components should import from here to maintain consistency

export const RESTAURANT_INFO = {
  name: 'Hot Grill',
  tagline: 'Certified Halal',
  phone: '(281) 741-8040',
  phoneLink: 'tel:+12817418040',
  email: 'info@hotgrill.com',
  address: {
    street: '12579 Richmond Ave',
    city: 'Houston',
    state: 'TX',
    zip: '77082',
    full: '12579 Richmond Ave, Houston TX 77082',
    short: '12579 Richmond Ave, Houston',
  },
  googleMapsUrl: 'https://maps.app.goo.gl/KawrKh5n2RBJhwNE9',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.5!2d-95.59!3d29.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQzJzQ4LjAiTiA5NcKwMzUnMjQuMCJX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
  hours: {
    weekday: { open: '10:30 AM', close: '9:30 PM', openHour: 10.5, closeHour: 21.5 }, // Sun-Thu
    weekend: { open: '10:30 AM', close: '10:30 PM', openHour: 10.5, closeHour: 22.5 }, // Fri-Sat
    display: [
      { days: 'Sun - Thu', time: '10:30 AM – 9:30 PM' },
      { days: 'Fri - Sat', time: '10:30 AM – 10:30 PM' },
    ],
  },
  social: {
    instagram: '#',
    facebook: '#',
    twitter: '#',
  },
  established: 2009,
};

// Get current Houston time
export function getHoustonTime(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
}

// Check if restaurant is currently open
export function isOpenNow(): { isOpen: boolean; status: string; nextChange: string } {
  const now = getHoustonTime();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours() + now.getMinutes() / 60;
  
  const isWeekend = day === 5 || day === 6; // Friday or Saturday
  const schedule = isWeekend ? RESTAURANT_INFO.hours.weekend : RESTAURANT_INFO.hours.weekday;
  
  const isOpen = hour >= schedule.openHour && hour < schedule.closeHour;
  
  if (isOpen) {
    const closeTime = schedule.close;
    const hoursUntilClose = schedule.closeHour - hour;
    if (hoursUntilClose <= 1) {
      return { isOpen: true, status: 'Open Now', nextChange: `Closes soon at ${closeTime}` };
    }
    return { isOpen: true, status: 'Open Now', nextChange: `Closes at ${closeTime}` };
  } else {
    if (hour < schedule.openHour) {
      return { isOpen: false, status: 'Closed', nextChange: `Opens at ${schedule.open}` };
    }
    // After closing, show next day's opening
    const nextDay = (day + 1) % 7;
    const nextIsWeekend = nextDay === 5 || nextDay === 6;
    const nextSchedule = nextIsWeekend ? RESTAURANT_INFO.hours.weekend : RESTAURANT_INFO.hours.weekday;
    return { isOpen: false, status: 'Closed', nextChange: `Opens tomorrow ${nextSchedule.open}` };
  }
}

// Format phone for display
export function formatPhone(phone: string): string {
  return phone;
}

export default RESTAURANT_INFO;
