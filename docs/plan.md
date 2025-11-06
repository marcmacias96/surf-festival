# Plan de Desarrollo: San Mateo Longboard Festival Landing

**Versión:** 1.0
**Fecha:** 2025-11-06
**Stack:** Astro + React + Tailwind CSS + Framer Motion + Supabase + Zod

---

## 🎯 Objetivo del Proyecto

Crear una landing page vibrante, interactiva y animada para el San Mateo Longboard Festival (III Edición) que:
- Use sprites CSS para ilustraciones eficientes
- Implemente animaciones basadas en scroll y hover
- Se sienta viva e interactiva
- Sea 100% responsive y accesible
- Integre sistema de inscripciones con Supabase

---

## 📊 Stack Técnico

### Frontend
- **Astro 5.15.3** - Framework principal (SSG + Islands)
- **React** - Componentes interactivos
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas

### Backend & Datos
- **Supabase** - Base de datos + Auth
- **Zod** - Validación de esquemas

### Herramientas
- **TypeScript** - Type safety
- **@astrojs/sitemap** - SEO
- **Google Fonts** - Bebas Neue, Roboto Condensed, Roboto

---

## 🎨 Sistema de Diseño (Style Guide)

### Colores Primarios
- Amarillo: `#FFD700`
- Naranja: `#FF8C42`
- Rosa/Magenta: `#FF4D8C`
- Gradiente Sunset: `linear-gradient(135deg, #FFD700 0%, #FF8C42 50%, #FF4D8C 100%)`

### Colores Neutros
- Blanco cálido: `#FEFDF8`
- Crema: `#FFF8E7`
- Negro: `#1A1A1A`
- Morado oscuro: `#4A3A70`

### Tipografía
1. **Display/Headers:** Bebas Neue (títulos principales, CTAs)
2. **Headings:** Roboto Condensed (subtítulos, navegación)
3. **Body:** Roboto (párrafos, formularios)

### Sombras Neo-Brutales
```css
--shadow-sm: 2px 2px 0px #1A1A1A
--shadow-md: 4px 4px 0px #1A1A1A
--shadow-lg: 6px 6px 0px #1A1A1A
```

### Espaciado (Base 4px)
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px
- 2xl: 48px, 3xl: 64px, 4xl: 96px, 5xl: 128px

---

## 🗂️ Estructura del Proyecto

```
surf-festival/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   └── Section.astro
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── FormInput.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── SpriteIcon.tsx
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── About.astro
│   │       ├── Categories.astro
│   │       ├── Prizes.astro
│   │       ├── Activities.astro
│   │       ├── Gallery.astro
│   │       ├── Info.astro
│   │       ├── Sponsors.astro
│   │       ├── Registration.tsx
│   │       └── Contact.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── services/
│   │   ├── supabase.ts
│   │   └── registration.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── sprites.css
│   ├── utils/
│   │   ├── animations.ts
│   │   └── validation.ts
│   └── env.d.ts
├── public/
│   ├── logo.png
│   ├── assets-1.png (sprite de iconos surf)
│   ├── assets-2.png (sprite de iconos surf)
│   └── favicon.svg
└── [archivos de configuración]
```

---

## ✅ CHECKPOINT 0: Documentación y Setup Inicial

### Entregables
- [ ] Todas las dependencias instaladas
- [ ] `package.json` actualizado con nombre del proyecto
- [ ] Scripts npm funcionales

### Tareas
1. Instalar dependencias:
   ```bash
   npx astro add tailwind
   npx astro add react
   npm install framer-motion @supabase/supabase-js zod
   npm install @astrojs/sitemap
   ```
2. Actualizar `package.json`:
   ```json
   {
     "name": "san-mateo-longboard-festival",
     "description": "Landing page oficial del San Mateo Longboard Festival"
   }
   ```

### Validación
- ✅ `npm install` corre sin errores
- ✅ `npm run dev` inicia servidor correctamente

---

## ✅ CHECKPOINT 1: Design System Foundation

### Entregables
- [ ] `src/styles/globals.css` con variables CSS completas
- [ ] `tailwind.config.mjs` con tema custom
- [ ] `src/styles/sprites.css` con clases para todas las ilustraciones
- [ ] Google Fonts integradas
- [ ] `src/utils/animations.ts` con variantes de Framer Motion

### Tareas

#### 1.1 Crear globals.css
```css
/* Variables de color, tipografía, espaciado, sombras */
:root {
  /* Colores */
  --color-yellow: #FFD700;
  --color-orange: #FF8C42;
  --color-magenta: #FF4D8C;
  /* ... todas las demás variables del style guide ... */
}
```

#### 1.2 Configurar Tailwind
```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        yellow: '#FFD700',
        orange: '#FF8C42',
        // ... resto de colores ...
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        heading: ['Roboto Condensed', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      }
    }
  }
}
```

#### 1.3 Sistema de Sprites CSS
Crear `src/styles/sprites.css` con clases para cada ilustración:
```css
.sprite {
  display: inline-block;
  background-repeat: no-repeat;
}

/* Assets-1 */
.sprite-longboard-yellow {
  background-image: url('/assets-1.png');
  background-position: 0 0;
  width: 120px;
  height: 400px;
}

.sprite-wave-1 {
  background-image: url('/assets-1.png');
  background-position: -130px -50px;
  width: 200px;
  height: 80px;
}

/* ... definir TODAS las posiciones de sprites ... */
```

**Nota:** Necesitarás abrir assets-1.png y assets-2.png para obtener las coordenadas exactas de cada ilustración.

#### 1.4 Utilidades de Animación
```typescript
// src/utils/animations.ts
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05 }
};

// ... más variantes ...
```

### Validación
- ✅ Variables CSS accesibles en toda la app
- ✅ Clases de Tailwind funcionan
- ✅ Sprites se muestran correctamente
- ✅ Fuentes de Google cargadas

---

## ✅ CHECKPOINT 2: Layout y Navegación

### Entregables
- [ ] `src/layouts/Layout.astro` con SEO meta tags
- [ ] `src/components/layout/Navbar.astro` sticky responsive
- [ ] `src/components/layout/Footer.astro` completo
- [ ] `src/components/layout/Section.astro` wrapper

### Tareas

