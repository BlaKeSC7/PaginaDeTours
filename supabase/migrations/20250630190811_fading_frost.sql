/*
  # Create tours and reviews tables

  1. New Tables
    - `tours`
      - `id` (bigint, primary key, auto-increment)
      - `name` (text, required)
      - `description` (text)
      - `price` (numeric, required)
      - `location` (text, default 'Punta Cana')
      - `image_urls` (text array)
      - `duration` (text, optional)
      - `includes` (text array, optional)
      - `created_at` (timestamptz, default now)
    - `reviews`
      - `id` (bigint, primary key, auto-increment)
      - `tour_id` (bigint, foreign key to tours)
      - `user_name` (text, required)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on both tables
    - Public read access for tours and reviews
    - Authenticated users can insert tours and reviews
*/

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  location TEXT DEFAULT 'Punta Cana',
  image_urls TEXT[],
  duration TEXT,
  includes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tour_id BIGINT REFERENCES tours(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Tours policies
CREATE POLICY "Public read access for tours"
  ON tours
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert tours"
  ON tours
  FOR INSERT
  WITH CHECK (true);

-- Reviews policies
CREATE POLICY "Public read access for reviews"
  ON reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert reviews"
  ON reviews
  FOR INSERT
  WITH CHECK (true);

-- Insert sample tours with Pexels images
INSERT INTO tours (name, description, price, location, image_urls, duration, includes) VALUES
(
  'Saona Island Paradise Getaway',
  'Experience the breathtaking beauty of Saona Island, one of the most stunning natural pools in the Caribbean. This full-day excursion takes you to pristine white sandy beaches and crystal-clear turquoise waters. Enjoy a traditional Dominican lunch, snorkeling opportunities, and time to relax in this tropical paradise.',
  120.00,
  'Saona Island, Punta Cana',
  ARRAY[
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  'Full Day (8 hours)',
  ARRAY['Round-trip transportation', 'Boat transfer', 'Dominican lunch', 'Open bar', 'Snorkeling equipment', 'Professional guide']
),
(
  'Punta Cana Dune Buggy Adventure',
  'Get your adrenaline pumping with this thrilling off-road dune buggy adventure through the Dominican countryside. Navigate through muddy trails, cross rivers, and discover hidden cenotes. This exciting tour combines adventure with cultural immersion as you visit a local Dominican village.',
  85.50,
  'Punta Cana Countryside',
  ARRAY[
    'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '4 hours',
  ARRAY['Dune buggy rental', 'Safety equipment', 'Professional guide', 'Village visit', 'Refreshments', 'Hotel pickup and drop-off']
),
(
  'Catalina Island Snorkeling & Beach',
  'Discover the underwater world of Catalina Island with this amazing snorkeling tour. Explore vibrant coral reefs, swim with tropical fish, and relax on one of the most beautiful beaches in the Dominican Republic. Perfect for both beginners and experienced snorkelers.',
  95.00,
  'Catalina Island',
  ARRAY[
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '6 hours',
  ARRAY['Boat transportation', 'Snorkeling equipment', 'Professional guide', 'Beach time', 'Lunch', 'Drinks']
),
(
  'Hoyo Azul Cenote & Zip Line Adventure',
  'Experience the natural wonder of Hoyo Azul, a stunning freshwater cenote with crystal-clear blue waters. This adventure includes zip-lining through the tropical forest canopy and swimming in the magical cenote. A perfect combination of adventure and natural beauty.',
  110.00,
  'Scape Park, Punta Cana',
  ARRAY[
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '5 hours',
  ARRAY['Zip line experience', 'Cenote access', 'Safety equipment', 'Professional guide', 'Transportation', 'Light refreshments']
),
(
  'Santo Domingo Historical City Tour',
  'Step back in time with this fascinating tour of Santo Domingo, the oldest European city in the Americas. Explore the Colonial Zone, visit the Cathedral of Santo Domingo, walk through cobblestone streets, and learn about the rich history of the Dominican Republic.',
  75.00,
  'Santo Domingo',
  ARRAY[
    'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '8 hours',
  ARRAY['Round-trip transportation', 'Professional guide', 'Cathedral visit', 'Colonial Zone tour', 'Lunch', 'Historical sites entrance']
),
(
  'Dolphin Swim Experience',
  'Fulfill your dream of swimming with dolphins in their natural habitat. This unforgettable experience allows you to interact, play, and swim with these intelligent marine mammals in a safe and controlled environment. Perfect for families and animal lovers.',
  150.00,
  'Ocean World, Punta Cana',
  ARRAY[
    'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  '3 hours',
  ARRAY['Dolphin interaction', 'Swimming session', 'Professional trainer', 'Photos and videos', 'Locker rental', 'Transportation']
);

-- Insert sample reviews
INSERT INTO reviews (tour_id, user_name, rating, comment) VALUES
(1, 'John Smith', 5, 'Absolutely amazing! Saona Island is a true paradise. The water is crystal clear and the beach is pristine. Our guide was fantastic and the lunch was delicious. Highly recommend this tour!'),
(1, 'Maria Garcia', 5, 'Perfect day trip! The boat ride was smooth and the island is breathtaking. Great value for money and excellent service throughout the day.'),
(1, 'David Johnson', 4, 'Beautiful island and great experience. The only downside was it got a bit crowded, but still worth it. The snorkeling was amazing!'),
(2, 'Sarah Wilson', 5, 'So much fun! The dune buggies were easy to drive and the trails were exciting. Getting muddy was part of the adventure. The village visit was very interesting too.'),
(2, 'Mike Brown', 5, 'Adrenaline rush guaranteed! Great guides who made sure we were safe while having maximum fun. The cenote stop was a nice bonus.'),
(3, 'Lisa Anderson', 4, 'Great snorkeling experience. Saw lots of colorful fish and the coral reef was beautiful. The beach time was relaxing and the lunch was good.'),
(3, 'Carlos Rodriguez', 5, 'Perfect for snorkeling enthusiasts! Clear water, abundant marine life, and professional guides. Catalina Island is a hidden gem.'),
(4, 'Emma Thompson', 5, 'Hoyo Azul is absolutely stunning! The zip line was thrilling and swimming in the cenote was magical. A must-do experience in Punta Cana.'),
(5, 'Robert Lee', 4, 'Very educational and interesting tour. Santo Domingo has so much history. Our guide was knowledgeable and the Colonial Zone is beautiful.'),
(6, 'Jennifer Davis', 5, 'Swimming with dolphins was a dream come true! The trainers were professional and the dolphins were so friendly. Unforgettable experience!');