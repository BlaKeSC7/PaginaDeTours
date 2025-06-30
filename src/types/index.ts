export interface Tour {
  id: number
  name: string
  description: string
  price: number
  location: string
  image_urls: string[]
  duration?: string
  includes?: string[]
  created_at: string
}

export interface Review {
  id: number
  tour_id: number
  user_name: string
  rating: number
  comment: string
  created_at: string
}

export interface CreateTourData {
  name: string
  description: string
  price: number
  location: string
  image_urls: string[]
  duration?: string
  includes?: string[]
}

export interface CreateReviewData {
  tour_id: number
  user_name: string
  rating: number
  comment: string
}