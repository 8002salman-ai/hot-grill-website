import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, ImagePlus, ArrowLeft, Star, Clock, Search, Flame } from 'lucide-react';
import { MenuItem } from '../types';

const CATEGORIES = [
  'Burgers', 'Grills', 'Wraps', 'Chicken', 'Steaks', 'Seafood',
  'Appetizers', 'Sides', 'Salads', 'Desserts', 'Beverages',
];

const SPICE_LEVELS = ['none', 'mild', 'medium', 'hot', 'extra hot'];

interface MenuManagerProps {
  items: MenuItem[];
  onUpdate: (items: MenuItem[]) => void;
  onClose: () => void;
}

const emptyItem: Omit<MenuItem, 'id'> = {
  name: '',
  category: 'Burgers',
  price: 0,
  description: '',
  image: '/images/food-burger.jpg',
  images: ['/images/food-burger.jpg'],
  rating: 4.5,
  time: '15-20 min',
  popular: false,
  spice: 'none',
};

export default function MenuManager({ items, onUpdate, onClose }: MenuManagerProps) {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const handleAdd = () => {
    const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
    setEditingItem({ ...emptyItem, id: newId });
    setIsNew(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editingItem || !editingItem.name.trim()) return;

    const updatedItem = {
      ...editingItem,
      price: Number(editingItem.price) || 0,
      rating: Number(editingItem.rating) || 4.5,
    };

    if (isNew) {
      onUpdate([...items, updatedItem]);
    } else {
      onUpdate(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    }
    setEditingItem(null);
    setIsNew(false);
  };

  const handleDelete = (id: number) => {
    onUpdate(items.filter((i) => i.id !== id));
    setDeleteConfirm(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!editingItem || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newImages = [...editingItem.images];
      newImages[index] = dataUrl;
      setEditingItem({
        ...editingItem,
        images: newImages,
        image: index === 0 ? dataUrl : editingItem.image,
      });
    };
    reader.readAsDataURL(file);
  };

  const addImageSlot = () => {
    if (!editingItem || editingItem.images.length >= 3) return;
    setEditingItem({ ...editingItem, images: [...editingItem.images, ''] });
  };

  const removeImageSlot = (index: number) => {
    if (!editingItem || editingItem.images.length <= 1) return;
    const newImages = editingItem.images.filter((_, i) => i !== index);
    setEditingItem({
      ...editingItem,
      images: newImages,
      image: index === 0 ? newImages[0] : editingItem.image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-dark overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-dark-border text-gray-400 hover:text-flame hover:border-flame/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-flame" />
                Menu Manager
              </h1>
              <p className="text-sm text-gray-500">{items.length} items total</p>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg flame-gradient text-white font-semibold text-sm hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-dark-card border border-dark-border text-white text-sm placeholder-gray-600 focus:border-flame/50 outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-dark-card border border-dark-border text-white text-sm focus:border-flame/50 outline-none"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="flex items-center gap-3 p-3 bg-dark-card border border-dark-border rounded-xl hover:border-dark-hover transition-colors"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white text-sm truncate">{item.name}</h3>
                  {item.popular && (
                    <span className="px-1.5 py-0.5 rounded bg-flame/20 text-flame text-[10px] font-bold">Popular</span>
                  )}
                </div>
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
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-lg border border-dark-border text-gray-400 hover:text-flame hover:border-flame/30 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-2 rounded-lg border border-dark-border text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No items found.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setEditingItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-card border border-dark-border rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 my-4"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl font-bold text-white">
                  {isNew ? 'Add New Item' : 'Edit Item'}
                </h3>
                <button onClick={() => setEditingItem(null)} className="p-2 text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Images */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Images (up to 3)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {editingItem.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg bg-dark border border-dark-border overflow-hidden group">
                        {img ? (
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-600">
                            <ImagePlus className="w-6 h-6" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="p-1.5 rounded-full bg-flame text-white cursor-pointer hover:scale-110 transition-transform">
                            <ImagePlus className="w-4 h-4" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, idx)}
                              className="hidden"
                            />
                          </label>
                          {editingItem.images.length > 1 && (
                            <button
                              onClick={() => removeImageSlot(idx)}
                              className="p-1.5 rounded-full bg-red-500 text-white hover:scale-110 transition-transform"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 px-1 py-0.5 rounded bg-flame text-white text-[8px] font-bold">Main</span>
                        )}
                      </div>
                    ))}
                    {editingItem.images.length < 3 && (
                      <button
                        onClick={addImageSlot}
                        className="aspect-square rounded-lg border-2 border-dashed border-dark-border text-gray-600 hover:border-flame/30 hover:text-flame transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Product Name *</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm placeholder-gray-600 focus:border-flame/50 outline-none"
                    placeholder="e.g. Classic Smash Burger"
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Category</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm focus:border-flame/50 outline-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm focus:border-flame/50 outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm placeholder-gray-600 focus:border-flame/50 outline-none resize-none"
                    placeholder="Describe this dish..."
                  />
                </div>

                {/* Rating, Time, Spice */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={editingItem.rating}
                      onChange={(e) => setEditingItem({ ...editingItem, rating: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm focus:border-flame/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Prep Time</label>
                    <input
                      type="text"
                      value={editingItem.time}
                      onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm focus:border-flame/50 outline-none"
                      placeholder="15-20 min"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Spice Level</label>
                    <select
                      value={editingItem.spice}
                      onChange={(e) => setEditingItem({ ...editingItem, spice: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-dark border border-dark-border text-white text-sm focus:border-flame/50 outline-none"
                    >
                      {SPICE_LEVELS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Popular Toggle */}
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-dark border border-dark-border hover:border-flame/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={editingItem.popular}
                    onChange={(e) => setEditingItem({ ...editingItem, popular: e.target.checked })}
                    className="w-5 h-5 rounded border-dark-border bg-dark text-flame focus:ring-flame accent-[var(--color-flame)]"
                  />
                  <div>
                    <span className="text-white font-medium text-sm">Mark as Popular</span>
                    <p className="text-xs text-gray-500">Shows a "Popular" badge on this item</p>
                  </div>
                </label>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-dark-border text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!editingItem.name.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg flame-gradient text-white font-semibold text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" /> {isNew ? 'Add Item' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-card border border-dark-border rounded-xl p-5 max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Delete Item?</h3>
              <p className="text-gray-400 text-sm mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 rounded-lg border border-dark-border text-gray-400 hover:text-white text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-medium text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
