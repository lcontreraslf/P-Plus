import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // <-- migrado
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCardList from '@/components/ui/PropertyCardList';
import { featuredProperties } from '@/data/properties';
import {
  Search,
  Bed,
  Bath,
  Square,
  MapPin,
  Quote,
  UserCheck,
  MessageSquare,
  Building,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Tipado de props para SearchBar
interface SearchBarProps {
  onSearch: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [locationValue, setLocationValue] = useState('');
  const { toast } = useToast();

  const handleLocationSearch = () => {
    if (locationValue.trim()) {
      toast({
        title: `🔍 Buscando en: ${locationValue}`,
        description: '¡No te preocupes! Puedes solicitar esta función en tu próximo mensaje 🚀',
        duration: 3000,
      });
    }
  };

  const handleLocationKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLocationSearch();
    }
  };

  return (
    <div
      className={`glass-effect p-4 sm:p-6 rounded-2xl shadow-2xl shadow-black/30 w-full max-w-3xl mx-auto ${className ?? ''
        }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Ubicación</label>
          <div className="relative">
            <Input
              placeholder="Comuna, barrio..."
              className="bg-slate-800/50 border-slate-600 text-white pl-10"
              value={locationValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocationValue(e.target.value)
              }
              onKeyPress={handleLocationKeyPress}
            />
            <button
              type="button"
              onClick={handleLocationSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Tipo de Propiedad</label>
          <Select>
            <SelectTrigger className="w-full bg-slate-800/50 border-slate-600 text-white">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-white">
              <SelectItem value="departamento">Departamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="loft">Loft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Rango de Precio</label>
          <Select>
            <SelectTrigger className="w-full bg-slate-800/50 border-slate-600 text-white">
              <SelectValue placeholder="Cualquier precio" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-white">
              <SelectItem value="1">Hasta $300M</SelectItem>
              <SelectItem value="2">$300M - $700M</SelectItem>
              <SelectItem value="3">Más de $700M</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={onSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white md:h-10"
          type="button"
        >
          <Search className="w-5 h-5 mr-2 md:mr-0" />
          <span className="md:hidden">Buscar</span>
        </Button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { toast } = useToast();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchVisible(false);
      }
    };
    if (isSearchVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchVisible]);

  const handleActionClick = (featureName: string) => {
    toast({
      title: `🚧 ${featureName} no implementado`,
      description: '¡No te preocupes! Puedes solicitar esta función en tu próximo mensaje 🚀',
      duration: 3000,
    });
  };

  const [visibleCardsCount, setVisibleCardsCount] = useState(4);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const container = document.querySelector('.property-card-grid');
      if (container) {
        const columns = getComputedStyle(container)
          .getPropertyValue('grid-template-columns')
          .split(' ').length;
        setVisibleCardsCount(columns);
      }
    });

    const gridContainer = document.querySelector('.property-card-grid');
    if (gridContainer) observer.observe(gridContainer);

    return () => observer.disconnect();
  }, []);

  interface Property {
    id: number;
    title: string;
    type: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    featured: boolean;
  }

  const featuredAgents = [
    {
      id: 1,
      name: 'Carolina Pérez',
      specialty: 'Especialista en Lofts',
      image: 'Professional real estate agent woman smiling',
    },
    {
      id: 2,
      name: 'Javier Morales',
      specialty: 'Experto en Casas Familiares',
      image: 'Friendly male real estate agent portrait',
    },
    {
      id: 3,
      name: 'Sofía Castro',
      specialty: 'Reina de los Penthouses',
      image: 'Elegant real estate agent posing',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Familia González',
      quote:
        'ProPlus hizo que comprar nuestra primera casa fuera una experiencia increíble. ¡El equipo es excepcional!',
      image: 'Happy family in front of new house',
    },
    {
      id: 2,
      name: 'Martina López',
      quote:
        'Encontré el departamento perfecto en tiempo récord. Su plataforma es intuitiva y sus agentes, los mejores.',
      image: 'Young professional woman in a modern apartment',
    },
  ];
  const howItWorksSteps: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[] = [
      {
        icon: Search,
        title: 'Busca tu Propiedad',
        description: 'Usa nuestros filtros avanzados para encontrar el hogar de tus sueños.',
      },
      {
        icon: UserCheck,
        title: 'Contacta un Agente',
        description: 'Nuestros agentes expertos te guiarán en cada paso del proceso.',
      },
      {
        icon: Building,
        title: 'Cierra el Trato',
        description: 'Disfruta de un proceso de compra seguro, rápido y transparente.',
      },
    ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <>
      <Helmet>
        <title>ProPlus - Tu Hogar Perfecto Te Está Esperando</title>
        <meta
          name="description"
          content="Descubre las mejores propiedades en Santiago. Compra, arrienda o invierte en bienes raíces con ProPlus, tu socio inmobiliario de confianza."
        />
      </Helmet>

      <div className="bg-[#0B1120] text-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[50vh] flex flex-col items-center justify-center hero-bg py-8 md:py-12">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                Encuentra tu Espacio,
                <br />
                Define tu <span className="gradient-text">Futuro</span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto">
                La plataforma líder para descubrir propiedades exclusivas en las mejores zonas.
              </p>
            </motion.div>

            <div className="mt-4 h-24 flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                {!isSearchVisible ? (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      size="lg"
                      onClick={() => setIsSearchVisible(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Explorar Propiedades
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    ref={searchRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <SearchBar onSearch={() => handleActionClick('Búsqueda')} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-slate-900 z-0"></div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce-slow text-purple-400 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>


        </section>


        <div className="space-y-24 md:space-y-32">
          {/* Featured Properties */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="px-4 sm:px-6 lg:px-8 pt-8"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                  Propiedades <span className="gradient-text">Destacadas</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Una selección exclusiva de las mejores propiedades del mercado.
                </p>
              </div>

              <div className="property-card-grid grid grid-cols-2 md:grid-cols-4 gap-8">
                <PropertyCardList
                  properties={featuredProperties.slice(0, visibleCardsCount)}
                  onActionClick={handleActionClick}
                />
              </div>



              <div className="text-center mt-12">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/features-properties')}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 px-8 py-3"
                >
                  Ver Todas las Propiedades
                </Button>
              </div>
            </div>
          </motion.section>

          {/* How It Works */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="px-4 sm:px-6 lg:px-8 section-gradient py-20"
          >
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                  ¿Cómo <span className="gradient-text">Funciona</span>?
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Comprar la casa de tus sueños nunca fue tan fácil. Sigue estos simples pasos.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {howItWorksSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={i}
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="mx-auto w-20 h-20 mb-6 rounded-full flex items-center justify-center bg-blue-900/50 border border-blue-500/30">
                        <Icon className="w-10 h-10 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* Featured Agents */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                  Conoce a Nuestros <span className="gradient-text">Agentes</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Expertos apasionados, listos para ayudarte a encontrar tu próximo hogar.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredAgents.map((agent, i) => (
                  <motion.div
                    key={agent.id}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <img
                        className="rounded-full w-full h-full object-cover"
                        alt={agent.name}
                        src={`https://source.unsplash.com/featured/?${encodeURIComponent(
                          agent.specialty,
                        )},real-estate,agent`}
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-blue-500/50"></div>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{agent.name}</h3>
                    <p className="text-blue-400">{agent.specialty}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="px-4 sm:px-6 lg:px-8 section-gradient py-20"
          >
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                  Clientes <span className="gradient-text">Felices</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Lo que nuestros clientes dicen sobre su experiencia con ProPlus.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.id}
                    className="testimonial-card p-8 rounded-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Quote className="w-10 h-10 text-blue-500 mb-4" />
                    <p className="text-lg text-gray-300 mb-6 italic">"{t.quote}"</p>
                    <div className="flex items-center">
                      <img
                        className="w-12 h-12 rounded-full object-cover mr-4"
                        alt={t.name}
                        src={`https://source.unsplash.com/featured/?${encodeURIComponent(
                          t.name,
                        )},family,real-estate`}
                      />
                      <div>
                        <p className="font-semibold text-white">{t.name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA / Contact */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-5xl mx-auto text-center py-20 bg-slate-800/20 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 section-gradient"></div>
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                  ¿Listo para dar el siguiente paso?
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                  Nuestro equipo está listo para responder tus preguntas y ayudarte a comenzar.
                </p>
                <Button
                  size="lg"
                  onClick={() => handleActionClick('Contacto')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contacta con Nosotros
                </Button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
