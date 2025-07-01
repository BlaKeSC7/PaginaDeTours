import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Changed from react-router-dom
import { Star, Users, Award, ChevronRight } from 'lucide-react'; // MapPin removed
import TourCard from '@/components/TourCard'; // Adjusted path
import LoadingSpinner from '@/components/LoadingSpinner'; // Adjusted path
import { fetchAllTours } from '@/lib/supabase'; // Adjusted path
import type { Tour } from '@/types'; // Adjusted path
import toast from 'react-hot-toast';

const NextHomePage: React.FC = () => { // Renamed component
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        const data = await fetchAllTours();
        setTours(data);
        setFeaturedTours(data.slice(0, 3));
      } catch (error) {
        console.error('Error cargando tours:', error); // Translated
        toast.error('Error al cargar los tours'); // Translated
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  // Translated text constants
  const heroTitle = <>Descubre el Paraíso en <span className="block text-blue-300">Punta Cana</span></>; // Changed text-accent-300 to text-blue-300
  const heroSubtitle = "Experiencias inolvidables te esperan en el destino más hermoso de República Dominicana.";
  const exploreToursText = "Explorar Tours";
  const learnMoreText = "Saber Más";

  const stats = [
    { value: "500+", label: "Clientes Felices" },
    { value: "15+", label: "Tours Increíbles" },
    { value: "4.9", label: "Calificación Promedio" },
    { value: "24/7", label: "Soporte" },
  ];

  const featuredToursTitle = "Tours Destacados";
  const featuredToursSubtitle = "Descubre nuestras experiencias más populares que muestran lo mejor de Punta Cana.";
  const viewAllToursText = "Ver Todos los Tours";

  const whyChooseUsTitle = "¿Por Qué Elegir Punta Cana Tours?";
  const whyChooseUsSubtitle = "Estamos comprometidos a brindarte la mejor experiencia posible en el paraíso.";
  const reasons = [
    { icon: Users, title: "Guías Expertos", description: "Nuestros guías locales son apasionados por compartir su conocimiento y asegurar que tengas una auténtica experiencia dominicana." },
    { icon: Award, title: "Mejor Valor", description: "Ofrecemos precios competitivos sin comprometer la calidad. Aprovecha al máximo tu presupuesto de vacaciones." },
    { icon: Star, title: "Experiencia 5 Estrellas", description: "Desde la reserva hasta el final de tu tour, nos aseguramos de que cada detalle sea perfecto para una experiencia inolvidable." },
  ];

  const allOurToursTitle = "Todos Nuestros Tours";
  const allOurToursSubtitle = "Elige de nuestra colección completa de experiencias cuidadosamente seleccionadas.";
  const noToursAvailableText = "No hay tours disponibles en este momento.";
  const checkBackLaterText = "¡Por favor, vuelve más tarde!";

  const ctaTitle = "¿Listo para Tu Aventura?";
  const ctaSubtitle = "Reserva tu experiencia perfecta en Punta Cana hoy y crea recuerdos que durarán toda la vida.";
  const browseToursText = "Ver Tours";
  const callNowText = "Llamar Ahora";

  return (
    <> {/* Replaced div with Fragment as Layout is global now */}
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        />
        <div className="absolute inset-0 hero-gradient" />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow animate-fade-in">
            {heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-shadow animate-slide-up">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            {/* Use <a> for hash links for simplicity with Next.js pages */}
            <a href="#tours" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              {exploreToursText}
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#about" className="btn-secondary text-lg px-8 py-4">
              {learnMoreText}
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(stat => (
              <div key={stat.label} className="animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {featuredToursTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {featuredToursSubtitle}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12"> <LoadingSpinner /> </div>
          ) : featuredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{noToursAvailableText}</p>
             </div>
          )}

          <div className="text-center">
            <a href="#tours" className="btn-primary inline-flex items-center">
              {viewAllToursText}
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {whyChooseUsTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {whyChooseUsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map(reason => (
              <div key={reason.title} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Tours Section */}
      <section id="tours" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {allOurToursTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {allOurToursSubtitle}
            </p>
          </div>

          {loading ? (
             <div className="flex justify-center items-center py-12"> <LoadingSpinner /> </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{noToursAvailableText}</p>
              <p className="text-gray-500 mt-2">{checkBackLaterText}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {ctaTitle}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tours" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
              {browseToursText}
            </a>
            <a
              href="tel:+18095550123"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {callNowText}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default NextHomePage; // Renamed export