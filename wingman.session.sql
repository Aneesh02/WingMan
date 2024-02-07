SELECT * FROM restaurants;

DELETE FROM restaurants; 


INSERT INTO restaurants (
    name, 
    street_address, 
    category, 
    price_range, 
    owner_id, 
    image_url, 
    created_at, 
    updated_at
    )
VALUES 
  ('Tech Cafe', 
  'Boys Hostel 2', 
  'Indian', 
  2, 
  12, 
  'https://vancouber-eats.s3.us-west-2.amazonaws.com/res1-main-image.jpg', 
  CURRENT_DATE, 
  CURRENT_DATE
  );



INSERT INTO menu_items (
    restaurant_id, 
    name, 
    type, 
    price, 
    description, 
    image_url, 
    created_at, 
    updated_at)
VALUES 
  (33, 
  'Veg Maggi', 
  'entree', 
  50, 
  'Quick noodles with vegetables', 
  'https://vancouber-eats.s3.us-west-2.amazonaws.com/res1-main-image.jpg', 
  CURRENT_DATE, 
  CURRENT_DATE);