#### 2.1 Layout Principal
```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description: string;
  image?: string;
}
---
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="/src/styles/globals.css" />
    <link rel="stylesheet" href="/src/styles/sprites.css" />
  </head>
  <body>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

#### 2.2 Navbar
- Sticky al hacer scroll
- Menú hamburguesa en mobile (animado)
- Links a secciones con scroll suave
- Logo clicable

#### 2.3 Footer
- Info de contacto (Angelo Franco, WhatsApp, Email)
- Links a redes sociales
- Mapa del sitio
- Copyright

#### 2.4 Section Wrapper
```astro
---
// src/components/layout/Section.astro
interface Props {
  id?: string;
  class?: string;
  background?: 'white' | 'cream' | 'dark';
}

const { id, class: className, background = 'white' } = Astro.props;
---
<section
  id={id}
  class={`py-16 md:py-24 ${className}`}
  class:list={[
    { 'bg-white-warm': background === 'white' },
    { 'bg-cream': background === 'cream' },
    { 'bg-black': background === 'dark' }
  ]}
>
  <div class="container mx-auto px-4">
    <slot />
  </div>
</section>
```

### Validación
- ✅ Navegación funciona en mobile y desktop
- ✅ Scroll suave a secciones
- ✅ Menú mobile se anima correctamente
- ✅ Footer muestra toda la info

---

## ✅ CHECKPOINT 3: Sistema de Componentes UI

### Entregables
- [ ] Button.tsx (3 variantes + hover)
- [ ] Card.tsx con scroll reveal
- [ ] Badge.tsx
- [ ] SpriteIcon.tsx
- [ ] FormInput.tsx con validación
- [ ] Modal.tsx base

### Tareas

#### 3.1 Button Component
```tsx
// src/components/ui/Button.tsx
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-md font-heading font-bold uppercase transition-all';

  const variantClasses = {
    primary: 'bg-yellow text-black shadow-md hover:shadow-lg',
    secondary: 'bg-orange text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-black bg-transparent text-black hover:bg-black hover:text-white'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
```

#### 3.2 Card Component
```tsx
// src/components/ui/Card.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      className={`bg-cream rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

#### 3.3 SpriteIcon Component
```tsx
// src/components/ui/SpriteIcon.tsx
interface SpriteIconProps {
  sprite: string; // ej: 'longboard-yellow', 'wave-1'
  className?: string;
}

export default function SpriteIcon({ sprite, className = '' }: SpriteIconProps) {
  return <div className={`sprite sprite-${sprite} ${className}`} />;
}
```

#### 3.4 Badge Component
```tsx
// src/components/ui/Badge.tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const colors = {
    default: 'bg-purple text-white',
    success: 'bg-green-700 text-white',
    warning: 'bg-orange text-white'
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-heading ${colors[variant]}`}>
      {children}
    </span>
  );
}
```

#### 3.5 FormInput Component
```tsx
// src/components/ui/FormInput.tsx
interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-heading mb-2">
        {label} {required && <span className="text-magenta">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border-2 rounded-md ${
          error ? 'border-red-500' : 'border-black'
        } focus:outline-none focus:ring-2 focus:ring-yellow`}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
```

#### 3.6 Modal Base
```tsx
// src/components/ui/Modal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              {title && <h2 className="font-display text-3xl mb-4">{title}</h2>}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Validación
- ✅ Crear página de prueba `/test` con todos los componentes
- ✅ Verificar hover animations
- ✅ Verificar scroll reveal
- ✅ Verificar responsive

---

## ✅ CHECKPOINT 4: Hero Section + About

### Entregables
- [ ] Hero section impactante con animaciones
- [ ] About section con stats animadas
- [ ] Sprites decorativos con parallax

### Tareas

#### 4.1 Hero Section
```astro
---
// src/components/sections/Hero.astro
import Button from '../ui/Button.tsx';
---
<section class="relative h-screen flex items-center justify-center overflow-hidden">
  <!-- Background con efecto halftone -->
  <div class="absolute inset-0 bg-gradient-sunset opacity-20"></div>
  <img
    src="/docs/Gemini_Generated_Image_gkdwygkdwygkdwyg.png"
    alt="Background"
    class="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30"
  />

  <!-- Sprites decorativos flotantes -->
  <div class="sprite sprite-wave-1 absolute top-20 left-10 animate-float"></div>
  <div class="sprite sprite-longboard-yellow absolute bottom-32 right-20 animate-float-delayed"></div>

  <!-- Contenido principal -->
  <div class="relative z-10 text-center max-w-4xl px-4">
    <img src="/logo.png" alt="San Mateo Long Fest" class="w-48 mx-auto mb-8 animate-fade-in" />

    <h1 class="font-display text-6xl md:text-8xl mb-4 text-gradient-sunset">
      SAN MATEO<br />LONGBOARD FESTIVAL
    </h1>

    <p class="font-heading text-2xl md:text-3xl mb-2">III EDICIÓN</p>
    <p class="font-body text-xl mb-8">
      Diciembre 2025 • El Faro, San Mateo, Manabí, Ecuador
    </p>

    <Button variant="primary" client:load>
      INSCRÍBETE AHORA
    </Button>
  </div>
</section>
```

#### 4.2 About Section
```astro
---
// src/components/sections/About.astro
---
<Section id="about" background="cream">
  <div class="grid md:grid-cols-2 gap-12 items-center">
    <!-- Texto -->
    <div>
      <h2 class="font-display text-5xl mb-6">
        Más que una competencia,<br />una celebración del surf
      </h2>
      <p class="font-body text-lg mb-4">
        El San Mateo Longboard Festival es el encuentro más esperado de la comunidad surfera ecuatoriana.
        Tres días de competencia, música, gastronomía y cultura en una de las playas más emblemáticas de Manabí.
      </p>
      <p class="font-body text-lg">
        Competidores nacionales e internacionales, familias, riders principiantes y espectadores
        se reúnen para celebrar el arte del longboard y la vibrante cultura costeña.
      </p>
    </div>

    <!-- Stats animadas -->
    <div class="space-y-6">
      <div class="text-center bg-white p-6 rounded-xl shadow-md">
        <div class="font-display text-6xl text-yellow mb-2">III</div>
        <div class="font-heading text-xl">Edición</div>
      </div>
      <div class="text-center bg-white p-6 rounded-xl shadow-md">
        <div class="font-display text-6xl text-orange mb-2">5</div>
        <div class="font-heading text-xl">Categorías</div>
      </div>
      <div class="text-center bg-white p-6 rounded-xl shadow-md">
        <div class="font-display text-6xl text-magenta mb-2">3</div>
        <div class="font-heading text-xl">Noches de Música</div>
      </div>
    </div>
  </div>
</Section>
```

### Validación
- ✅ Hero impacta visualmente
- ✅ Logo se anima al cargar
- ✅ Sprites flotan con animación
- ✅ Stats se animan en scroll
- ✅ Responsive en mobile

---

## ✅ CHECKPOINT 5: Categorías

### Entregables
- [ ] CategoryCard component
- [ ] Categories section con 5 cards
- [ ] Stagger animation al scroll
- [ ] Contenido completo de categorías

### Tareas

#### 5.1 CategoryCard Component
```tsx
// src/components/ui/CategoryCard.tsx
import { motion } from 'framer-motion';
import Badge from './Badge.tsx';
import SpriteIcon from './SpriteIcon.tsx';

interface CategoryCardProps {
  title: string;
  description: string;
  ageRange: string;
  level: string;
  sprite: string;
  price: string;
}

export default function CategoryCard({
  title,
  description,
  ageRange,
  level,
  sprite,
  price
}: CategoryCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
      whileHover={{ y: -8, boxShadow: '6px 6px 0px #1A1A1A' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-center mb-4">
        <SpriteIcon sprite={sprite} />
      </div>

      <h3 className="font-display text-3xl text-center mb-2">{title}</h3>

      <div className="flex justify-center gap-2 mb-4">
        <Badge variant="default">{level}</Badge>
        <Badge variant="success">{ageRange}</Badge>
      </div>

      <p className="font-body text-center mb-4">{description}</p>

      <div className="text-center">
        <span className="font-heading text-2xl text-orange">{price}</span>
      </div>
    </motion.div>
  );
}
```

#### 5.2 Categories Section
```astro
---
// src/components/sections/Categories.astro
import CategoryCard from '../ui/CategoryCard.tsx';
---
<Section id="categories" background="white">
  <h2 class="font-display text-5xl text-center mb-4">Categorías</h2>
  <p class="font-body text-xl text-center mb-12 max-w-2xl mx-auto">
    Cinco categorías diseñadas para incluir a todos los niveles, géneros y edades.
    Inscríbete en la tuya y sé parte del festival.
  </p>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <CategoryCard
      title="Open Hombres"
      description="Nivel intermedio y profesional. La categoría más competitiva del festival."
      ageRange="18+ años"
      level="Pro/Inter"
      sprite="longboard-yellow"
      price="$10"
      client:load
    />

    <CategoryCard
      title="Open Mujeres"
      description="Riders experimentadas compitiendo al más alto nivel."
      ageRange="18+ años"
      level="Pro/Inter"
      sprite="longboard-orange"
      price="$10"
      client:load
    />

    <CategoryCard
      title="Mujeres Intermedio"
      description="Para riders en desarrollo que buscan mejorar su técnica."
      ageRange="16+ años"
      level="Intermedio"
      sprite="longboard-pink"
      price="$10"
      client:load
    />

    <CategoryCard
      title="Mujeres Principiante"
      description="Tu primera competencia oficial. Ambiente de apoyo y aprendizaje."
      ageRange="14+ años"
      level="Principiante"
      sprite="longboard-yellow"
      price="$10"
      client:load
    />

    <CategoryCard
      title="Niños"
      description="Categoría especial para los futuros campeones del longboard."
      ageRange="8-13 años"
      level="Todos"
      sprite="longboard-orange"
      price="$10"
      client:load
    />
  </div>

  <p class="text-center mt-8 font-body text-sm">
    * Categoría niños requiere autorización parental
  </p>
</Section>
```

### Validación
- ✅ Grid responsive (1 col mobile, 2 tablet, 3 desktop)
- ✅ Cards se animan una por una (stagger)
- ✅ Hover effect funciona
- ✅ Sprites de longboard visibles
- ✅ Badges muestran nivel y edad

---

## ✅ CHECKPOINT 6: Premios + Actividades

### Entregables
- [ ] Prizes section con bento grid
- [ ] Activities section con flip cards
- [ ] Animaciones scroll reveal

### Tareas

#### 6.1 Prizes Section
```astro
---
// src/components/sections/Prizes.astro
import Card from '../ui/Card.tsx';
---
<Section id="prizes" background="cream">
  <h2 class="font-display text-5xl text-center mb-4">Premios y Atractivos</h2>
  <p class="font-body text-xl text-center mb-12 max-w-2xl mx-auto">
    Compite por premios en efectivo y reconocimientos especiales.
    Riders nacionales e internacionales, música en vivo y mucho más.
  </p>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Premio Principal -->
    <Card className="lg:col-span-2 lg:row-span-2 bg-gradient-sunset text-white" client:load>
      <h3 class="font-display text-4xl mb-4">Premios en Efectivo</h3>
      <p class="font-body text-lg mb-4">
        Montos por confirmar para cada categoría.
        Los mejores riders se llevan premios en efectivo y productos de sponsors.
      </p>
      <div class="sprite sprite-trophy"></div>
    </Card>

    <!-- Premios Especiales -->
    <Card client:load>
      <h3 class="font-display text-2xl mb-2">Best Performance</h3>
      <p class="font-body">Reconocimiento a la mejor maniobra del festival</p>
    </Card>

    <Card client:load>
      <h3 class="font-display text-2xl mb-2">Best Style</h3>
      <p class="font-body">Premio al estilo más creativo</p>
    </Card>

    <Card client:load>
      <h3 class="font-display text-2xl mb-2">Photo of the Day</h3>
      <p class="font-body">Mejor foto capturada durante el evento</p>
    </Card>

    <Card className="lg:col-span-2" client:load>
      <h3 class="font-display text-3xl mb-2">Riders Internacionales</h3>
      <p class="font-body">Atletas de renombre participan y comparten su experiencia</p>
    </Card>

    <Card client:load>
      <h3 class="font-display text-3xl mb-2">3 Noches de Música</h3>
      <p class="font-body">Lineup por confirmar</p>
    </Card>
  </div>
</Section>
```

#### 6.2 Activities Section
```astro
---
// src/components/sections/Activities.astro
---
<Section id="activities" background="white">
  <h2 class="font-display text-5xl text-center mb-4">Actividades Paralelas</h2>
  <p class="font-body text-xl text-center mb-12 max-w-2xl mx-auto">
    El festival es mucho más que surf. Feria, gastronomía y actividades para toda la familia.
  </p>

  <div class="grid md:grid-cols-3 gap-8">
    <!-- Feria de Emprendimientos -->
    <div class="bg-cream rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
      <div class="sprite sprite-umbrella mx-auto mb-4"></div>
      <h3 class="font-display text-3xl text-center mb-4">Feria de Emprendimientos</h3>
      <ul class="font-body space-y-2">
        <li>✓ 30+ stands</li>
        <li>✓ Arte y artesanías locales</li>
        <li>✓ Moda surf y skate</li>
        <li>✓ Equipamiento deportivo</li>
        <li>✓ Productos naturales</li>
      </ul>
    </div>

    <!-- Concurso Gastronómico -->
    <div class="bg-cream rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
      <div class="sprite sprite-food mx-auto mb-4"></div>
      <h3 class="font-display text-3xl text-center mb-4">Concurso Gastronómico</h3>
      <p class="font-body mb-4">"Mejor Plato Típico de San Mateo"</p>
      <ul class="font-body space-y-2">
        <li>✓ Mariscos</li>
        <li>✓ Platos tradicionales</li>
        <li>✓ Bebidas</li>
        <li>✓ Postres</li>
        <li>✓ Jurado + voto público</li>
      </ul>
    </div>

    <!-- Zona Familiar -->
    <div class="bg-cream rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
      <div class="sprite sprite-palm-tree mx-auto mb-4"></div>
      <h3 class="font-display text-3xl text-center mb-4">Zona Familiar</h3>
      <ul class="font-body space-y-2">
        <li>✓ Clases de surf para niños</li>
        <li>✓ Yoga al amanecer</li>
        <li>✓ Pantalla gigante</li>
        <li>✓ Food trucks</li>
        <li>✓ Área de espectadores</li>
      </ul>
    </div>
  </div>
</Section>
```

### Validación
- ✅ Bento grid responsive
- ✅ Cards se animan al scroll
- ✅ Hover effects funcionan
- ✅ Contenido legible y completo

---

## ✅ CHECKPOINT 7: Galería + Info Práctica

### Entregables
- [ ] Gallery section con grid
- [ ] Info section con FAQs
- [ ] Lazy loading de imágenes

### Tareas

#### 7.1 Gallery Section
```astro
---
// src/components/sections/Gallery.astro
---
<Section id="gallery" background="cream">
  <h2 class="font-display text-5xl text-center mb-4">Galería</h2>
  <p class="font-body text-xl text-center mb-12">
    Revive los mejores momentos de ediciones anteriores
  </p>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Placeholders para fotos -->
    <div class="aspect-square bg-gray-300 rounded-lg overflow-hidden">
      <img src="/placeholder-gallery-1.jpg" alt="Gallery 1" loading="lazy" class="w-full h-full object-cover hover:scale-110 transition-transform" />
    </div>
    <!-- Repetir para 6-9 imágenes -->
  </div>
</Section>
```

#### 7.2 Info Section
```astro
---
// src/components/sections/Info.astro
---
<Section id="info" background="white">
  <h2 class="font-display text-5xl text-center mb-12">Información Práctica</h2>

  <div class="grid md:grid-cols-2 gap-12">
    <!-- Ubicación -->
    <div>
      <h3 class="font-display text-3xl mb-4">📍 Ubicación</h3>
      <p class="font-body mb-4">
        <strong>El Faro, San Mateo</strong><br />
        Manabí, Ecuador
      </p>
      <!-- Placeholder para mapa -->
      <div class="aspect-video bg-gray-300 rounded-lg"></div>
    </div>

    <!-- FAQs -->
    <div>
      <h3 class="font-display text-3xl mb-4">❓ Preguntas Frecuentes</h3>

      <details class="mb-4 bg-cream p-4 rounded-lg">
        <summary class="font-heading cursor-pointer">¿Cuánto cuesta la inscripción?</summary>
        <p class="font-body mt-2">$10 por categoría. Puedes inscribirte en múltiples categorías.</p>
      </details>

      <details class="mb-4 bg-cream p-4 rounded-lg">
        <summary class="font-heading cursor-pointer">¿Hay alojamiento disponible?</summary>
        <p class="font-body mt-2">San Mateo cuenta con hostales, hoteles y opciones de camping. Se recomienda reservar con anticipación.</p>
      </details>

      <details class="mb-4 bg-cream p-4 rounded-lg">
        <summary class="font-heading cursor-pointer">¿Necesito llevar mi propia tabla?</summary>
        <p class="font-body mt-2">Sí, los competidores deben traer su propio equipamiento. Hay stands con alquiler disponible.</p>
      </details>

      <details class="mb-4 bg-cream p-4 rounded-lg">
        <summary class="font-heading cursor-pointer">¿El evento es solo para competidores?</summary>
        <p class="font-body mt-2">¡No! El festival es abierto al público. Espectadores, familias y turistas son bienvenidos.</p>
      </details>
    </div>
  </div>
</Section>
```

### Validación
- ✅ Galería responsive
- ✅ FAQs expandibles
- ✅ Lazy loading funciona
- ✅ Contenido completo

---

## ✅ CHECKPOINT 8: Patrocinadores + Contacto

### Entregables
- [ ] Sponsors section con logo grid
- [ ] Contact section completa
- [ ] Links funcionales (WhatsApp, email)

### Tareas

#### 8.1 Sponsors Section
```astro
---
// src/components/sections/Sponsors.astro
---
<Section id="sponsors" background="cream">
  <h2 class="font-display text-5xl text-center mb-4">Patrocinadores</h2>
  <p class="font-body text-xl text-center mb-12">
    Gracias a nuestros sponsors por hacer posible este evento
  </p>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
    <!-- Placeholders para logos -->
    <div class="aspect-square bg-white rounded-lg flex items-center justify-center shadow-md hover:scale-105 transition-transform">
      <img src="/sponsor-1.png" alt="Sponsor 1" class="max-w-[80%] max-h-[80%]" />
    </div>
    <!-- Repetir para 8-12 sponsors -->
  </div>

  <div class="text-center mt-12">
    <p class="font-heading text-xl mb-4">¿Quieres ser sponsor?</p>
    <Button variant="outline" client:load>Contáctanos</Button>
  </div>
</Section>
```

#### 8.2 Contact Section
```astro
---
// src/components/sections/Contact.astro
---
<Section id="contact" background="white">
  <h2 class="font-display text-5xl text-center mb-12">Contacto</h2>

  <div class="max-w-2xl mx-auto text-center">
    <div class="bg-cream rounded-xl p-8 shadow-md mb-8">
      <h3 class="font-display text-3xl mb-4">Angelo Franco</h3>
      <p class="font-heading text-xl mb-6">Coordinador del Festival</p>

      <div class="space-y-4">
        <a
          href="https://wa.me/593969310187"
          target="_blank"
          class="block bg-green-600 text-white px-6 py-3 rounded-lg font-heading hover:bg-green-700 transition-colors"
        >
          📱 WhatsApp: +593 96 931 0187
        </a>

        <a
          href="mailto:sanmateolongfestival@gmail.com"
          class="block bg-orange text-white px-6 py-3 rounded-lg font-heading hover:bg-orange-dark transition-colors"
        >
          ✉️ sanmateolongfestival@gmail.com
        </a>
      </div>
    </div>

    <div class="flex justify-center gap-6">
      <!-- Redes sociales -->
      <a href="#" class="text-4xl hover:scale-110 transition-transform">📘</a>
      <a href="#" class="text-4xl hover:scale-110 transition-transform">📷</a>
      <a href="#" class="text-4xl hover:scale-110 transition-transform">🎵</a>
    </div>
  </div>
</Section>
```

### Validación
- ✅ Logos de sponsors visibles
- ✅ Links de WhatsApp y email funcionan
- ✅ Redes sociales clicables
- ✅ Responsive en mobile

---

## ✅ CHECKPOINT 9: Integración Supabase

### Entregables
- [ ] Proyecto Supabase creado
- [ ] Tabla `registrations` configurada
- [ ] Cliente Supabase en código
- [ ] Servicios y validaciones

### Tareas

#### 9.1 Setup Supabase
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

3. Crear `.env`:
```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

#### 9.2 Cliente Supabase
```typescript
// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 9.3 Schema de Validación
```typescript
// src/utils/validation.ts
import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Teléfono inválido'),
  category: z.enum([
    'Open Hombres',
    'Open Mujeres',
    'Mujeres Intermedio',
    'Mujeres Principiante',
    'Niños'
  ]),
  age: z.number().min(8).max(100)
});

