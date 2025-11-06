import { motion } from 'framer-motion';
import Badge from './Badge';
import { fadeInUp } from '../../utils/animations';

interface CategoryCardProps {
  title: string;
  description: string;
  ageRange: string;
  level: string;
  image: string;
  price: string;
  accentColor?: 'yellow' | 'orange' | 'pink';
}

export default function CategoryCard({
  title,
  description,
  ageRange,
  level,
  image,
  price,
  accentColor = 'yellow'
}: CategoryCardProps) {
  const accentColors = {
    yellow: 'bg-yellow',
    orange: 'bg-orange',
    pink: 'bg-pink'
  };

  return (
    <motion.div
      className="bg-white-warm rounded-xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all overflow-hidden flex flex-col h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      whileHover={{ y: -8 }}
    >
      {/* Ilustración prominente - Parte superior - Altura fija para alineación */}
      <div className={`${accentColors[accentColor]} px-6 py-8 md:px-8 md:py-10 lg:px-6 lg:py-8 xl:px-8 xl:py-10 flex items-center justify-center h-[200px] md:h-[220px] lg:h-[200px] xl:h-[220px] relative overflow-hidden`}>
        <img 
          src={image} 
          alt="" 
          className="w-full max-w-[140px] md:max-w-[160px] lg:max-w-[140px] xl:max-w-[160px] h-auto object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]" 
          aria-hidden="true"
          loading="lazy"
        />
        {/* Badge flotante en la esquina */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4">
          <Badge variant="secondary" className="text-xs">
            {level}
          </Badge>
        </div>
      </div>

      {/* Contenido - Parte inferior */}
      <div className="px-5 py-6 md:px-6 md:py-7 lg:px-5 lg:py-6 xl:px-6 xl:py-7 flex flex-col flex-grow">
        <h3 className="font-display text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-center mb-4 md:mb-5 text-black uppercase leading-tight tracking-tight">
          {title}
        </h3>

        <div className="flex justify-center mb-5 md:mb-6">
          <Badge variant="success" className="text-xs md:text-sm">
            {ageRange}
          </Badge>
        </div>

        <p className="font-body text-center mb-6 md:mb-7 text-dark text-xs md:text-sm leading-relaxed flex-grow">
          {description}
        </p>

        <div className="text-center pt-5 md:pt-6 border-t-2 border-black/20">
          <span className="font-heading text-xl md:text-2xl lg:text-xl xl:text-2xl text-black font-bold">
            {price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

