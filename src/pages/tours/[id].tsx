import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Changed from useParams
import Link from 'next/link'; // Changed from react-router-dom
import { MapPin, Clock, Users, Star, ChevronLeft, Check } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard'; // Adjusted path
import LoadingSpinner from '@/components/LoadingSpinner'; // Adjusted path
import { fetchTourById, fetchReviewsForTour, createReview } from '@/lib/supabase'; // Adjusted path
import type { Tour, Review } from '@/types'; // Adjusted path
import toast from 'react-hot-toast';

const TourIdPage: React.FC = () => { // Renamed component
  const router = useRouter();
  const { id: tourId } = router.query; // Get tour ID from Next.js router query

  const [tour, setTour] = useState<Tour | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const loadTourData = async () => {
      if (!tourId || typeof tourId !== 'string') return;

      try {
        setLoading(true);
        const [tourData, reviewsData] = await Promise.all([
          fetchTourById(tourId),
          fetchReviewsForTour(tourId)
        ]);

        if (tourData) {
          setTour(tourData);
          setReviews(reviewsData);
        } else {
          toast.error('Tour no encontrado');
        }
      } catch (error) {
        console.error('Error cargando detalles del tour:', error);
        toast.error('Error al cargar los detalles del tour');
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) { // Ensure router.query is populated
        loadTourData();
    }
  }, [tourId, router.isReady]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tourId || typeof tourId !== 'string' || !userName.trim() || !comment.trim()) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    try {
      setSubmittingReview(true);
      const newReview = await createReview({
        tour_id: parseInt(tourId),
        user_name: userName.trim(),
        rating,
        comment: comment.trim()
      });

      setReviews(prev => [newReview, ...prev]);
      setUserName('');
      setRating(5);
      setComment('');
      toast.success('¡Reseña enviada con éxito!');
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      toast.error('Error al enviar la reseña');
    } finally {
      setSubmittingReview(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return '0'; // Return string for consistency
    const sum = reviews.reduce((acc, reviewItem) => acc + reviewItem.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (numRating: number) => {
    const roundedRating = Math.round(numRating);
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < roundedRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading || !router.isReady) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center"> {/* Adjust min-height if needed */}
        <LoadingSpinner />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour No Encontrado</h1>
          <Link href="/" className="btn-primary inline-flex items-center"> {/* Use NextLink */}
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = tour.image_urls && tour.image_urls.length > 0
    ? tour.image_urls[currentImageIndex]
    : 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const averageRating = parseFloat(calculateAverageRating());

  return (
    <> {/* Removed Layout wrapper */}
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-primary-600 hover:text-primary-700 flex items-center"> {/* Use NextLink */}
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver a los Tours
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={currentImage}
                  alt={tour.name}
                  className="w-full h-96 object-cover"
                />
                {tour.image_urls && tour.image_urls.length > 1 && (
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    {tour.image_urls.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {tour.image_urls && tour.image_urls.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {tour.image_urls.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`${tour.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tour Details */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {tour.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{tour.location}</span>
                </div>
                {tour.duration && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{tour.duration}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Grupos Pequeños</span>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(averageRating)}
                  </div>
                  <span>
                    {calculateAverageRating()} ({reviews.length} reseñas)
                  </span>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </div>

              {tour.includes && tour.includes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Qué Incluye</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tour.includes.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Reseñas de Clientes ({reviews.length})
              </h2>

              {reviews.length > 0 ? (
                <div className="space-y-6 mb-8">
                  {reviews.map((reviewItem) => ( // Renamed review to reviewItem to avoid conflict
                    <ReviewCard key={reviewItem.id} review={reviewItem} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 mb-8">
                  Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!
                </p>
              )}

              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Dejar una Reseña</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                      Calificación
                    </label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="input-field"
                    >
                      <option value={5}>5 Estrellas - Excelente</option>
                      <option value={4}>4 Estrellas - Muy Bueno</option>
                      <option value={3}>3 Estrellas - Bueno</option>
                      <option value={2}>2 Estrellas - Regular</option>
                      <option value={1}>1 Estrella - Malo</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Tu Reseña
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="input-field"
                      placeholder="Comparte tu experiencia..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {submittingReview ? 'Enviando...' : 'Enviar Reseña'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8"> {/* Consider making top value more dynamic if navbar height changes */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  ${Number(tour.price).toFixed(0)}
                </div>
                <div className="text-gray-600">por persona</div>
              </div>

              <button className="btn-primary w-full mb-4 text-lg py-4">
                Reservar Ahora
              </button>

              <div className="text-center text-sm text-gray-600 mb-6">
                Cancelación gratuita hasta 24 horas antes
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">¿Necesitas Ayuda?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-600">📞 Llámanos:</span>
                    <a href="tel:+18095550123" className="ml-2 text-primary-600 hover:text-primary-700">
                      +1 (809) 555-0123
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600">✉️ Correo:</span>
                    <a href="mailto:info@puntacanatours.com" className="ml-2 text-primary-600 hover:text-primary-700">
                      info@puntacanatours.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TourIdPage;
