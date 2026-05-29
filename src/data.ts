import { Game } from './types';

export const GAMES: Game[] = [
  {
    id: 'moscow',
    title: 'МОСКВА',
    description: 'Лучшая симуляция жизни в столице. Окунись в ритм мегаполиса, строй карьеру и властвуй.',
    imageUrl: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1000&auto=format&fit=crop',
    color: 'from-red-600 to-slate-900',
    servers: [
      { id: 'm1', name: 'Москва #1', players: 452, maxPlayers: 1000, ping: 18, status: 'online' }
    ]
  }
];