export type RegistrationData = z.infer<typeof registrationSchema>;
```

#### 9.4 Servicios de Registro
```typescript
// src/services/registration.ts
import { supabase } from './supabase';
import { registrationSchema, type RegistrationData } from '../utils/validation';

export async function createRegistration(data: RegistrationData) {
  // Validar datos
  const validated = registrationSchema.parse(data);

  // Insertar en Supabase
  const { data: result, error } = await supabase
    .from('registrations')
    .insert([validated])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return result;
}

export async function checkEmailExists(email: string) {
  const { data, error } = await supabase
    .from('registrations')
    .select('email')
    .eq('email', email)
    .single();

  return !!data;
}
```

### Validación
- ✅ Conexión a Supabase exitosa
- ✅ Tabla `registrations` creada
- ✅ Servicios de CRUD funcionan
- ✅ Validación Zod funciona

---

## ✅ CHECKPOINT 10: Formulario de Inscripción

### Entregables
- [ ] Formulario modal completo
- [ ] Validación en tiempo real
- [ ] Submit a Supabase funcional
- [ ] Estados de loading/success/error
- [ ] Toast notifications

### Tareas

#### 10.1 Registration Component
```tsx
// src/components/sections/Registration.tsx
import { useState } from 'react';
import Modal from '../ui/Modal';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import { createRegistration, checkEmailExists } from '../../services/registration';
import { registrationSchema } from '../../utils/validation';

interface RegistrationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Registration({ isOpen, onClose }: RegistrationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    age: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validar con Zod
      const validated = registrationSchema.parse({
        ...formData,
        age: parseInt(formData.age)
      });

      // Verificar si el email ya existe
      const emailExists = await checkEmailExists(validated.email);
      if (emailExists) {
        setErrors({ email: 'Este email ya está registrado' });
        setLoading(false);
        return;
      }

      // Crear registro
      await createRegistration(validated);

      // Éxito
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '', category: '', age: '' });
      }, 2000);

    } catch (error: any) {
      if (error.errors) {
        // Errores de validación Zod
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: 'Error al procesar la inscripción. Intenta de nuevo.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Inscríbete al Festival">
      {success ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="font-display text-3xl text-green-600 mb-2">¡Inscripción Exitosa!</h3>
          <p className="font-body">Te esperamos en el festival</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Nombre Completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Juan Pérez"
            required
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="juan@example.com"
            required
          />

          <FormInput
            label="Teléfono"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="+593 99 999 9999"
            required
          />

          <div className="mb-4">
            <label htmlFor="category" className="block font-heading mb-2">
              Categoría <span className="text-magenta">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Open Hombres">Open Hombres</option>
              <option value="Open Mujeres">Open Mujeres</option>
              <option value="Mujeres Intermedio">Mujeres Intermedio</option>
              <option value="Mujeres Principiante">Mujeres Principiante</option>
              <option value="Niños">Niños (8-13 años)</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <FormInput
            label="Edad"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
            placeholder="25"
            required
          />

          {errors.general && (
            <div className="mb-4 p-4 bg-red-100 border border-red-500 rounded-md text-red-700">
              {errors.general}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" variant="primary" disabled={loading} className="flex-1">
              {loading ? 'Procesando...' : 'Inscribirme'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
          </div>

          <p className="text-sm font-body text-center mt-4">
            Costo: $10 por categoría
          </p>
        </form>
      )}
    </Modal>
  );
}
```

#### 10.2 Integrar en Hero
Agregar estado y handler en Hero.astro:
```tsx
const [showRegistration, setShowRegistration] = useState(false);

<Button variant="primary" onClick={() => setShowRegistration(true)}>
  INSCRÍBETE AHORA
</Button>

<Registration isOpen={showRegistration} onClose={() => setShowRegistration(false)} />
```

### Validación
- ✅ Modal se abre/cierra correctamente
- ✅ Validación en tiempo real funciona
- ✅ Submit guarda datos en Supabase
- ✅ Mensajes de error claros
- ✅ Estado de éxito se muestra
- ✅ Manejo de duplicados funciona

---

## ✅ CHECKPOINT 11: Sistema de Animaciones Completo

### Entregables
- [ ] Scroll animations en todas las secciones
- [ ] Hover effects refinados
- [ ] Sprites decorativos animados
- [ ] Respeto a `prefers-reduced-motion`
- [ ] Performance optimizada

### Tareas

#### 11.1 Ampliar animations.ts
```typescript
// src/utils/animations.ts
import { Variants } from 'framer-motion';

// Fade animations
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Stagger animation para grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Hover effects
export const hoverLift = {
  rest: { y: 0, boxShadow: '4px 4px 0px #1A1A1A' },
  hover: {
    y: -8,
    boxShadow: '6px 6px 0px #1A1A1A',
    transition: { duration: 0.2 }
  }
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

// Sprites decorativos
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const rotateFloat = {
  rotate: [0, 5, -5, 0],
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Parallax
export const parallaxVariants = (offset: number) => ({
  y: offset
});
```

#### 11.2 Agregar Animaciones Globales en CSS
```css
/* src/styles/globals.css */

/* Animaciones CSS para sprites decorativos */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

@keyframes rotate-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 4s ease-in-out infinite;
  animation-delay: 0.5s;
}

.animate-rotate-float {
  animation: rotate-float 5s ease-in-out infinite;
}

/* Respeto a prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .animate-float,
  .animate-float-delayed,
  .animate-rotate-float {
    animation: none;
  }
}

/* Performance optimization */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}
```

#### 11.3 Aplicar Animaciones en Secciones
Actualizar componentes existentes para usar `whileInView`:

```tsx
// Ejemplo en CategoryCard
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
>
  {/* contenido */}
</motion.div>
```

#### 11.4 Sprites Decorativos Animados
```astro
<!-- En Hero.astro -->
<motion.div
  className="sprite sprite-wave-1 absolute top-20 left-10"
  animate={floatAnimation}
  client:load
/>

<motion.div
  className="sprite sprite-longboard-yellow absolute bottom-32 right-20"
  animate={rotateFloat}
  client:load
/>
```

### Validación
- ✅ Todas las secciones se animan al scroll
- ✅ Stagger animation en grids
- ✅ Sprites flotan suavemente
- ✅ Hover effects fluidos
- ✅ `prefers-reduced-motion` respetado
- ✅ 60fps en animaciones

---

## ✅ CHECKPOINT 12: SEO y Metadata

### Entregables
- [ ] Meta tags completos
- [ ] Schema.org JSON-LD
- [ ] Sitemap generado
- [ ] robots.txt
- [ ] Canonical URLs

### Tareas

#### 12.1 Actualizar Layout.astro
```astro
---
// src/layouts/Layout.astro
interface Props {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const {
  title = 'San Mateo Longboard Festival - III Edición 2025',
  description = 'El festival de longboard más esperado de Ecuador. Compite en 5 categorías, disfruta música en vivo, feria de emprendimientos y gastronomía. El Faro, San Mateo, Manabí - Diciembre 2025.',
  image = '/og-image.jpg',
  type = 'website'
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site)} />
    <meta property="og:locale" content="es_EC" />
    <meta property="og:site_name" content="San Mateo Longboard Festival" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalURL} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={new URL(image, Astro.site)} />

    <!-- Keywords -->
    <meta name="keywords" content="longboard, surf, Ecuador, San Mateo, Manabí, competencia de surf, festival de surf, longboard Ecuador, surf costa Ecuador" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      "name": "San Mateo Longboard Festival - III Edición",
      "description": description,
      "startDate": "2025-12-TBD",
      "endDate": "2025-12-TBD",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "El Faro, San Mateo",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "San Mateo",
          "addressRegion": "Manabí",
          "addressCountry": "EC"
        }
      },
      "image": new URL(image, Astro.site),
      "organizer": {
        "@type": "Organization",
        "name": "San Mateo Longboard Festival",
        "url": Astro.site
      },
      "offers": {
        "@type": "Offer",
        "price": "10",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": canonicalURL
      }
    })} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

