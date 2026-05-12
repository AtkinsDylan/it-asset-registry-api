-- Create tables
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  department_id INT REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  serial_number VARCHAR(100) UNIQUE,
  status VARCHAR(20) DEFAULT 'available',
  assigned_to INT REFERENCES users(id),
  department_id INT REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  asset_id INT REFERENCES assets(id),
  action VARCHAR(50) NOT NULL,
  changed_by VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO departments (name) VALUES
  ('IT'),
  ('HR'),
  ('Finance');

INSERT INTO users (name, email, department_id) VALUES
  ('Alice Smith', 'alice@company.com', 1),
  ('Bob Jones', 'bob@company.com', 2),
  ('Carol White', 'carol@company.com', 3);

INSERT INTO assets (name, type, serial_number, status, assigned_to, department_id) VALUES
  ('Dell Laptop', 'Laptop', 'SN-001', 'assigned', 1, 1),
  ('HP Monitor', 'Monitor', 'SN-002', 'available', NULL, 1),
  ('iPhone 13', 'Mobile', 'SN-003', 'assigned', 2, 2),
  ('Standing Desk', 'Furniture', 'SN-004', 'available', NULL, 3),
  ('MacBook Pro', 'Laptop', 'SN-005', 'assigned', 3, 3);