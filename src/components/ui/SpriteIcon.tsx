interface SpriteIconProps {
  sprite: string;
  className?: string;
}

export default function SpriteIcon({ sprite, className = '' }: SpriteIconProps) {
  return <div className={`sprite sprite-${sprite} ${className}`} aria-hidden="true" />;
}

