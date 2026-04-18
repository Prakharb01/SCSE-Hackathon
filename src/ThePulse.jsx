import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, RefreshCw, Activity, 
  Trophy, User, LogOut, Radio, Search, 
  Bell, Zap, AlertTriangle, X, Eye, Heart, MessageSquare
} from 'lucide-react';

const ThePulse = () => {
  const navigate = useNavigate();
  // --- STATE FOR CITY FEED ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedItems, setFeedItems] = useState([
    {
      id: 1,
      type: "SOCIAL",
      sector: "Steel District",
      title: "Steel District Black Market Rumors - City Watch Responds",
      content: "Following recent reports of an unlicensed trading hub operating beneath the old foundry, City Watch spokesperson confirmed three arrests and seizure of contraband tech valued at 45,000 credits. Citizens are reminded that all trades must be registered through the Resource Exchange.",
      author: "Director Steele",
      date: "4/18/2026",
      views: 0,
      likes: 0
    },
    {
      id: 2,
      type: "OFFICIAL",
      sector: "Tech Quarter",
      title: "Neural Interface Project Reaches Phase 3 Trials",
      content: "The city tech council has announced that the Neural Interface Integration project has successfully completed Phase 2 trials with a 94.7% success rate. Phase 3 will begin next month, opening 200 voluntary participant slots.",
      author: "Director Steele",
      date: "4/18/2026",
      views: 0,
      likes: 0
    },
    {
      id: 3,
      type: "ALERT",
      sector: "Power Grid",
      title: "CRITICAL: Blackout Warning - Sectors 5-9 Tonight",
      content: "City Engineering has issued a priority blackout warning for Sectors 5 through 9 from 23:00 to 03:00. Emergency power only. Residents advised to charge all devices, secure perishables, and avoid travel after 22:30.",
      author: "Director Steele",
      date: "4/18/2026",
      views: 0,
      likes: 0
    }
  ]);

  const [formData, setFormData] = useState({ title: '', content: '', sector: 'Tech Quarter', type: 'SOCIAL' });

  const handleBroadcast = (e) => {
    e.preventDefault();
    const newPulse = {
      ...formData,
      id: Date.now(),
      author: "prakhar",
      date: "4/18/2026",
      views: 0,
      likes: 0
    };
    setFeedItems([newPulse, ...feedItems]);
    setIsModalOpen(false);
    setFormData({ title: '', content: '', sector: 'Tech Quarter', type: 'SOCIAL' });
  };

  const alertCount = feedItems.filter(item => item.type === 'ALERT').length;
  const latestAlert = feedItems.find(item => item.type === 'ALERT');
  const alertMessage = alertCount > 0 ? latestAlert?.title || 'A critical alert is active.' : 'No active critical alerts at the moment.';

  return (
    <div className="flex min-h-screen bg-[#02080a] text-[#00e5ff] font-mono selection:bg-cyan-500/30 overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-cyan-900/40 bg-[#030c0f] flex flex-col p-4 z-20">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Zap className="text-cyan-400 w-6 h-6 fill-cyan-400/20" />
          <h1 className="text-lg font-bold tracking-tighter uppercase leading-none">
            Neo<br/><span className="text-white">Jamshedpur</span>
            <div className="text-[10px] text-cyan-700 tracking-widest mt-1">CITY HUB v2.4</div>
          </h1>
        </div>

        <div className="flex items-center gap-3 p-3 bg-cyan-950/20 rounded border border-cyan-900/30 mb-6">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">P</div>
          <div className="flex-1">
            <div className="text-xs font-bold text-white leading-tight">prakhar</div>
            <div className="text-[9px] text-cyan-400 opacity-70 italic tracking-tighter">100 REP</div>
          </div>
          <span className="text-[8px] border border-cyan-500/50 px-1 text-cyan-400 bg-cyan-500/10 uppercase">Citizen</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="COMMAND" sub="Dashboard" onClick={() => navigate('/')} />
          <NavItem icon={<Briefcase size={18} />} label="EMPLOYMENT" sub="Grid" onClick={() => navigate('/employment')} />
          <NavItem icon={<RefreshCw size={18} />} label="EXCHANGE" sub="Market" onClick={() => navigate('/exchange')} />
          <NavItem icon={<Activity size={18} />} label="THE PULSE" sub="City Feed" active onClick={() => navigate('/thepulse')} />
          <NavItem icon={<Trophy size={18} />} label="RANKINGS" sub="Leaderboard" onClick={() => navigate('/ranking')} />
          <NavItem icon={<User size={18} />} label="IDENTITY" sub="Profile" onClick={() => navigate('/identity')} />
        </nav>

        <div className="mt-auto pt-4 border-t border-cyan-900/20">
          <button className="flex items-center gap-2 text-[10px] opacity-50 hover:opacity-100 transition-all p-2 uppercase tracking-widest">
            <LogOut size={14} /> Disconnect
          </button>
          <div className="text-[9px] opacity-30 px-2 mt-2 uppercase tracking-widest">Sector: Tech Quarter</div>
        </div>
      </aside>

      {/* Main View */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#02080a]">
        
        {/* Top Header Bar */}
        <div className="border-b border-cyan-900/30 p-3 px-8 flex justify-between items-center text-[10px] tracking-widest text-cyan-500/60 z-10">
          <span>NEO-JAMSHEDPUR UNIFIED CITY PLATFORM</span>
          <div className="flex gap-6 items-center">
            <Bell size={14} className="cursor-pointer hover:text-cyan-400" />
            <span className="flex items-center gap-2 text-green-500 font-bold italic">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" /> ONLINE
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            
            {/* Page Title & Broadcast Button */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="text-[10px] tracking-[0.3em] text-cyan-500 opacity-60 uppercase mb-1">City Broadcast</div>
                <div className="flex items-center gap-3">
                    <Activity className="text-cyan-400" />
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">The Pulse</h2>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#00e5ff] text-black px-6 py-2 font-bold text-xs flex items-center gap-2 hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all uppercase tracking-widest"
              >
                 Broadcast
              </button>
            </div>

            {/* Critical Alert Banner */}
            <div className={`${alertCount > 0 ? 'bg-red-950/10 border-red-900/50 text-red-200 animate-pulse' : 'bg-cyan-950/10 border-cyan-900/30 text-cyan-300'} border p-4 mb-8 flex items-start gap-4`}>
              <AlertTriangle className={`${alertCount > 0 ? 'text-red-500' : 'text-cyan-400'} shrink-0`} size={18} />
              <div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${alertCount > 0 ? 'text-red-500' : 'text-cyan-400'}`}>
                  {alertCount > 0 ? `Critical City Alerts Active (${alertCount})` : 'No Active Critical Alerts'}
                </div>
                <div className={`text-sm mt-1 font-bold italic ${alertCount > 0 ? 'text-red-200' : 'text-cyan-200'}`}>
                  {alertMessage}
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                <input 
                  type="text" 
                  placeholder="Search pulse..." 
                  className="w-full bg-[#041217] border border-cyan-900/50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-400/50 placeholder:text-cyan-900 uppercase tracking-tighter"
                />
              </div>
              <FilterSelect label="All Feeds" />
              <FilterSelect label="All Priority" />
            </div>

            {/* Feed List */}
            <div className="space-y-6">
              {feedItems.map(item => (
                <PulseCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Broadcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#030c0f] border-2 border-cyan-500 w-full max-w-lg p-8 relative shadow-[0_0_40px_rgba(0,229,255,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-cyan-500 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 italic tracking-tighter uppercase border-b border-cyan-900/50 pb-2 flex items-center gap-2">
                <Radio size={18} /> Initialize Signal
            </h3>
            
            <form onSubmit={handleBroadcast} className="space-y-4">
              <input 
                required placeholder="Subject Line"
                className="w-full bg-[#041217] border border-cyan-900 p-3 text-sm outline-none focus:border-cyan-400 text-cyan-100"
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="bg-[#041217] border border-cyan-900 p-3 text-[10px] outline-none text-cyan-400"
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option>SOCIAL</option>
                  <option>OFFICIAL</option>
                  <option value="ALERT">ALERT</option>
                </select>
                <select 
                  className="bg-[#041217] border border-cyan-900 p-3 text-[10px] outline-none text-cyan-400"
                  onChange={e => setFormData({...formData, sector: e.target.value})}
                >
                  <option>Tech Quarter</option>
                  <option>Steel District</option>
                  <option>Power Grid</option>
                </select>
              </div>
              <textarea 
                required placeholder="Transmission Content..." rows="4"
                className="w-full bg-[#041217] border border-cyan-900 p-3 text-sm outline-none focus:border-cyan-400 text-cyan-100 resize-none"
                onChange={e => setFormData({...formData, content: e.target.value})}
              />
              <button className="w-full bg-cyan-400 text-black py-3 font-bold uppercase text-xs tracking-[0.3em] hover:bg-white transition-all shadow-lg">
                Transmit to Pulse
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- Helpers & Sub-Components --- */

const NavItem = ({ icon, label, sub, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-r-2 ${active ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300' : 'border-transparent opacity-40 hover:opacity-100 hover:bg-cyan-950/10'}`}>
    {icon}
    <div>
      <div className="text-[11px] font-bold uppercase leading-none tracking-tight">{label}</div>
      <div className="text-[9px] opacity-60 tracking-tighter uppercase">{sub}</div>
    </div>
  </div>
);

const FilterSelect = ({ label }) => (
  <div className="bg-[#041217] border border-cyan-900/50 px-4 py-2 text-[10px] font-bold tracking-widest flex items-center gap-4 cursor-pointer hover:border-cyan-400 uppercase">
    <span className="opacity-60">{label}</span>
    <span className="text-[8px] opacity-30">▼</span>
  </div>
);

const PulseCard = ({ type, sector, title, content, author, date, views, likes }) => {
  const typeColors = {
    SOCIAL: "text-blue-400 bg-blue-900/10 border-blue-500/30",
    OFFICIAL: "text-yellow-500 bg-yellow-900/10 border-yellow-500/30",
    ALERT: "text-red-500 bg-red-900/10 border-red-500/30"
  };

  return (
    <div className="bg-[#041217]/40 border border-cyan-900/30 p-6 group hover:bg-[#041217]/60 hover:border-cyan-500/40 transition-all animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${type === 'ALERT' ? 'bg-red-500' : 'bg-cyan-500'}`} />
        <span className={`text-[9px] px-2 py-0.5 border font-black uppercase tracking-widest ${typeColors[type]}`}>{type}</span>
        <span className="text-[10px] text-cyan-800 uppercase tracking-widest font-bold">{sector}</span>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors uppercase italic">{title}</h3>
      <p className="text-xs text-cyan-100/40 leading-relaxed mb-6 font-sans">{content}</p>

      <div className="flex justify-between items-center text-[10px] text-cyan-900 font-bold uppercase tracking-widest pt-4 border-t border-cyan-900/20">
        <div className="flex gap-4">
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <div className="flex gap-4 items-center opacity-60">
            <span className="flex items-center gap-1"><Eye size={12}/> {views}</span>
            <span className="flex items-center gap-1"><Heart size={12}/> {likes}</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-cyan-400"><MessageSquare size={12}/> 0</span>
        </div>
      </div>
    </div>
  );
};

export default ThePulse;