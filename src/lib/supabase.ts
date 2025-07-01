import { createClient } from '@supabase/supabase-js';
import { Tour, Review, TourFormData, ReviewFormData } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tours API
export const fetchAllTours = async (): Promise<Tour[]> => {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
  return data || [];
};

export const fetchTourById = async (id: string): Promise<Tour | null> => {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error(`Error fetching tour ${id}:`, error);
    throw error;
  }
  return data;
};

export const addTour = async (tourData: TourFormData): Promise<Tour> => {
  const { data, error } = await supabase
    .from('tours')
    .insert([tourData])
    .select()
    .single();

  if (error) {
    console.error('Error adding tour:', error);
    throw error;
  }
  return data;
};

// Reviews API
export const fetchReviewsForTour = async (tourId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('tour_id', tourId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching reviews for tour ${tourId}:`, error);
    throw error;
  }
  return data || [];
};

export const addReview = async (reviewData: ReviewFormData): Promise<Review> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select()
    .single();

  if (error) {
    console.error('Error adding review:', error);
    throw error;
  }
  return data;
};