import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProfileBar from './components/ProfileBar';
import GameCard from './components/GameCard';
import ServerList from './components/ServerList';
import { GAMES } from './data';
import { Game } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, TrendingUp, User } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('games');
  const [selectedGame, setSelectedGame] = useState<Game>(GAMES[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [nickname, setNickname] = useState('Ivan_Ivanov');
  const [gamePath, setGamePath] = useState('C:\\Games\\LertovsRP\\gta_sa.exe');

  const handlePlay = async () => {
    if (isUpdating) return;
    
    // 1. Имитируем проверку файлов перед запуском
    setIsUpdating(true);
    let cur = 0;
    const interval = setInterval(() => {
      cur += Math.random() * 10;
      if (cur >= 100) {
        cur = 100;
        clearInterval(interval);
        
        // 2. Когда "проверка" окончена, вызываем запуск через Electron
        setTimeout(async () => {
          setIsUpdating(false);
          setProgress(0);
          
          if (window.electron) {
            const result = await window.electron.launchGame(gamePath);
            if (!result.success) {
              alert('Ошибка запуска: ' + result.message);
            }
          } else {
            // Если открыто в браузере, а не в .exe
            alert('Игра запускается! (В браузере запуск EXE невозможен, используйте собранную версию)');
          }
        }, 800);
      }
      setProgress(cur);
    }, 50);
  };

  return (
    <div className="flex h-screen w-full bg-[#050508] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b,transparent)]">
        <ProfileBar nickname={nickname} />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {activeTab === 'games' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Featured Section */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <LayoutGrid className="text-indigo-500" size={24} />
                  <h2 className="text-2xl font-black uppercase tracking-tight">Проект МОСКВА</h2>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                  {GAMES.map((game) => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onSelect={setSelectedGame}
                      onPlay={handlePlay}
                      isActive={selectedGame.id === game.id}
                    />
                  ))}
                </div>
              </section>

              {/* Servers of selected game */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-indigo-500" size={24} />
                    <h2 className="text-2xl font-black uppercase tracking-tight">Миры {selectedGame.title}</h2>
                  </div>
                </div>
                <ServerList servers={selectedGame.servers} />
              </section>

              {/* Events Section */}
              <section>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-1 h-8 bg-red-600 rounded-full" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic">События в Москве</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Грандиозное открытие "Москва-Сити"',
                      desc: 'Новые небоскребы, офисы и пентхаусы уже доступны для покупки.',
                      date: 'СЕГОДНЯ',
                      tag: 'ОБНОВЛЕНИЕ',
                      image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=800'
                    },
                    {
                      title: 'Рейд на центральный рынок',
                      desc: 'МВД провело масштабную операцию по пресечению незаконной торговли.',
                      date: '2 ЧАСА НАЗАД',
                      tag: 'ПРОИСШЕСТВИЕ',
                      image: 'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=800'
                    },
                    {
                      title: 'Новая партия Mercedes G63 AMG',
                      desc: 'В автосалоны столицы завезли лимитированную серию легендарных внедорожников.',
                      date: 'ВЧЕРА',
                      tag: 'АВТОДИЛЕР',
                      image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800'
                    }
                  ].map((event, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -8 }}
                      className="flex flex-col bg-[#0f0f13] border border-white/5 rounded-[2rem] overflow-hidden group cursor-pointer"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img src={event.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 shadow-2xl" alt="" />
                        <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                          {event.tag}
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-500">{event.date}</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600/30" />
                          </div>
                        </div>
                        <h4 className="text-xl font-black text-white leading-tight group-hover:text-red-500 transition-colors">{event.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                          {event.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Настройки</h2>
                <p className="text-slate-400">Управление вашим игровым профилем и лаунчером</p>
              </div>

              <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Игровой никнейм</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      value={nickname}
                      onChange={(e) => {
                        const val = e.target.value;
                        // Можно добавить логику авто-форматирования, но оставим свободный ввод с примером
                        setNickname(val);
                      }}
                      placeholder="Пример: Ivan_Ivanov" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 ml-1 italic">Формат: Имя_Фамилия (например, <span className="text-red-500 font-bold">Ggg_Ggg</span>)</p>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Путь к игре (gta_sa.exe)</label>
                  <input 
                    type="text" 
                    value={gamePath}
                    onChange={(e) => setGamePath(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95">
                    Сохранить настройки
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'servers' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Список серверов</h2>
                <p className="text-slate-400">Выберите подходящий мир для начала игры</p>
              </div>
              <ServerList servers={selectedGame.servers} />
            </motion.div>
          )}

          {activeTab !== 'games' && activeTab !== 'settings' && activeTab !== 'servers' && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <LayoutGrid size={32} />
              </div>
              <p className="font-medium text-lg">Раздел "{activeTab}" находится в разработке</p>
              <button 
                onClick={() => setActiveTab('games')}
                className="text-indigo-400 hover:underline font-bold"
              >
                Вернуться на главную
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Download Status Overlay (Fixed at bottom) */}
      <AnimatePresence>
        {isUpdating && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-2xl bg-indigo-950/40 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl p-4 shadow-2xl flex items-center gap-6 z-50 pointer-events-none"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-black text-white uppercase tracking-tight">
                  {progress < 100 ? `Загрузка ассетов: ${selectedGame.title}` : 'Готово к запуску'}
                </span>
                <span className="text-sm font-mono font-bold text-indigo-400">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="hidden sm:block text-right shrink-0">
              <div className="text-xs font-bold text-slate-400 uppercase">Скорость</div>
              <div className="text-sm font-mono text-white">{(Math.random() * 20 + 5).toFixed(1)} MB/s</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
}

export default App;
