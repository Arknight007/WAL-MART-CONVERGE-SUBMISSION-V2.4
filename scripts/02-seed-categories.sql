-- Insert sample categories
INSERT INTO categories (name, slug, image_url) VALUES
('Grocery', 'grocery', '/placeholder.svg?height=200&width=200'),
('Home', 'home', '/placeholder.svg?height=200&width=200'),
('Patio & Garden', 'patio-garden', '/placeholder.svg?height=200&width=200'),
('Fashion', 'fashion', '/placeholder.svg?height=200&width=200'),
('Tech', 'tech', '/placeholder.svg?height=200&width=200'),
('Baby', 'baby', '/placeholder.svg?height=200&width=200'),
('Toys', 'toys', '/placeholder.svg?height=200&width=200'),
('Health & Wellness', 'health-wellness', '/placeholder.svg?height=200&width=200'),
('Personal Care', 'personal-care', '/placeholder.svg?height=200&width=200'),
('Beauty', 'beauty', '/placeholder.svg?height=200&width=200')
ON CONFLICT (slug) DO NOTHING;
