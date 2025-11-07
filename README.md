# San Mateo Longboard Festival - Landing Page


Landing page oficial del San Mateo Longboard Festival (III Edición 2025).

## 🚀 Tech Stack

- **Astro 5.15.3** - Framework principal (SSG + Islands)
- **React** - Componentes interactivos
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **Supabase** - Base de datos y autenticación
- **Zod** - Validación de esquemas
- **TypeScript** - Type safety

## 📋 Características

- ✅ 100% Responsive (mobile, tablet, desktop)
- ✅ Sistema de sprites CSS para ilustraciones eficientes
- ✅ Animaciones scroll y hover con Framer Motion
- ✅ Formulario de inscripción con Supabase
- ✅ SEO optimizado con meta tags y Schema.org
- ✅ Accesibilidad WCAG AA
- ✅ Performance optimizada

## 🛠️ Instalación

1. Clonar repositorio:
```bash
git clone https://github.com/tu-usuario/san-mateo-longfest.git
cd san-mateo-longfest
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales de Supabase
```

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## 🗄️ Setup Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)

2. Crear tabla `registrations`:
```sql
CREATE TABLE registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Configurar Row Level Security (RLS):
```sql
-- Habilitar RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserts públicos
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para permitir lectura (opcional, para admin)
CREATE POLICY "Allow admin reads" ON registrations
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Copiar URL y Anon Key a `.env`:
```env
PUBLIC_SUPABASE_URL=your_supabase_url_here
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 🎨 Sistema de Sprites

Los sprites están definidos en `src/styles/sprites.css`. Para agregar un nuevo sprite:

```css
.sprite-nombre {
  background-image: url('/assets-1.png');
  background-position: -X -Y;
  width: Wpx;
  height: Hpx;
}
```

Usar en componentes:
```tsx
<SpriteIcon sprite="nombre" />
```

## 📦 Build y Deploy

```bash
# Build
npm run build

# Preview build
npm run preview

# Deploy a Vercel
vercel --prod

# Deploy a Netlify
netlify deploy --prod
```

## 📱 Breakpoints

- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >1024px

## 🎯 Scripts

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## 📁 Estructura del Proyecto

```
surf-festival/
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, Section
│   │   ├── ui/            # Button, Card, Badge, Modal, etc.
│   │   └── sections/      # Hero, About, Categories, etc.
│   ├── layouts/
│   │   └── Layout.astro   # Layout principal con SEO
│   ├── pages/
│   │   └── index.astro    # Página principal
│   ├── services/
│   │   ├── supabase.ts    # Cliente Supabase
│   │   └── registration.ts # Servicios de registro
│   ├── styles/
│   │   ├── globals.css    # Variables CSS y estilos base
│   │   └── sprites.css    # Sistema de sprites
│   └── utils/
│       ├── animations.ts  # Variantes Framer Motion
│       └── validation.ts  # Schemas Zod
├── public/
│   ├── logo.png
│   ├── assets-1.png       # Sprite de iconos
│   ├── assets-2.png       # Sprite de iconos
│   ├── robots.txt
│   └── favicon.svg
└── [archivos de configuración]
```

## 🎨 Sistema de Diseño

El proyecto sigue un sistema de diseño completo documentado en `docs/style_guide.md`:

- **Colores**: Paleta sunset (amarillo, naranja, rosa) con neutros
- **Tipografía**: Bebas Neue (display), Roboto Condensed (headings), Roboto (body)
- **Sombras**: Estilo neo-brutal con sombras planas
- **Espaciado**: Base 4px
- **Animaciones**: Respetando `prefers-reduced-motion`

## ♿ Accesibilidad

- Contraste WCAG AA verificado
- Focus states en todos los elementos interactivos
- Skip links
- ARIA labels donde sea necesario
- Keyboard navigation completa
- Touch targets mínimo 44px

## 📄 Licencia

© 2025 San Mateo Longboard Festival. Todos los derechos reservados.

## 📞 Contacto

**Angelo Franco** - Coordinador  
WhatsApp: +593 96 931 0187  
Email: sanmateolongfestival@gmail.com
