import { createClient } from '@supabase/supabase-js'
import type { Tour, Review, CreateTourData, CreateReviewData } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tours API
export const fetchAllTours = async (): Promise<Tour[]> => {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tours:', error)
    throw error
  }
  return data || []
}

export const fetchTourById = async (id: string): Promise<Tour | null> => {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    console.error('Error fetching tour:', error)
    throw error
  }
  return data
}

export const createTour = async (tourData: CreateTourData): Promise<Tour> => {
  const { data, error } = await supabase
    .from('tours')
    .insert([tourData])
    .select()
    .single()

  if (error) {
    console.error('Error creating tour:', error)
    throw error
  }
  return data
}

// Reviews API
export const fetchReviewsForTour = async (tourId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('tour_id', tourId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
  return data || []
}

export const createReview = async (reviewData: CreateReviewData): Promise<Review> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select()
    .single()

  if (error) {
    console.error('Error creating review:', error)
    throw error
  }
  return data
}