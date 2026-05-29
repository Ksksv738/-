interface ProfileBarProps {
  nickname: string;
}

const ProfileBar: React.FC<ProfileBarProps> = ({ nickname }) => {
  return (
    <div className="h-20 w-full flex items-center justify-between px-8 bg-slate-900/30 backdrop-blur-sm border-b border-white/5">
      <div className="flex-1">
        <h1 className="text-lg font-bold text-white/20 uppercase tracking-[0.2em] font-black italic">Lertovs Launcher</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-white leading-none">{nickname}</div>
            <div className="text-xs text-slate-400 mt-1">ID: 1548293</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`}
              alt="Avatar" 
              className="w-full h-full rounded-full bg-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
