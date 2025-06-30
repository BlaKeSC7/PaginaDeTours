import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Star } from 'lucide-react'
import type { Tour } from '../types'

interface TourCardProps {
  tour: Tour
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const imageUrl = tour.image_urls && tour.image_urls.length > 0
    ? tour.image_urls[0]
    : 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800'

  return (
    <div className="card overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={tour.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
          <span className="text-primary-600 font-bold text-lg">
            ${Number(tour.price).toFixed(0)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {tour.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{tour.location}</span>
        </div>
        
        {tour.duration && (
          <div className="flex items-center text-gray-600 mb-3">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{tour.duration}</span>
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {tour.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">(4.8)</span>
          </div>
          
          <Link
            to={`/tours/${tour.id}`}
            className="btn-primary text-sm py-2 px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TourCard