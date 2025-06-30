import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Users, Award, ChevronRight } from 'lucide-react'
import TourCard from '../components/TourCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { fetchAllTours } from '../lib/supabase'
import type { Tour } from '../types'
import toast from 'react-hot-toast'

const HomePage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true)
        const data = await fetchAllTours()
        setTours(data)
        // Set first 3 tours as featured
        setFeaturedTours(data.slice(0, 3))
      } catch (error) {
        console.error('Error loading tours:', error)
        toast.error('Failed to load tours')
      } finally {
        setLoading(false)
      }
    }

    loadTours()
  }, [])

  return (
    <div className="min-h-screen">
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
            Discover Paradise in
            <span className="block text-accent-300">Punta Cana</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-shadow animate-slide-up">
            Unforgettable experiences await you in the Dominican Republic's most beautiful destination
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="#tours" className="btn-primary text-lg px-8 py-4">
              Explore Tours
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="#about" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
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
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">Amazing Tours</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular experiences that showcase the best of Punta Cana
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="#tours" className="btn-primary">
              View All Tours
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Punta Cana Tours?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best possible experience in paradise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Guides</h3>
              <p className="text-gray-600">
                Our local guides are passionate about sharing their knowledge and ensuring you have an authentic Dominican experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Value</h3>
              <p className="text-gray-600">
                We offer competitive prices without compromising on quality. Get the most out of your vacation budget.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5-Star Experience</h3>
              <p className="text-gray-600">
                From booking to the end of your tour, we ensure every detail is perfect for an unforgettable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Tours Section */}
      <section id="tours" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Our Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our complete collection of carefully curated experiences
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No tours available at the moment.</p>
              <p className="text-gray-500 mt-2">Please check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Book your perfect Punta Cana experience today and create memories that will last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="#tours" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
              Browse Tours
            </Link>
            <a 
              href="tel:+18095550123" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage