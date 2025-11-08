# Componente Card - Guía de Uso

## Problema Identificado

Las cards con sombras se estaban escribiendo manualmente en múltiples lugares con clases repetitivas como:
```html
class="bg-white-warm border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-6 md:p-8"
```

## Solución

Se han creado dos componentes reutilizables que usan las sombras del sistema de diseño configuradas en Tailwind:

1. **Card.tsx** - Para componentes React
2. **Card.astro** - Para componentes Astro

## Uso del Componente Card.astro

### Ejemplo Básico
```astro
---
import Card from '../components/ui/Card.astro';
---

<Card>
  <h2>Contenido de la card</h2>
  <p>Texto descriptivo</p>
</Card>
```

### Con Props Personalizadas
```astro
---
import Card from '../components/ui/Card.astro';
---

<Card 
  shadow="xl"
  borderWidth="4"
  padding="xl"
  bgColor="bg-yellow"
  hover={true}
>
  <h2>Card destacada</h2>
</Card>
```

### Como Enlace
```astro
---
import Card from '../components/ui/Card.astro';
---

<Card 
  tag="a"
  href="/ruta"
  shadow="lg"
>
  <h2>Card clickeable</h2>
</Card>
```

## Props Disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `shadow` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Tamaño de la sombra |
| `borderWidth` | `'2' \| '3' \| '4'` | `'3'` | Grosor del borde |
| `padding` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Padding interno |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'xl'` | Border radius |
| `bgColor` | `string` | `'bg-white-warm'` | Color de fondo |
| `hover` | `boolean` | `true` | Activar efecto hover |
| `className` | `string` | `''` | Clases adicionales |
| `tag` | `'div' \| 'section' \| 'article' \| 'a'` | `'div'` | Tag HTML a usar |
| `href` | `string` | - | URL si tag es 'a' |

## Ejemplos de Migración

### Antes (Código repetitivo)
```astro
<div class="bg-white-warm border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-6 md:p-8 rounded-lg">
  Contenido
</div>
```

### Después (Usando componente)
```astro
<Card 
  shadow="xl"
  borderWidth="4"
  padding="lg"
  rounded="lg"
>
  Contenido
</Card>
```

## Ventajas

1. **Consistencia**: Todas las cards usan el mismo sistema de sombras
2. **Mantenibilidad**: Cambios en un solo lugar
3. **Legibilidad**: Código más limpio y fácil de entender
4. **Type-safe**: Props tipadas con TypeScript
5. **Reutilizable**: Fácil de usar en cualquier parte

## Notas

- Las sombras están configuradas en `tailwind.config.mjs` usando las variables CSS de `globals.css`
- El componente usa las clases de Tailwind (`shadow-lg`, `shadow-xl`, etc.) que están mapeadas a las sombras del sistema de diseño
- El efecto hover es opcional y puede desactivarse con `hover={false}`

