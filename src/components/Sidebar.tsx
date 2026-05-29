import { LayoutGrid, Server, Download, Settings, Bell, Shield } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'games', icon: LayoutGrid, label: 'Игры' },
    { id: 'servers', icon: Server, label: 'Сервера' },
    { id: 'downloads', icon: Download, label: 'Загрузки' },
    { id: 'security', icon: Shield, label: 'Безопасность' },
    { id: 'settings', icon: Settings, label: 'Настройки' },
  ];

  return (
    <div className="w-20 lg:w-64 h-full bg-[#0a0a0f]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col p-4">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-900 rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-red-500/20 transform -rotate-3">
          LR
        </div>
        <span className="hidden lg:block font-black text-2xl tracking-tighter text-white uppercase italic">
          Lertovs<span className="text-red-600">RP</span>
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={24} className={isActive ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <button className="w-full flex items-center gap-4 p-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
          <Bell size={24} />
          <span className="hidden lg:block font-medium">Уведомления</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
