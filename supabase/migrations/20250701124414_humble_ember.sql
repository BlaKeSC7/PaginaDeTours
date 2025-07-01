-- Tours Table
CREATE TABLE tours (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  location TEXT DEFAULT 'Punta Cana',
  image_urls TEXT[], -- Array of image URLs
  duration TEXT,
  includes TEXT[], -- Array of included items
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tour_id BIGINT REFERENCES tours(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for both tables
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for 'tours' table
-- Allow public read access for all tours
CREATE POLICY "Public read access for tours"
ON tours
FOR SELECT
USING (true);

-- Allow authenticated users to insert, update, delete tours
-- For now, any authenticated user can manage tours (adjust for production)
CREATE POLICY "Authenticated users can manage tours"
ON tours
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Policies for 'reviews' table
-- Allow public read access for all reviews
CREATE POLICY "Public read access for reviews"
ON reviews
FOR SELECT
USING (true);

-- Allow anyone to insert reviews (no authentication required for now)
CREATE POLICY "Anyone can insert reviews"
ON reviews
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update reviews (you may want to restrict this later)
CREATE POLICY "Anyone can update reviews"
ON reviews
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow anyone to delete reviews (you may want to restrict this later)
CREATE POLICY "Anyone can delete reviews"
ON reviews
FOR DELETE
USING (true);

-- Insert some sample data (optional, for testing)
INSERT INTO tours (name, description, price, location, image_urls, duration, includes) VALUES
  (
    'Isla Saona - Paraíso Caribeño',
    'Descubre la belleza incomparable de Isla Saona, una de las joyas más preciadas del Caribe. Disfruta de playas de arena blanca, aguas cristalinas color turquesa y un día completo de relajación en el paraíso. Incluye parada en la piscina natural y almuerzo típico dominicano.',
    120.00,
    'Isla Saona, Punta Cana',
    ARRAY[
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'Día completo (8 horas)',
    ARRAY['Transporte ida y vuelta', 'Almuerzo buffet', 'Bebidas ilimitadas', 'Guía bilingüe', 'Snorkeling', 'Música en vivo']
  ),
  (
    'Aventura en Buggy por la Selva',
    'Vive una experiencia llena de adrenalina conduciendo tu propio buggy a través de senderos selváticos, plantaciones de caña de azúcar y pueblos típicos dominicanos. Incluye parada en cenote natural para refrescarte y conocer la cultura local auténtica.',
    85.50,
    'Macao, Punta Cana',
    ARRAY[
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    '4 horas',
    ARRAY['Buggy doble', 'Casco de seguridad', 'Guía experto', 'Parada en cenote', 'Agua y refrescos', 'Seguro incluido']
  ),
  (
    'Snorkeling en Isla Catalina',
    'Explora el mundo submarino del Caribe en las aguas cristalinas de Isla Catalina. Perfecto para principiantes y expertos, descubre la rica vida marina, corales coloridos y peces tropicales en uno de los mejores spots de snorkeling de República Dominicana.',
    95.00,
    'Isla Catalina, La Romana',
    ARRAY[
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    '6 horas',
    ARRAY['Equipo de snorkeling', 'Transporte marítimo', 'Almuerzo en la playa', 'Instructor certificado', 'Bebidas', 'Tiempo libre en playa']
  ),
  (
    'Catamaran Party - Fiesta en el Mar',
    'Súbete a bordo de nuestro catamaran de lujo para una experiencia única combinando relajación y diversión. Navega por las costas de Punta Cana con música en vivo, barra libre, snorkeling y la mejor fiesta en el mar del Caribe.',
    110.00,
    'Costa de Punta Cana',
    ARRAY[
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    '5 horas',
    ARRAY['Catamaran de lujo', 'Barra libre premium', 'DJ y música en vivo', 'Snorkeling incluido', 'Aperitivos gourmet', 'Animación profesional']
  );

-- Insert some sample reviews
INSERT INTO reviews (tour_id, user_name, rating, comment) VALUES
  (1, 'María González', 5, '¡Increíble experiencia! Isla Saona es realmente un paraíso. El agua es cristalina y la organización fue perfecta. Totalmente recomendado.'),
  (1, 'Carlos Rodríguez', 4, 'Muy buen tour, aunque había bastante gente. La comida estuvo deliciosa y el guía muy amable. Vale la pena la experiencia.'),
  (1, 'Ana Martínez', 5, 'Simplemente espectacular. Las fotos no le hacen justicia a la belleza del lugar. El snorkeling fue increíble, vimos muchos peces.'),
  (2, 'Roberto Silva', 5, '¡Pura adrenalina! Los buggies estaban en excelente estado y el recorrido por la selva fue emocionante. El cenote fue el broche de oro.'),
  (2, 'Laura Pérez', 4, 'Muy divertido, aunque un poco polvoriento. Los guías fueron geniales y nos enseñaron mucho sobre la cultura local. Recomendado para aventureros.'),
  (3, 'Diego Morales', 5, 'El mejor snorkeling que he hecho. La visibilidad era perfecta y vimos tortugas marinas. El instructor fue muy profesional y paciente.'),
  (3, 'Carmen López', 4, 'Hermosa experiencia submarina. Isla Catalina es preciosa y el agua muy clara. Solo le faltó un poco más de tiempo en el agua.'),
  (4, 'Miguel Torres', 5, '¡La mejor fiesta en el mar! El catamaran era lujoso, la música genial y las bebidas de primera. Una experiencia inolvidable.'),
  (4, 'Sofia Ramírez', 4, 'Muy buena experiencia, el ambiente estuvo genial y el personal muy atento. Solo que se llenó mucho hacia el final del tour.');