#### 12.2 Configurar Sitemap
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sanmateolongfest.com', // Cambiar por URL real
  integrations: [
    tailwind(),
    react(),
    sitemap()
  ]
});
```

#### 12.3 Crear robots.txt
```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://sanmateolongfest.com/sitemap-index.xml
```

#### 12.4 Crear OG Image
Crear una imagen de Open Graph 1200x630px con:
- Logo del festival
- Texto: "San Mateo Longboard Festival - III Edición 2025"
- Colores de la paleta
- Guardar como `public/og-image.jpg`

### Validación
- ✅ Meta tags visibles en view source
- ✅ OG preview correcto en Facebook/Twitter debuggers
- ✅ Schema.org válido en [Schema Markup Validator](https://validator.schema.org/)
- ✅ Sitemap generado en `/sitemap-index.xml`
- ✅ robots.txt accesible

---

## ✅ CHECKPOINT 13: Responsive Design

### Entregables
- [ ] Mobile-first implementation completa
- [ ] Navbar mobile con menú hamburguesa
- [ ] Grid adaptativo en todas las secciones
- [ ] Touch targets mínimo 44px
- [ ] Testing en múltiples dispositivos

### Tareas

#### 13.1 Navbar Mobile
```astro
---
// src/components/layout/Navbar.astro
---
<script>
  // Toggle menu mobile
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Cerrar menú al hacer click en link
  const menuLinks = document.querySelectorAll('#mobile-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });
</script>

<nav class="fixed top-0 w-full bg-white shadow-md z-50">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img src="/logo.png" alt="Long Fest" class="h-12" />
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-8">
        <a href="#about" class="font-heading hover:text-orange transition-colors">Sobre el Festival</a>
        <a href="#categories" class="font-heading hover:text-orange transition-colors">Categorías</a>
        <a href="#prizes" class="font-heading hover:text-orange transition-colors">Premios</a>
        <a href="#activities" class="font-heading hover:text-orange transition-colors">Actividades</a>
        <a href="#contact" class="font-heading hover:text-orange transition-colors">Contacto</a>
      </div>

      <!-- CTA Button -->
      <button class="hidden md:block bg-yellow text-black px-6 py-2 rounded-md font-heading font-bold shadow-sm hover:shadow-md transition-all">
        Inscríbete
      </button>

      <!-- Mobile Menu Toggle -->
      <button id="menu-toggle" class="md:hidden text-3xl">
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden pb-4">
      <a href="#about" class="block py-2 font-heading hover:text-orange transition-colors">Sobre el Festival</a>
      <a href="#categories" class="block py-2 font-heading hover:text-orange transition-colors">Categorías</a>
      <a href="#prizes" class="block py-2 font-heading hover:text-orange transition-colors">Premios</a>
      <a href="#activities" class="block py-2 font-heading hover:text-orange transition-colors">Actividades</a>
      <a href="#contact" class="block py-2 font-heading hover:text-orange transition-colors">Contacto</a>
      <button class="w-full bg-yellow text-black px-6 py-3 rounded-md font-heading font-bold shadow-md mt-4">
        Inscríbete
      </button>
    </div>
  </div>
</nav>
```

#### 13.2 Responsive Utilities en Tailwind
```javascript
// tailwind.config.mjs - Verificar breakpoints
export default {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape / Small tablets
      'md': '768px',   // Tablets
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px'  // Extra large
    }
  }
}
```

#### 13.3 Ajustes Responsive en Secciones

**Hero:**
```astro
<!-- Responsive text sizes -->
<h1 class="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
  SAN MATEO<br />LONGBOARD FESTIVAL
