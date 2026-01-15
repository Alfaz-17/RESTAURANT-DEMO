-- Create menu_items table for persistent storage
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  dietary TEXT CHECK (dietary IN ('veg', 'non-veg', 'vegan')),
  spice TEXT CHECK (spice IN ('mild', 'medium', 'bold')),
  portion TEXT CHECK (portion IN ('light', 'regular', 'shareable')),
  pairing TEXT,
  chef_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
