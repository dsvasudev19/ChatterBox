import React from 'react';
import { MessageCircle } from 'lucide-react';

const CircleChatSpinner = () => {
  return (
    <div className="relative w-24 h-24">
      {/* Gradient spinning border */}
      <div 
        className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]"
        style={{
          background: 'conic-gradient(from 0deg, #34d399, #3b82f6)',
          maskImage: 'radial-gradient(transparent 65%, black 65%)',
          WebkitMaskImage: 'radial-gradient(transparent 65%, black 65%)'
        }}
      />
      
      {/* Center content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <MessageCircle className="w-8 h-8 text-emerald-500" />
        
        {/* Dots container */}
        <div className="flex mt-1 space-x-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-[bounce_1.2s_infinite] [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-[bounce_1.2s_infinite] [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-[bounce_1.2s_infinite] [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

// Add required Tailwind CSS classes to your tailwind.config.js:
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         bounce: {
//           '0%, 80%, 100%': { transform: 'translateY(0)' },
//           '40%': { transform: 'translateY(-6px)' }
//         }
//       }
//     }
//   }
// }

export default CircleChatSpinner;