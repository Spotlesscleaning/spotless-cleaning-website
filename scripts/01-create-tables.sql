-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create website content table
CREATE TABLE IF NOT EXISTS website_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash) 
VALUES ('admin@spotlesscleaning.com', '$2a$10$rOvHPGkwQGKqvzjo.6.5..rX8.8qLq8qX8qX8qX8qX8qX8qX8qX8qX8')
ON CONFLICT (email) DO NOTHING;

-- Insert default website content
INSERT INTO website_content (section, key, value) VALUES
('hero', 'title', 'Crystal Clear Windows, Every Time'),
('hero', 'subtitle', 'Professional window cleaning services for homes and businesses. Upload photos of your windows and get a free estimate!'),
('about', 'title', 'About Spotless Cleaning'),
('about', 'description', 'We are a small local business that emphasizes quality over quantity. This means we take pride in our work and truly care about our customers.'),
('contact', 'phone1', '613-888-1762'),
('contact', 'phone2', '613-484-5595'),
('contact', 'email', 'spotlessclnrs@gmail.com'),
('hours', 'weekdays', '8AM-5PM'),
('hours', 'saturday', 'Closed'),
('hours', 'sunday', 'Closed')
ON CONFLICT (section, key) DO NOTHING;
