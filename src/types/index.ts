
export interface Server {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  ping: number;
  status: 'online' | 'offline' | 'maintenance';
}

export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  servers: Server[];
  color: string;
}
