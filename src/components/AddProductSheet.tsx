'use client';

import { useState, type FormEvent } from 'react';
import { useStore } from '@/lib/store';
import BottomSheet from './BottomSheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY = { name: '', price: '', unit: '', stock: '', description: '' };

/** Form to list a new product in your own shop. */
const AddProductSheet = ({ isOpen, onClose }: Props) => {
  const { addProduct } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [imageUrl, setImageUrl] = useState<string>();
  const [pickup, setPickup] = useState(true);
  const [delivery, setDelivery] = useState(false);

  const set = (key: keyof typeof EMPTY) => (value: string) => setForm((f) => ({ ...f, [key]: value }));
  const digitsOnly = (v: string) => v.replace(/[^0-9]/g, '');

  const canSubmit =
    form.name.trim() && form.unit.trim() && Number(form.price) > 0 && Number(form.stock) > 0 && imageUrl && (pickup || delivery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !imageUrl) return;
    addProduct({
      name: form.name.trim(),
      price: Number(form.price),
      unit: form.unit.trim(),
      stock: Number(form.stock),
      description: form.description.trim() || undefined,
      imageUrl,
      harvestedAt: new Date().toISOString(),
      pickup,
      delivery,
    });
    setForm(EMPTY);
    setImageUrl(undefined);
    onClose();
  };

  const inputClass = 'w-full rounded-xl border px-3 py-2 text-sm';

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="List a product">
      <form onSubmit={handleSubmit} className="space-y-3 p-5">
        <label className="block aspect-square w-32 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs text-gray-400">📷 Add photo</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageUrl(URL.createObjectURL(file));
            }}
          />
        </label>

        <input value={form.name} onChange={(e) => set('name')(e.target.value)} placeholder="Product name (e.g. Tomatoes)" className={inputClass} />
        <div className="grid grid-cols-2 gap-2">
          <input
            value={form.price}
            onChange={(e) => set('price')(digitsOnly(e.target.value))}
            inputMode="numeric"
            placeholder="Price"
            className={inputClass}
          />
          <input value={form.unit} onChange={(e) => set('unit')(e.target.value)} placeholder="Unit (e.g. 1 kg)" className={inputClass} />
        </div>
        <input
          value={form.stock}
          onChange={(e) => set('stock')(digitsOnly(e.target.value))}
          inputMode="numeric"
          placeholder="Stock available"
          className={inputClass}
        />
        <textarea
          value={form.description}
          onChange={(e) => set('description')(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
          className={`${inputClass} resize-none`}
        />

        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={pickup} onChange={(e) => setPickup(e.target.checked)} className="accent-emerald-600" />
            📍 Pickup
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} className="accent-emerald-600" />
            🚚 Delivery
          </label>
        </div>

        <button type="submit" disabled={!canSubmit} className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-30">
          List product
        </button>
      </form>
    </BottomSheet>
  );
};

export default AddProductSheet;
