import { Play, Info } from 'lucide-react';
import { Game } from '../types';
import { motion } from 'framer-motion';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  onPlay: () => void;
  isActive: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect, onPlay, isActive }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(game)}
      className={`relative h-96 min-w-[300px] rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 ${
        isActive ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-slate-950' : ''
      }`}
    >
      <img 
        src={game.imageUrl} 
        alt={game.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-60 mix-blend-multiply`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{game.title}</h3>
        <p className="text-sm text-slate-300 line-clamp-2 mb-4 font-medium leading-relaxed">
          {game.description}
        </p>
        
        <div className="flex gap-3 mt-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            className="flex-1 bg-white text-slate-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95"
          >
            <Play size={18} fill="currentColor" />
            ИГРАТЬ
          </button>
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
            <Info size={20} />
          </button>
        </div>
      </div>

      {isActive && (
        <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-lg">
          ВЫБРАНО
        </div>
      )}
    </motion.div>
  );
};

export default GameCard;
