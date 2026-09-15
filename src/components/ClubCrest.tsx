import React, { useState } from 'react';

interface ClubCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const ClubCrest: React.FC<ClubCrestProps> = ({
  className = '',
  size = 'md',
  showText = false
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${sizeClasses[size]} shrink-0 drop-shadow-lg rounded-full overflow-hidden bg-white shadow-md border-2 border-blue-600/60 p-0.5`}>
        {!imgError ? (
          <img
            src="/logo.jpg"
            alt="Club Meridiano V° Escudo Oficial"
            className="w-full h-full object-contain rounded-full select-none"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg
            viewBox="0 0 100 115"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="60%" stopColor="#1D4ED8" />
                <stop offset="100%" stopColor="#0B1B3D" />
              </linearGradient>
            </defs>
            <path
              d="M50 4 C78 4 94 16 94 38 C94 76 68 102 50 112 C32 102 6 76 6 38 C6 16 22 4 50 4 Z"
              fill="#FFFFFF"
            />
            <path
              d="M50 8 C75 8 89 19 89 39 C89 73 66 97 50 106 C34 97 11 73 11 39 C11 19 25 8 50 8 Z"
              fill="url(#shieldGrad)"
            />
            <text
              x="50"
              y="40"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              fontFamily="Montserrat, sans-serif"
            >
              C.M.V
            </text>
            <text
              x="50"
              y="75"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="20"
              fontWeight="900"
              fontFamily="Montserrat, sans-serif"
            >
              V°
            </text>
            <text
              x="50"
              y="98"
              textAnchor="middle"
              fill="#93C5FD"
              fontSize="9"
              fontWeight="800"
              fontFamily="Montserrat, sans-serif"
            >
              1929
            </text>
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-heading font-black tracking-tight text-white leading-tight text-lg sm:text-xl">
            MERIDIANO V°
          </span>
          <span className="text-[11px] font-semibold text-blue-400 tracking-wider uppercase">
            BÁSQUETBOL • LA PLATA
          </span>
        </div>
      )}
    </div>
  );
};