</h1>

<p class="font-body text-base sm:text-lg md:text-xl">
  Diciembre 2025 • El Faro, San Mateo
</p>
```

**Categories Grid:**
```astro
<!-- 1 col mobile, 2 tablet, 3 desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  <!-- Cards -->
</div>
```

**Section Padding:**
```astro
<!-- Responsive spacing -->
<section class="py-12 sm:py-16 md:py-20 lg:py-24">
  <!-- Content -->
</section>
```

#### 13.4 Touch Targets
```css
/* src/styles/globals.css */
/* Asegurar mínimo 44px para touch targets */
button,
a,
input,
select {
  min-height: 44px;
  min-width: 44px;
}

/* Para elementos más pequeños, aumentar padding */
.touch-target {
  padding: 12px;
}
```

#### 13.5 Testing Checklist
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1280px+)

**Verificar:**
- [ ] Texto legible sin zoom
- [ ] Imágenes no pixeladas
- [ ] Botones fáciles de clickear
- [ ] Formularios usables
- [ ] Navbar mobile funciona
- [ ] Sprites responsive (escalan correctamente)

### Validación
- ✅ Responsive en todos los breakpoints
- ✅ Menú mobile funcional
- ✅ Touch targets suficientemente grandes
- ✅ Sin scroll horizontal
- ✅ Imágenes optimizadas

---

## ✅ CHECKPOINT 14: Performance y Accesibilidad

### Entregables
- [ ] Optimización de imágenes
- [ ] Code splitting
- [ ] Lighthouse score >90
- [ ] Accesibilidad WCAG AA

### Tareas

#### 14.1 Optimización de Imágenes
```astro
---
// Usar Astro Image Optimization
import { Image } from 'astro:assets';
import heroImage from '../assets/hero-bg.png';
---

