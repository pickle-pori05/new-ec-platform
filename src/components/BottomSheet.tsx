'use client';

import type { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  height?: string; // Tailwind height class, e.g. "h-[60vh]"
}

/** Reusable sheet that slides up from the bottom of the screen. */
const BottomSheet = ({ isOpen, onClose, title, children, footer, height = 'max-h-[85vh]' }: Props) => (
  <div>
    {/* Overlay: click to close */}
    <div
      className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    />

    {/* Sheet */}
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      className={`fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md ${height} flex flex-col
        rounded-t-3xl bg-white text-black shadow-2xl transition-transform duration-300 ease-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-gray-300" />
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-base font-bold">{title}</h2>
          <button onClick={onClose} className="text-xl text-gray-500" aria-label="Close">
            ✕
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">{children}</div>
      {footer && <div className="border-t p-3">{footer}</div>}
    </div>
  </div>
);

export default BottomSheet;
