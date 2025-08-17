-- Insert sample products for Patio & Garden category
WITH patio_category AS (
  SELECT id FROM categories WHERE slug = 'patio-garden' LIMIT 1
)
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock_quantity, is_featured, rating, review_count) 
SELECT * FROM (VALUES
  ('Quictent 10''x10'' Pop up Canopy Tent with Netting', 'One Person Setup, Waterproof, UV Protection, Perfect for Outdoor Events', 152.99, 242.84, '/placeholder.svg?height=400&width=400', (SELECT id FROM patio_category), 25, true, 4.3, 127),
  ('FOUKUS Set of 5 Self-Watering Plant Pots', 'Eco-Friendly Plastic Planters with Drainage System', 16.96, 36.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM patio_category), 50, false, 4.5, 89),
  ('FCMP Outdoor RC4000 50 Gallon Rain Water Barrel', 'Eco-Friendly Water Collection System with Spigot', 119.99, 159.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM patio_category), 15, false, 4.2, 203),
  ('YEERSWAG 67x21x3 inch Non Slip Lounge Chaise Chair Cushion', 'Weather Resistant Outdoor Furniture Cushion', 37.99, 45.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM patio_category), 30, false, 4.1, 156),
  ('Costway Ironmax 2400 PSI Electric Pressure Washer', '1.7 GPM 120V Electric Cold Water Pressure Washer', 109.99, 199.00, '/placeholder.svg?height=400&width=400', (SELECT id FROM patio_category), 20, true, 4.4, 312),
  ('Solar Garden Lights Outdoor Decorative', '2 Pack Solar Canola Flower Lights for Pathway', 13.99, 29.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM patio_category), 100, false, 4.0, 78)
) AS v(name, description, price, original_price, image_url, category_id, stock_quantity, is_featured, rating, review_count);

-- Insert sample products for other categories
WITH grocery_category AS (SELECT id FROM categories WHERE slug = 'grocery' LIMIT 1),
     tech_category AS (SELECT id FROM categories WHERE slug = 'tech' LIMIT 1),
     fashion_category AS (SELECT id FROM categories WHERE slug = 'fashion' LIMIT 1)
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock_quantity, is_featured, rating, review_count)
SELECT * FROM (VALUES
  ('Great Value Whole Milk', 'Fresh Whole Milk, 1 Gallon', 3.48, NULL, '/placeholder.svg?height=400&width=400', (SELECT id FROM grocery_category), 200, false, 4.2, 1250),
  ('Samsung 55" 4K Smart TV', 'Crystal UHD 4K Smart TV with Alexa Built-in', 399.99, 499.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM tech_category), 12, true, 4.6, 892),
  ('Levi''s 501 Original Jeans', 'Classic Straight Leg Denim Jeans', 59.99, 69.99, '/placeholder.svg?height=400&width=400', (SELECT id FROM fashion_category), 45, false, 4.3, 567)
) AS v(name, description, price, original_price, image_url, category_id, stock_quantity, is_featured, rating, review_count);
