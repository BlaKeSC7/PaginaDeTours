import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Descubre el Paraíso en
            <span className="block text-blue-300">Punta Cana</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Experiencias únicas, aventuras inolvidables y los mejores precios garantizados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#tours"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 inline-block"
            >
              Ver Tours
            </a>
            <a
              href="#about"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 inline-block"
            >
              Más Información
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;