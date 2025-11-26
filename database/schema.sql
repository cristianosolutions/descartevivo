-- Tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'MORADOR', -- MORADOR, ADMIN
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tipos de resíduos
CREATE TABLE waste_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Pontos de coleta
CREATE TABLE collection_points (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100),
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6)
);

-- Entregas de resíduos
CREATE TABLE waste_deliveries (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    collection_point_id INT NOT NULL REFERENCES collection_points(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Itens de cada entrega (tipo + quantidade)
CREATE TABLE waste_delivery_items (
    id SERIAL PRIMARY KEY,
    delivery_id INT NOT NULL REFERENCES waste_deliveries(id) ON DELETE CASCADE,
    waste_type_id INT NOT NULL REFERENCES waste_types(id),
    quantity_kg NUMERIC(10,2) NOT NULL
);
