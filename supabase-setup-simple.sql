-- Script SIMPLIFICADO sin RLS complicado
-- Usa esto si el primer script tuvo errores

-- Crear tabla de categorías si no existe
CREATE TABLE IF NOT EXISTS document_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);

-- Crear tabla de documentos si no existe
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  published_at TIMESTAMP DEFAULT now(),
  document_type TEXT,
  version TEXT,
  author TEXT,
  status TEXT DEFAULT 'publicado' CHECK (status IN ('borrador', 'publicado', 'archivado')),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Insertar categorías
INSERT INTO document_categories (name) VALUES
  ('Políticas'),
  ('Procedimientos'),
  ('Normatividad Legal'),
  ('Guías de Uso'),
  ('Términos y Condiciones')
ON CONFLICT (name) DO NOTHING;

-- Insertar 5 documentos de prueba (TODOS PUBLICADOS)
INSERT INTO documents (title, category, description, url, document_type, version, author, status, tags)
VALUES
  (
    'Política de Privacidad',
    'Políticas',
    'Política de privacidad y protección de datos',
    'https://www.google.com',
    'PDF',
    '1.0',
    'Admin',
    'publicado',
    ARRAY['privacidad']
  ),
  (
    'Términos de Servicio',
    'Términos y Condiciones',
    'Términos generales de uso',
    'https://www.google.com',
    'PDF',
    '1.0',
    'Admin',
    'publicado',
    ARRAY['términos']
  ),
  (
    'Guía de Inventario',
    'Guías de Uso',
    'Cómo usar el módulo de inventario',
    'https://www.google.com',
    'PDF',
    '2.1',
    'Soporte',
    'publicado',
    ARRAY['inventario']
  ),
  (
    'Guía de POS',
    'Guías de Uso',
    'Cómo usar el módulo de ventas',
    'https://www.google.com',
    'PDF',
    '2.0',
    'Soporte',
    'publicado',
    ARRAY['pos']
  ),
  (
    'Compliance GDPR',
    'Normatividad Legal',
    'Cumplimiento con GDPR',
    'https://www.google.com',
    'PDF',
    '1.0',
    'Legal',
    'publicado',
    ARRAY['gdpr']
  )
ON CONFLICT DO NOTHING;

-- OPCIONAL: Deshabilitar RLS temporalmente mientras debuggeamos
-- Descomenta estas líneas si tienes problemas de acceso
-- ALTER TABLE documents DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE document_categories DISABLE ROW LEVEL SECURITY;
