import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Heart, Star, Building, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const properties = [
  {
    id: 1,
    title: 'Departamento Moderno en Las Condes',
    type: 'Departamento',
    price: '$450.000.000',
    location: 'Las Condes, Santiago',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Casa Familiar en Providencia',
    type: 'Casa',
    price: '$680.000.000',
    location: 'Providencia, Santiago',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Penthouse de Lujo en Vitacura',
    type: 'Penthouse',
    price: '$1.200.000.000',
    location: 'Vitacura, Santiago',
    bedrooms: 4,
    bathrooms: 4,
    area: 250,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Loft Creativo en Ñuñoa',
    type: 'Loft',
    price: '$320.000.000',
    location: 'Ñuñoa, Santiago',
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Casa con Jardín en La Reina',
    type: 'Casa',
    price: '$540.000.000',
    location: 'La Reina, Santiago',
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Departamento Familiar en Santiago Centro',
    type: 'Departamento',
    price: '$390.000.000',
    location: 'Santiago Centro',
    bedrooms: 2,
    bathrooms: 2,
    area: 90,
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    title: 'Penthouse Panorámico en Las Condes',
    type: 'Penthouse',
    price: '$1.350.000.000',
    location: 'Las Condes, Santiago',
    bedrooms: 5,
    bathrooms: 5,
    area: 300,
    image: 'https://images.unsplash.com/photo-1503389152951-9c3d8bca6c63?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    title: 'Loft Minimalista en Providencia',
    type: 'Loft',
    price: '$310.000.000',
    location: 'Providencia, Santiago',
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    image: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 9,
    title: 'Casa de Lujo en Vitacura',
    type: 'Casa',
    price: '$1.800.000.000',
    location: 'Vitacura, Santiago',
    bedrooms: 6,
    bathrooms: 5,
    area: 400,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80',
  },
];

const FeaturesPropertiesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Propiedades Destacadas - ProPlus</title>
        <meta
          name="description"
          content="Explora todas las propiedades destacadas en ProPlus. Encuentra tu próximo hogar con nuestro catálogo exclusivo."
        />
      </Helmet>
      <div className="bg-[#0B1120] min-h-screen text-white px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold gradient-text">Propiedades Destacadas</h1>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
            >
              Volver
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {properties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="property-card group rounded-3xl overflow-hidden shadow-2xl bg-slate-900/80 border border-slate-700 hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={p.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                      p.type === 'Departamento'
                        ? 'bg-blue-600'
                        : p.type === 'Casa'
                        ? 'bg-green-600'
                        : p.type === 'Penthouse'
                        ? 'bg-purple-600'
                        : 'bg-pink-600'
                    } text-white shadow-lg`}
                  >
                    {p.type === 'Departamento' && <Building className="w-4 h-4" />}
                    {p.type === 'Casa' && <Home className="w-4 h-4" />}
                    {p.type === 'Penthouse' && <Star className="w-4 h-4" />}
                    {p.type === 'Loft' && <Star className="w-4 h-4" />}
                    {p.type}
                  </div>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-red-500 hover:bg-white/20 transition-all duration-200 group-hover:scale-110"
                  >
                    <Heart className="w-5 h-5 transition-transform duration-200 group-hover:scale-125" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{p.location}</span>
                  </div>
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
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
                    <Button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPropertiesPage;
