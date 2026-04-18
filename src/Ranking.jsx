import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Briefcase, 
  RefreshCw, 
  Activity, 
  Trophy, 
  User, 
  Plus, 
  Search, 
  Bell,
  X,
  LogOut
} from 'lucide-react';

// --- MAIN APP COMPONENT ---
const NeoCityHub = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('RANKINGS');

  // Global CSS for the Cyberpunk theme
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
    .cyber-font { font-family: 'Rajdhani', sans-serif; }
    .cyber-bg {
      background-color: #0a0c10;
      background-image: linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px);
      background-size: 30px 30px;
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #30363d; border-radius: 10px; }
    .neon-text { text-shadow: 0 0 10px rgba(0, 212, 255, 0.5); }
  `;

  return (
    <div className="cyber-font cyber-bg flex h-screen text-slate-300 overflow-hidden">
      <style>{globalStyles}</style>

      {/* SHARED SIDEBAR */}
      <aside className="w-64 border-r border-[#30363d] bg-[#0a0c10] flex flex-col p-6 z-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#00d4ff]">
            <div className="w-6 h-6 bg-[#00d4ff] [clip-path:polygon(13%_2%,3%_14%,12%_14%,11%_22%,21%_10%,12%_10%,13%_2%)]" />
            <h1 className="font-bold text-xl leading-none tracking-tighter uppercase">Neo JSR</h1>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 tracking-widest uppercase">City Hub v2.4</p>
        </div>

        <nav className="space-y-1 flex-1">
          <SidebarLink 
            icon={<LayoutGrid size={18}/>} 
            label="COMMAND" 
            active={activePage === 'COMMAND'} 
            onClick={() => navigate('/')} 
          />
          <SidebarLink 
            icon={<Briefcase size={18}/>} 
            label="EMPLOYMENT" 
            active={activePage === 'EMPLOYMENT'} 
            onClick={() => navigate('/employment')} 
          />
          <SidebarLink 
            icon={<RefreshCw size={18}/>} 
            label="EXCHANGE" 
            active={activePage === 'EXCHANGE'} 
            onClick={() => navigate('/exchange')} 
          />
          <SidebarLink 
            icon={<Activity size={18}/>} 
            label="THE PULSE" 
            active={activePage === 'PULSE'} 
            onClick={() => navigate('/thepulse')} 
          />
          <SidebarLink 
            icon={<Trophy size={18}/>} 
            label="RANKINGS" 
            active={activePage === 'RANKINGS'} 
            onClick={() => navigate('/ranking')} 
          />
          <SidebarLink 
            icon={<User size={18}/>} 
            label="IDENTITY" 
            active={activePage === 'IDENTITY'} 
            onClick={() => navigate('/identity')} 
          />
        </nav>

        <div className="pt-4 border-t border-[#30363d] text-[10px] text-slate-600">
           <p className="uppercase tracking-widest flex items-center gap-2"><LogOut size={12}/> Disconnect</p>
        </div>
      </aside>

      {/* DYNAMIC CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Shared Top Navbar */}
        <div className="h-14 border-b border-[#30363d] flex items-center justify-between px-8 bg-black/20">
          <span className="text-[10px] text-slate-600 tracking-[0.2em] uppercase">Neo-Jamshedpur Unified City Platform</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="text-[10px] font-bold text-green-500">ONLINE</span>
          </div>
        </div>

        {/* Page Switcher Logic */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activePage === 'EXCHANGE' && <ExchangePage />}
          {activePage === 'RANKINGS' && <RankingsPage />}
          {['COMMAND', 'EMPLOYMENT', 'PULSE', 'IDENTITY'].includes(activePage) && (
            <div className="flex items-center justify-center h-full text-slate-600 italic">
              Sector [ {activePage} ] currently under maintenance...
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- EXCHANGE PAGE COMPONENT ---
const ExchangePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([
    { id: 1, title: "Rare Isotope Fuel Cell", category: "Energy", seeking: "Medical nanobots", rep: 100 },
    { id: 2, title: "Encryption Module v7.3", category: "Technology", seeking: "Biometric scanner", rep: 100 }
  ]);

  return (
    <div className="p-10">
      <header className="flex justify-between items-end mb-10">
        <div>
          <p className="text-[10px] text-[#00d4ff] tracking-[0.3em] uppercase mb-1 font-bold">Resource Exchange</p>
          <h2 className="text-4xl font-bold text-white uppercase italic neon-text">Trade Market</h2>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#00d4ff] text-black font-black px-6 py-2.5 flex items-center gap-2 hover:shadow-[0_0_15px_#00d4ff]">
          <Plus size={20}/> LIST ITEM
        </button>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {listings.map(item => (
          <div key={item.id} className="bg-[#161b22]/40 border border-[#30363d] p-6 border-l-2 border-l-[#00d4ff]">
            <h3 className="font-bold text-lg text-white">{item.title}</h3>
            <p className="text-xs text-[#00d4ff] mt-2">Seeking: {item.seeking}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- RANKINGS PAGE COMPONENT ---
const RankingsPage = () => {
  const users = [
    { name: "Director Steele", sector: "Power Grid", rep: 100, rank: 1 },
    { name: "Kaito Ryu", sector: "Tech Quarter", rep: 100, rank: 2 },
    { name: "prakhar", sector: "Tech Quarter", rep: 100, rank: 5, isUser: true }
  ];

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h2 className="text-5xl font-black text-white uppercase italic neon-text">Leaderboard</h2>
        <p className="text-xs text-slate-500 mt-2 tracking-widest uppercase">Top Citizens by Reputation</p>
      </header>
      <div className="space-y-4">
        {users.map((u, i) => (
          <div key={i} className={`flex items-center p-4 bg-[#161b22]/40 border ${u.isUser ? 'border-[#00d4ff]' : 'border-[#30363d]'}`}>
             <div className="w-10 text-xl font-bold">{u.rank}</div>
             <div className="flex-1">
                <p className="font-bold">{u.name}</p>
                <p className="text-[10px] text-slate-500 uppercase">{u.sector}</p>
             </div>
             <div className="text-right">
                <p className="text-[8px] uppercase text-slate-500">Reputation</p>
                <p className="text-xl font-black text-white">{u.rep}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---
const SidebarLink = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-3 cursor-pointer transition-all border-r-2 ${active ? 'bg-[#00d4ff]/5 text-[#00d4ff] border-[#00d4ff]' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
  >
    {icon}
    <p className="text-[10px] font-bold tracking-widest uppercase">{label}</p>
  </div>
);

export default NeoCityHub;