-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  items JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'preparing', 'ready', 'served')),
  type TEXT NOT NULL CHECK (type IN ('dine-in', 'takeaway', 'delivery')),
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  preparation_time INTEGER DEFAULT 5,
  estimated_ready_time TIMESTAMP,
  resolved_at TIMESTAMP
);

-- Service requests table
CREATE TABLE IF NOT EXISTS service_requests (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('water', 'clean', 'assistance', 'cutlery', 'bill')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP,
  response_time INTEGER
);

-- Menu items availability
CREATE TABLE IF NOT EXISTS menu_items_availability (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory log
CREATE TABLE IF NOT EXISTS inventory_log (
  id SERIAL PRIMARY KEY,
  item_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  quantity_used INTEGER NOT NULL,
  order_id TEXT REFERENCES orders(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer feedback
CREATE TABLE IF NOT EXISTS customer_feedback (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id),
  rating TEXT CHECK (rating IN ('excellent', 'good', 'improvement')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE IF NOT EXISTS cafe_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS service_requests_created_at_idx ON service_requests(created_at);
CREATE INDEX IF NOT EXISTS inventory_log_created_at_idx ON inventory_log(created_at);
