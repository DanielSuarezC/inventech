-- Crear tabla de categorías de documentos
CREATE TABLE IF NOT EXISTS document_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);

-- Crear tabla de documentos
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
  status TEXT DEFAULT 'borrador' CHECK (status IN ('borrador', 'publicado', 'archivado')),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_published_at ON documents(published_at DESC);

-- Insertar categorías de ejemplo
INSERT INTO document_categories (name) VALUES
  ('Políticas'),
  ('Procedimientos'),
  ('Normatividad Legal'),
  ('Guías de Uso'),
  ('Términos y Condiciones')
ON CONFLICT (name) DO NOTHING;

-- Insertar documentos de ejemplo (PUBLICADOS)
INSERT INTO documents (title, category, description, url, document_type, version, author, status, tags, published_at)
VALUES
  (
    'Política de Privacidad',
    'Políticas',
    'Política de privacidad y protección de datos de InvenTech S.A.S.',
    'https://drive.google.com/file/d/1example/view?usp=sharing',
    'PDF',
    '1.0',
    'Admin',
    'publicado',
    ARRAY['privacidad', 'datos', 'protección'],
    now()
  ),
  (
    'Términos de Servicio',
    'Términos y Condiciones',
    'Términos y condiciones generales de uso de la plataforma InvenTech.',
    'https://drive.google.com/file/d/2example/view?usp=sharing',
    'PDF',
    '1.0',
    'Admin',
    'publicado',
    ARRAY['términos', 'servicio', 'condiciones'],
    now()
  ),
  (
    'Guía de Uso - Inventario',
    'Guías de Uso',
    'Manual completo para usar el módulo de inventario de InvenTech.',
    'https://drive.google.com/file/d/3example/view?usp=sharing',
    'PDF',
    '2.1',
    'Equipo de Soporte',
    'publicado',
    ARRAY['inventario', 'guía', 'tutorial'],
    now()
  ),
  (
    'Guía de Uso - Punto de Venta',
    'Guías de Uso',
    'Manual completo para usar el módulo de POS de InvenTech.',
    'https://drive.google.com/file/d/4example/view?usp=sharing',
    'PDF',
    '2.0',
    'Equipo de Soporte',
    'publicado',
    ARRAY['pos', 'venta', 'tutorial'],
    now()
  ),
  (
    'Compliance - GDPR',
    'Normatividad Legal',
    'Documento de cumplimiento con regulaciones GDPR.',
    'https://drive.google.com/file/d/5example/view?usp=sharing',
    'PDF',
    '1.0',
    'Legal',
    'publicado',
    ARRAY['gdpr', 'compliance', 'regulación'],
    now()
  )
ON CONFLICT DO NOTHING;

-- Habilitar RLS (Row Level Security)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_categories ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden ver documentos publicados
CREATE POLICY "Allow public read published documents" ON documents
  FOR SELECT
  USING (status = 'publicado');

-- Política: Solo admins pueden crear, actualizar y eliminar
CREATE POLICY "Allow admin full access" ON documents
  FOR ALL
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%admin%'))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%admin%'));

-- Política: Todos pueden ver categorías
CREATE POLICY "Allow public read categories" ON document_categories
  FOR SELECT
  USING (true);

-- Política: Solo admins pueden modificar categorías
CREATE POLICY "Allow admin manage categories" ON document_categories
  FOR ALL
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%admin%'))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%admin%'));
