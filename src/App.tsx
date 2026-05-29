import { useState } from 'react';
import { LayoutGrid, Server, Settings, Download } from 'lucide-react';

export default function App() {
  const [nickname, setNickname] = useState('Ivan_Ivanov');
  const [gamePath, setGamePath] = useState('C:\\Games\\GTA\\gta_sa.exe');
  const [progress, setProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePlay = () => {
    setIsUpdating(true);
    let cur = 0;
    const interval = setInterval(() => {
      cur += 5;
      if (cur >= 100) {
        clearInterval(interval);
        setIsUpdating(false);
        setProgress(0);
        if (window.electron) window.electron.launchGame(gamePath);
        else alert('Запуск!');
      }
      setProgress(cur);
    }, 50);
  };

  return (
    <div className="flex h-screen bg-[#050508] text-white overflow-hidden">
      <div className="w-64 bg-[#0a0a0f] border-r border-white/5 p-6 flex flex-col gap-8">
        <div className="text-2xl font-black italic">LERTOVS<span className="text-red-600">RP</span></div>
        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-red-600 rounded-xl cursor-pointer"><LayoutGrid size={20}/> Главная</div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-white/5 rounded-xl cursor-pointer"><Settings size={20}/> Настройки</div>
        </nav>
      </div>
      <div className="flex-1 p-10 bg-[radial-gradient(circle_at_50%_0%,#450a0a,transparent)]">
        <div className="flex justify-between items-center mb-10">
          <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Lertovs Launcher</div>
          <div className="flex items-center gap-3">
             <div className="text-right"><div className="font-bold">{nickname}</div><div className="text-xs text-slate-500">ID: 1548293</div></div>
             <div className="w-10 h-10 rounded-full bg-red-600"></div>
          </div>
        </div>
        <div className="max-w-2xl bg-white/5 border border-white/10 rounded-[3rem] p-10">
          <h2 className="text-5xl font-black italic uppercase mb-2">Москва #1</h2>
          <p className="text-slate-400 mb-8">452 / 1000 игроков онлайн</p>
          <button onClick={handlePlay} className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-red-600 hover:text-white transition-all transform active:scale-95">ИГРАТЬ</button>
        </div>
        
        {isUpdating && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-96 bg-black/80 border border-red-500/50 p-4 rounded-2xl backdrop-blur-xl">
             <div className="flex justify-between text-xs font-bold mb-2"><span>ЗАГРУЗКА...</span><span>{progress}%</span></div>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-red-600" style={{width: `${progress}%`}}></div></div>
          </div>
        )}
      </div>
    </div>
  );
}