<!-- En lugar de <img> -->
<Image
  src={heroImage}
  alt="San Mateo Beach"
  width={1920}
  height={1080}
  format="webp"
  quality={80}
  loading="lazy"
/>
```

#### 14.2 Lazy Loading
```astro
<!-- Todas las imágenes fuera del viewport -->
<img src="/gallery-1.jpg" alt="Gallery" loading="lazy" />

<!-- Componentes React pesados -->
<HeavyComponent client:visible />
```

#### 14.3 Code Splitting
```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
    split: true
  }
});
```

#### 14.4 Preload Critical Assets
```astro
<!-- En Layout.astro <head> -->
<link rel="preload" href="/fonts/bebas-neue.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/logo.png" as="image" />
```

#### 14.5 Accesibilidad

**Focus States:**
```css
/* globals.css */
*:focus-visible {
  outline: 3px solid var(--color-yellow);
  outline-offset: 2px;
}

/* Skip to main content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-yellow);
  color: var(--color-black);
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

**ARIA Labels:**
```astro
<!-- Navbar -->
<nav aria-label="Navegación principal">
  <button
    id="menu-toggle"
    aria-label="Abrir menú"
    aria-expanded="false"
  >
    ☰
  </button>
</nav>

<!-- Form inputs -->
<input
  type="email"
  aria-required="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">{error}</span>
```

**Landmark Regions:**
```astro
<header role="banner">
  <nav role="navigation">...</nav>
</header>

<main role="main">
  <section aria-labelledby="about-heading">
    <h2 id="about-heading">Sobre el Festival</h2>
  </section>
</main>

<footer role="contentinfo">...</footer>
```

#### 14.6 Performance Checklist
- [ ] Comprimir imágenes (TinyPNG, Squoosh)
- [ ] Usar WebP con fallback
- [ ] Lazy load imágenes y componentes
- [ ] Minificar CSS/JS
- [ ] Preload fuentes críticas
- [ ] Remove unused CSS (PurgeCSS en Tailwind)
- [ ] Enable Gzip/Brotli compression

#### 14.7 Lighthouse Audit
```bash
# Correr Lighthouse
npm run build
npm run preview
# Abrir DevTools > Lighthouse > Generate report
```

**Metas:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: 100

### Validación
- ✅ Lighthouse Performance >90
- ✅ First Contentful Paint <1.5s
- ✅ Time to Interactive <3s
- ✅ Accesibilidad WCAG AA
- ✅ Sin errores de consola
- ✅ Keyboard navigation completa

---

## ✅ CHECKPOINT 15: Deploy y Documentación

### Entregables
- [ ] Build exitoso
- [ ] Deploy a Vercel/Netlify
- [ ] Variables de entorno configuradas
- [ ] README.md actualizado
- [ ] URL de producción funcional

### Tareas

#### 15.1 Build
```bash
npm run build

# Verificar output en dist/
# Verificar que no hay errores
```

#### 15.2 Deploy a Vercel

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel

# Seguir prompts:
# - Set up and deploy? Y
# - Which scope? (tu cuenta)
# - Link to existing project? N
# - Project name: san-mateo-longboard-festival
# - In which directory? ./
# - Override settings? N
```

3. **Configurar Variables de Entorno:**
```bash
vercel env add PUBLIC_SUPABASE_URL
vercel env add PUBLIC_SUPABASE_ANON_KEY
```

4. **Deploy a Producción:**
```bash
vercel --prod
```

#### 15.3 Deploy a Netlify (Alternativa)

1. **Instalar Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Deploy:**
```bash
netlify deploy

# Build command: npm run build
# Publish directory: dist
```

3. **Configurar Variables de Entorno:**
- Ir a Site settings > Environment variables
- Agregar `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy a Producción:**
```bash
netlify deploy --prod
```

#### 15.4 Actualizar README.md
```markdown
# San Mateo Longboard Festival - Landing Page

Landing page oficial del San Mateo Longboard Festival (III Edición 2025).

## 🚀 Tech Stack

- **Astro 5.15.3** - Framework principal
- **React** - Componentes interactivos
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **Supabase** - Base de datos
- **Zod** - Validación

## 📋 Características

- ✅ 100% Responsive (mobile, tablet, desktop)
- ✅ Sistema de sprites CSS para ilustraciones
- ✅ Animaciones scroll y hover con Framer Motion
- ✅ Formulario de inscripción con Supabase
- ✅ SEO optimizado con meta tags y Schema.org
- ✅ Accesibilidad WCAG AA
- ✅ Performance >90 en Lighthouse

## 🛠️ Instalación

1. Clonar repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/san-mateo-longfest.git
cd san-mateo-longfest
\`\`\`

2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configurar variables de entorno:
\`\`\`bash
cp .env.example .env
# Editar .env con tus credenciales de Supabase
\`\`\`

4. Iniciar servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

## 🗄️ Setup Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Crear tabla `registrations`:
\`\`\`sql
CREATE TABLE registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`
3. Copiar URL y Anon Key a `.env`

## 🎨 Sistema de Sprites

Los sprites están definidos en `src/styles/sprites.css`. Para agregar un nuevo sprite:

\`\`\`css
.sprite-nombre {
  background-image: url('/assets-1.png');
  background-position: -X -Y;
  width: Wpx;
  height: Hpx;
}
\`\`\`

Usar en componentes:
\`\`\`tsx
<SpriteIcon sprite="nombre" />
\`\`\`

## 📦 Build y Deploy

\`\`\`bash
# Build
npm run build

# Preview build
npm run preview

# Deploy a Vercel
vercel --prod

# Deploy a Netlify
netlify deploy --prod
\`\`\`

## 📱 Breakpoints

- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >1024px

## 🎯 Scripts

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## 📄 Licencia

© 2025 San Mateo Longboard Festival. Todos los derechos reservados.

## 📞 Contacto

**Angelo Franco** - Coordinador
WhatsApp: +593 96 931 0187
Email: sanmateolongfestival@gmail.com
\`\`\`

#### 15.5 Crear .env.example
```env
# .env.example
PUBLIC_SUPABASE_URL=your_supabase_url_here
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

#### 15.6 Post-Deploy Checklist
- [ ] URL accesible
- [ ] SSL certificado activo (HTTPS)
- [ ] Formulario de inscripción funciona
- [ ] Datos se guardan en Supabase
- [ ] Imágenes cargan correctamente
- [ ] Sprites CSS visibles
- [ ] Animaciones fluidas
- [ ] Meta tags correctas (verificar con Facebook Debugger)
- [ ] Performance >90 en Lighthouse (en producción)

### Validación
- ✅ Landing live en producción
- ✅ URL personalizada (si aplica)
- ✅ Variables de entorno configuradas
- ✅ README completo
- ✅ Todo funcional end-to-end

---

## 🎉 PROYECTO COMPLETO

---

## 📊 Resumen de Checkpoints

| # | Checkpoint | Estado |
|---|------------|--------|
| 0 | Documentación y Setup | ⬜ |
| 1 | Design System Foundation | ⬜ |
| 2 | Layout y Navegación | ⬜ |
| 3 | Sistema de Componentes UI | ⬜ |
| 4 | Hero + About | ⬜ |
| 5 | Categorías | ⬜ |
| 6 | Premios + Actividades | ⬜ |
| 7 | Galería + Info | ⬜ |
| 8 | Patrocinadores + Contacto | ⬜ |
| 9 | Integración Supabase | ⬜ |
| 10 | Formulario Inscripción | ⬜ |
| 11 | Animaciones Completas | ⬜ |
| 12 | SEO y Metadata | ⬜ |
| 13 | Responsive Design | ⬜ |
| 14 | Performance y A11y | ⬜ |
| 15 | Deploy y Docs | ⬜ |

---

## 🔄 Flujo de Trabajo por Checkpoint

1. **Leer checkpoint** y entender entregables
2. **Crear/editar archivos** necesarios
3. **Testing visual** en navegador
4. **Validación** según criterios
5. **Commit** cambios en git
6. **Marcar checkpoint como completado** ✅
7. **Continuar al siguiente**

---

## 🎯 Métricas de Éxito Final

### Funcionalidad
- ✅ 11 secciones implementadas
- ✅ Formulario de inscripción funcional
- ✅ Datos en Supabase

### UX/UI
- ✅ 100% responsive
- ✅ Sprites CSS funcionando
- ✅ Animaciones fluidas
- ✅ `prefers-reduced-motion` respetado

### Performance
- ✅ Lighthouse Performance >90
- ✅ FCP <1.5s
- ✅ TTI <3s

### Accesibilidad
- ✅ Lighthouse A11y >90
- ✅ WCAG AA
- ✅ Keyboard navigation

### SEO
- ✅ Meta tags completos
- ✅ Sitemap
- ✅ Schema.org

---

## 📝 Notas Importantes

### Prioridades
1. **Funcionalidad primero**, estética después
2. **Mobile-first** siempre
3. **Performance > animaciones** complejas
4. **Accesibilidad** no es opcional

### Sprites CSS
- Definir TODAS las posiciones antes de checkpoint 1
- Usar herramienta de medición (DevTools, Photoshop)
- Crear componente `SpriteIcon` reutilizable

### Animaciones
- Todas con `prefers-reduced-motion`
- Usar `will-change` con precaución
- Optimizar para 60fps

### Supabase
- RLS (Row Level Security) configurado
- Backup de datos importante
- Rate limiting si es necesario

---

## 🚨 Issues Comunes y Soluciones

### Sprites no se ven
- ✅ Verificar ruta en `background-image`
- ✅ Verificar coordenadas `background-position`
- ✅ Verificar width/height

### Animaciones lentas
- ✅ Reducir complejidad
- ✅ Usar `transform` y `opacity` (GPU-accelerated)
- ✅ Agregar `will-change`

### Formulario no guarda
- ✅ Verificar conexión Supabase
- ✅ Verificar variables de entorno
- ✅ Verificar schema de validación

### Build falla
- ✅ Verificar TypeScript errors
- ✅ Verificar imports
- ✅ Limpiar node_modules y reinstalar

---

## 📚 Recursos

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Supabase Docs](https://supabase.com/docs)
- [Zod Docs](https://zod.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**¡Buena suerte con el desarrollo! 🏄‍♂️🌊**
