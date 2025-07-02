import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Heart, Star, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';

interface PropertyCardListProps {
  properties: Property[];
  onActionClick?: (feature: string) => void;
}

const PropertyCardList: React.FC<PropertyCardListProps> = ({ properties, onActionClick }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'Departamento':
        return 'bg-blue-600';
      case 'Casa':
        return 'bg-green-600';
      case 'Penthouse':
        return 'bg-purple-600';
      case 'Loft':
        return 'bg-pink-600';
      default:
        return 'bg-slate-600';
    }
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'Departamento':
        return <Building className="w-4 h-4" />;
      case 'Casa':
        return <Home className="w-4 h-4" />;
      case 'Penthouse':
        return <Star className="w-4 h-4" />;
      case 'Loft':
        return <Star className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      {properties.map((p, i) => {
        const isFavorite = favorites.includes(p.id);
        const heartButtonClass = `
  absolute top-4 right-4 cursor-pointer transition-transform duration-300 hover:scale-110
`;


        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="property-card group rounded-3xl overflow-hidden shadow-2xl bg-slate-900/80 border border-slate-700 hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer flex flex-col"
            onClick={() => onActionClick?.('Ver propiedad')}
          >
            <div className="relative overflow-hidden h-56">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div
                className={`
                  absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
                  ${getBadgeClass(p.type)} text-white shadow-lg
                `}
              >
                {getBadgeIcon(p.type)}
                {p.type}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFavorites((prev) =>
                    prev.includes(p.id) ? prev.filter((id) => id !== p.id) : [...prev, p.id]
                  );
                }}
                className={heartButtonClass}
              >
                <Heart
                  className="w-7 h-7 transition-transform duration-300"
                  fill={isFavorite ? 'red' : 'none'}
                />
              </button>
            </div>

            <div className="flex-1 flex flex-col p-6">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {p.title}
              </h3>
              <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>{p.location}</span>
              </div>
              <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                {p.price}
              </div>
              <div className="flex items-center justify-between text-gray-300 text-base border-t border-slate-700 pt-4 mb-4">
                <div className="flex items-center gap-1">
                  <Bed className="w-5 h-5" />
                  <span>{p.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-5 h-5" />
                  <span>{p.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="w-5 h-5" />
                  <span>{p.area}m²</span>
                </div>
              </div>
              <div className="mt-auto flex justify-end">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onActionClick?.('Detalles');
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Ver detalles
                </Button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default PropertyCardList;
