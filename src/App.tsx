import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MenuItem } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/Menu';
import SpecialOffers from './components/SpecialOffers';
import GoogleReviews from './components/GoogleReviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCallBtn from './components/FloatingCallBtn';
import SearchModal from './components/SearchModal';
import ManagePasswordModal from './components/ManagePasswordModal';
import MenuManager from './components/MenuManager';

const INITIAL_ITEMS: MenuItem[] = [
  // ─── BURGERS ───
  { id: 1, name: 'Classic Smash Burger', category: 'Burgers', price: 12.99, description: 'Double smashed patties with American cheese, pickles, onions, and our special sauce on a toasted brioche bun.', image: '/images/food-burger.jpg', images: ['/images/food-burger.jpg'], rating: 4.9, time: '12-15 min', popular: true, spice: 'none' },
  { id: 2, name: 'Spicy Jalapeño Burger', category: 'Burgers', price: 14.99, description: 'Juicy beef patty topped with pepper jack cheese, fresh jalapeños, chipotle mayo, and crispy onion rings.', image: '/images/food-burger.jpg', images: ['/images/food-burger.jpg'], rating: 4.7, time: '15-18 min', popular: true, spice: 'hot' },
  { id: 3, name: 'Mushroom Swiss Burger', category: 'Burgers', price: 13.99, description: 'Seasoned beef patty with sautéed mushrooms, melted Swiss cheese, and truffle aioli.', image: '/images/food-burger.jpg', images: ['/images/food-burger.jpg'], rating: 4.6, time: '15-18 min', popular: false, spice: 'none' },
  { id: 4, name: 'BBQ Bacon Burger', category: 'Burgers', price: 15.99, description: 'Chargrilled patty with crispy beef bacon, cheddar cheese, onion rings, and smoky BBQ sauce.', image: '/images/food-burger.jpg', images: ['/images/food-burger.jpg'], rating: 4.8, time: '15-20 min', popular: true, spice: 'mild' },

  // ─── GRILLS ───
  { id: 5, name: 'Mixed Grill Platter', category: 'Grills', price: 29.99, description: 'A grand platter of lamb chops, chicken tikka, seekh kebab, and grilled shrimp, served with naan and chutneys.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.9, time: '25-30 min', popular: true, spice: 'medium' },
  { id: 6, name: 'Lamb Chops', category: 'Grills', price: 24.99, description: 'Tender, marinated lamb chops grilled to perfection, served with mint yogurt sauce and grilled vegetables.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.8, time: '20-25 min', popular: true, spice: 'medium' },
  { id: 7, name: 'Chicken Tikka', category: 'Grills', price: 16.99, description: 'Boneless chicken marinated in yogurt and spices, cooked in a tandoor. Juicy, smoky, and flavorful.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.7, time: '18-22 min', popular: false, spice: 'medium' },
  { id: 8, name: 'Seekh Kebab', category: 'Grills', price: 14.99, description: 'Hand-minced beef kebabs seasoned with aromatic spices and grilled on skewers over charcoal.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.6, time: '15-20 min', popular: false, spice: 'hot' },
  { id: 9, name: 'Grilled Whole Fish', category: 'Grills', price: 22.99, description: 'Whole tilapia marinated in lemon herb seasoning, grilled until crispy outside and tender inside.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.5, time: '25-30 min', popular: false, spice: 'mild' },

  // ─── WRAPS ───
  { id: 10, name: 'Chicken Shawarma Wrap', category: 'Wraps', price: 11.99, description: 'Tender shaved chicken wrapped in lavash with garlic sauce, pickled turnips, fries, and fresh veggies.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.8, time: '10-12 min', popular: true, spice: 'mild' },
  { id: 11, name: 'Beef Shawarma Wrap', category: 'Wraps', price: 12.99, description: 'Juicy seasoned beef shawarma with tahini sauce, pickles, tomatoes, and crispy fries in a warm wrap.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.7, time: '10-12 min', popular: true, spice: 'mild' },
  { id: 12, name: 'Falafel Wrap', category: 'Wraps', price: 9.99, description: 'Crispy homemade falafel with hummus, tahini, fresh salad, and pickled vegetables in a soft lavash.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.5, time: '8-10 min', popular: false, spice: 'none' },
  { id: 13, name: 'Spicy Kafta Wrap', category: 'Wraps', price: 11.99, description: 'Grilled spiced beef kafta with harissa mayo, arugula, tomatoes, and pickled onions.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.6, time: '10-15 min', popular: false, spice: 'hot' },

  // ─── CHICKEN ───
  { id: 14, name: 'Butter Chicken', category: 'Chicken', price: 17.99, description: 'Tender chicken pieces in a rich, creamy tomato butter sauce. A timeless classic served with basmati rice.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.9, time: '20-25 min', popular: true, spice: 'mild' },
  { id: 15, name: 'Chicken Biryani', category: 'Chicken', price: 16.99, description: 'Fragrant basmati rice layered with tender spiced chicken, saffron, and caramelized onions. Dum-cooked to perfection.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.8, time: '25-30 min', popular: true, spice: 'medium' },
  { id: 16, name: 'Chicken Wings (12pc)', category: 'Chicken', price: 14.99, description: 'Crispy fried chicken wings tossed in your choice of buffalo, honey garlic, or BBQ sauce.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.7, time: '15-18 min', popular: true, spice: 'medium' },
  { id: 17, name: 'Chicken Tenders', category: 'Chicken', price: 10.99, description: 'Golden crispy chicken tenders served with fries and a choice of dipping sauce.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.5, time: '12-15 min', popular: false, spice: 'none' },

  // ─── STEAKS ───
  { id: 18, name: 'Ribeye Steak', category: 'Steaks', price: 34.99, description: 'Premium 12oz halal ribeye, seasoned and grilled to your preference. Served with mashed potatoes and asparagus.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.9, time: '25-30 min', popular: true, spice: 'none' },
  { id: 19, name: 'NY Strip Steak', category: 'Steaks', price: 32.99, description: 'Hand-cut 10oz NY strip steak, chargrilled and served with garlic butter, roasted potatoes, and seasonal veggies.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.8, time: '25-30 min', popular: false, spice: 'none' },
  { id: 20, name: 'Filet Mignon', category: 'Steaks', price: 39.99, description: 'The most tender cut — 8oz filet mignon, perfectly seared, served with truffle mash and red wine reduction.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 5.0, time: '25-35 min', popular: true, spice: 'none' },
  { id: 21, name: 'Steak & Eggs', category: 'Steaks', price: 19.99, description: 'Grilled sirloin steak with two sunny-side eggs, hash browns, and toasted sourdough.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.6, time: '18-22 min', popular: false, spice: 'none' },

  // ─── SEAFOOD ───
  { id: 22, name: 'Grilled Salmon', category: 'Seafood', price: 24.99, description: 'Atlantic salmon fillet, herb-crusted and grilled, served with lemon dill sauce and roasted vegetables.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.7, time: '20-25 min', popular: false, spice: 'none' },
  { id: 23, name: 'Shrimp Platter', category: 'Seafood', price: 21.99, description: 'Jumbo shrimp grilled with garlic butter and lemon, served with rice pilaf and coleslaw.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.6, time: '18-22 min', popular: false, spice: 'mild' },
  { id: 24, name: 'Fish & Chips', category: 'Seafood', price: 15.99, description: 'Beer-battered cod fillets with golden fries, coleslaw, and tartar sauce. Classic comfort food.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.5, time: '15-18 min', popular: false, spice: 'none' },
  { id: 25, name: 'Cajun Shrimp Pasta', category: 'Seafood', price: 18.99, description: 'Penne pasta in a creamy Cajun sauce with sautéed shrimp, bell peppers, and onions.', image: '/images/food-grill-platter.jpg', images: ['/images/food-grill-platter.jpg'], rating: 4.7, time: '18-22 min', popular: true, spice: 'hot' },

  // ─── APPETIZERS ───
  { id: 26, name: 'Hummus & Pita', category: 'Appetizers', price: 7.99, description: 'Creamy homemade hummus topped with olive oil and paprika, served with warm pita bread.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.6, time: '5-8 min', popular: false, spice: 'none' },
  { id: 27, name: 'Loaded Nachos', category: 'Appetizers', price: 11.99, description: 'Crispy tortilla chips loaded with cheese, jalapeños, sour cream, guacamole, and seasoned beef.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.7, time: '10-12 min', popular: true, spice: 'medium' },
  { id: 28, name: 'Samosa Platter (6pc)', category: 'Appetizers', price: 8.99, description: 'Crispy pastry filled with spiced potatoes and peas, served with mint and tamarind chutneys.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.5, time: '8-10 min', popular: false, spice: 'mild' },
  { id: 29, name: 'Mozzarella Sticks', category: 'Appetizers', price: 8.99, description: 'Golden fried mozzarella sticks served with marinara sauce. Crispy outside, gooey inside.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.4, time: '8-10 min', popular: false, spice: 'none' },

  // ─── SIDES ───
  { id: 30, name: 'Garlic Naan', category: 'Sides', price: 3.99, description: 'Freshly baked naan bread brushed with garlic butter and cilantro.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.7, time: '5-8 min', popular: false, spice: 'none' },
  { id: 31, name: 'French Fries', category: 'Sides', price: 4.99, description: 'Crispy golden fries seasoned with our special blend of spices. Add cheese for $1 more.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.5, time: '8-10 min', popular: false, spice: 'none' },
  { id: 32, name: 'Onion Rings', category: 'Sides', price: 5.99, description: 'Thick-cut onion rings in a crispy beer batter, served with chipotle ranch dip.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.4, time: '8-10 min', popular: false, spice: 'none' },
  { id: 33, name: 'Rice Pilaf', category: 'Sides', price: 4.99, description: 'Fluffy basmati rice cooked with aromatic spices, topped with fried onions and nuts.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.3, time: '5-8 min', popular: false, spice: 'none' },

  // ─── SALADS ───
  { id: 34, name: 'Fattoush Salad', category: 'Salads', price: 9.99, description: 'Fresh mixed greens with crispy pita chips, radish, tomatoes, cucumbers, and tangy sumac dressing.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.5, time: '5-8 min', popular: false, spice: 'none' },
  { id: 35, name: 'Grilled Chicken Caesar', category: 'Salads', price: 13.99, description: 'Crisp romaine lettuce with grilled chicken breast, parmesan, croutons, and creamy Caesar dressing.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.6, time: '10-12 min', popular: false, spice: 'none' },
  { id: 36, name: 'Mediterranean Bowl', category: 'Salads', price: 12.99, description: 'Quinoa bowl with grilled halloumi, cherry tomatoes, cucumbers, olives, and lemon herb dressing.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.7, time: '10-12 min', popular: false, spice: 'none' },
  { id: 37, name: 'Tabbouleh', category: 'Salads', price: 7.99, description: 'Classic parsley-based salad with bulgur wheat, tomatoes, onion, lemon juice, and olive oil.', image: '/images/food-wrap.jpg', images: ['/images/food-wrap.jpg'], rating: 4.4, time: '5-8 min', popular: false, spice: 'none' },

  // ─── DESSERTS ───
  { id: 38, name: 'Baklava', category: 'Desserts', price: 7.99, description: 'Flaky phyllo pastry layered with crushed pistachios and walnuts, soaked in sweet honey syrup.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.8, time: '5 min', popular: true, spice: 'none' },
  { id: 39, name: 'Kunafa', category: 'Desserts', price: 9.99, description: 'Golden crispy vermicelli filled with stretchy cheese, soaked in rose water sugar syrup. Served warm.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.9, time: '10 min', popular: true, spice: 'none' },
  { id: 40, name: 'Chocolate Lava Cake', category: 'Desserts', price: 8.99, description: 'Warm chocolate cake with a molten center, served with vanilla ice cream and chocolate drizzle.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.7, time: '12-15 min', popular: false, spice: 'none' },
  { id: 41, name: 'Mango Kulfi', category: 'Desserts', price: 5.99, description: 'Traditional Indian frozen dessert made with mango, cream, and cardamom. Rich and refreshing.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.5, time: '5 min', popular: false, spice: 'none' },

  // ─── BEVERAGES ───
  { id: 42, name: 'Fresh Mango Lassi', category: 'Beverages', price: 4.99, description: 'Creamy yogurt drink blended with fresh mango pulp and a hint of cardamom. Perfectly refreshing.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.8, time: '3 min', popular: true, spice: 'none' },
  { id: 43, name: 'Mint Lemonade', category: 'Beverages', price: 3.99, description: 'Fresh-squeezed lemon juice blended with mint leaves and sweetened to perfection. Served ice cold.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.6, time: '3 min', popular: false, spice: 'none' },
  { id: 44, name: 'Turkish Tea', category: 'Beverages', price: 2.99, description: 'Strong black tea brewed the traditional Turkish way. Served in a classic tulip glass.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.5, time: '5 min', popular: false, spice: 'none' },
  { id: 45, name: 'Rose Milk', category: 'Beverages', price: 4.49, description: 'Chilled milk infused with rose syrup and topped with crushed pistachios. Sweet and aromatic.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.4, time: '3 min', popular: false, spice: 'none' },
  { id: 46, name: 'Fresh Orange Juice', category: 'Beverages', price: 4.99, description: 'Freshly squeezed orange juice with no added sugar. Pure and natural refreshment.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.3, time: '3 min', popular: false, spice: 'none' },
  { id: 47, name: 'Chai Latte', category: 'Beverages', price: 4.99, description: 'Spiced masala chai with steamed milk. A warm hug in a cup with cinnamon, cardamom, and ginger.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.6, time: '5 min', popular: false, spice: 'none' },
  { id: 48, name: 'Strawberry Smoothie', category: 'Beverages', price: 5.99, description: 'Fresh strawberries blended with yogurt, honey, and ice. A fruity, creamy delight.', image: '/images/food-dessert.jpg', images: ['/images/food-dessert.jpg'], rating: 4.5, time: '3 min', popular: false, spice: 'none' },
];

const STORAGE_KEY = 'hotgrill_menu_items';

function loadItems(): MenuItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return INITIAL_ITEMS;
}

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(loadItems);
  const [searchOpen, setSearchOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
  }, [menuItems]);

  return (
    <div className="min-h-screen bg-dark text-white">
      <AnimatePresence mode="wait">
        {managerOpen ? (
          <MenuManager
            key="manager"
            items={menuItems}
            onUpdate={setMenuItems}
            onClose={() => setManagerOpen(false)}
          />
        ) : (
          <div key="main">
            <Navbar onSearchOpen={() => setSearchOpen(true)} />
            <Hero />
            <About />
            <MenuSection items={menuItems} />
            <SpecialOffers />
            <GoogleReviews />
            <Contact />
            <Footer onAdminAccess={() => setPasswordModalOpen(true)} />
            <FloatingCallBtn />
          </div>
        )}
      </AnimatePresence>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={menuItems}
      />

      <ManagePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={() => setManagerOpen(true)}
      />
    </div>
  );
}
