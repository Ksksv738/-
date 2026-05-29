import { Server as ServerType } from '../types';
import { Users, Signal, ChevronRight } from 'lucide-react';

interface ServerListProps {
  servers: ServerType[];
}

const ServerList: React.FC<ServerListProps> = ({ servers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {servers.map((server) => {
        const percentage = (server.players / server.maxPlayers) * 100;
        
        return (
          <div 
            key={server.id} 
            className="bg-slate-800/40 border border-white/5 rounded-2xl p-5 hover:bg-slate-800/60 hover:border-indigo-500/30 transition-all group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{server.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">{server.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Signal size={14} className={server.ping < 50 ? 'text-emerald-400' : 'text-amber-400'} />
                <span className="text-xs font-mono">{server.ping}ms</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Users size={14} className="text-indigo-400" />
                  <span>Игроков онлайн</span>
                </div>
                <span className="text-white">{server.players} / {server.maxPlayers}</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 p-[1px]">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all">
              ПОДКЛЮЧИТЬСЯ
              <ChevronRight size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ServerList;
