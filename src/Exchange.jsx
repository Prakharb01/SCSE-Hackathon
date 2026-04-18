import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
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
  X 
} from 'lucide-react';

const Exchange = () => {
  const navigate = useNavigate();
  const { recentTrades, completedTrades, setCompletedTrades, setRecentTrades, setReputation } = useOutletContext();
  const [createdListings, setCreatedListings] = useState([]);
  
  // Combine created listings with system-generated trades
  const listings = [
    ...createdListings,
    ...recentTrades.map((trade) => ({
      id: `sys-${trade.id}`,
      category: trade.type === 'physical' ? 'Technology' : 'Digital Assets',
      title: trade.title,
      desc: `Automated trade listing: ${trade.title}. ${trade.type} item available for exchange.`,
      seeking: trade.type === 'physical' ? 'Digital assets or services' : 'Physical goods or credits',
      rep: 100,
      author: 'System Auto',
      sourceId: trade.id,
      isSystem: true
    }))
  ];

  // --- DYNAMIC COUNTS ---
  const totalCount = listings.length;
  // In this logic, all listings are "Available" until they are moved to a "Completed" state
  const availableCount = listings.length; 
  const completedCount = completedTrades; 
  
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    desc: '',
    seeking: ''
  });

  // --- HANDLERS ---
  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: Date.now(),
      rep: 100,
      author: "V. Mishra"
    };
    setCreatedListings(prev => [newItem, ...prev]);
    setIsModalOpen(false);
    setFormData({ title: '', category: 'Technology', desc: '', seeking: '' });
  };

  const handleAcceptTrade = (listing) => {
    if (listing.isSystem) {
      const tradeId = Number(listing.sourceId);
      if (!Number.isNaN(tradeId)) {
        setCompletedTrades(prev => prev + 1);
        setReputation(prev => prev + 100);
        const currentTrades = recentTrades.filter(trade => trade.id !== tradeId);
        setRecentTrades(currentTrades);
      }
    } else {
      setCompletedTrades(prev => prev + 1);
      setReputation(prev => prev + 100);
      setCreatedListings(prev => prev.filter(item => item.id !== listing.id));
    }
  };

  const cyberpunkCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
    .cyber-font { font-family: 'Rajdhani', sans-serif; }
    .cyber-grid {
      background-image: linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
      background-size: 30px 30px;
    }
    .neon-glow { box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #30363d; border-radius: 10px; }
  `;

  return (
    <div className="cyber-font relative flex h-screen bg-[#0a0c10] text-slate-300 overflow-hidden cyber-grid">
      <style>{cyberpunkCSS}</style>

      {/* LISTING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#161b22] border border-[#00d4ff]/30 p-8 relative neon-glow">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-[#00d4ff]">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-[#00d4ff] mb-6 uppercase tracking-widest italic">Broadcast New Trade</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <input 
                required placeholder="RESOURCE NAME"
                className="w-full bg-black/40 border border-[#30363d] p-3 text-sm focus:border-[#00d4ff] outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              <select 
                className="w-full bg-black/40 border border-[#30363d] p-3 text-sm focus:border-[#00d4ff] outline-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Technology</option>
                <option>Energy</option>
                <option>Hardware</option>
              </select>
              <input 
                required placeholder="SEEKING (e.g. Nanobots)"
                className="w-full bg-black/40 border border-[#30363d] p-3 text-sm focus:border-[#00d4ff] outline-none"
                value={formData.seeking}
                onChange={(e) => setFormData({...formData, seeking: e.target.value})}
              />
              <textarea 
                required placeholder="ITEM SPECIFICATIONS" rows="3"
                className="w-full bg-black/40 border border-[#30363d] p-3 text-sm focus:border-[#00d4ff] outline-none"
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
              />
              <button type="submit" className="w-full bg-[#00d4ff] text-black font-black py-3 uppercase tracking-widest hover:brightness-110">
                Execute Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-[#30363d] bg-[#0a0c10] flex flex-col p-6 z-20">
        <div className="mb-10">
          <h1 className="text-[#00d4ff] font-bold text-xl tracking-tighter leading-none">NEO</h1>
          <h1 className="text-[#00d4ff] font-bold text-2xl tracking-tighter leading-none uppercase">JAMSHEDPUR</h1>
          <p className="text-[10px] text-slate-500 mt-1 tracking-widest">CITY HUB v2.4</p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#161b22]/50 border border-[#30363d] rounded mb-8">
          <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center text-xs font-bold">P</div>
          <div className="flex-1">
            <p className="text-sm font-bold leading-none">prakhar</p>
            <p className="text-[10px] text-yellow-500 mt-1">⚡ 100 REP</p>
          </div>
          <span className="text-[9px] border border-[#00d4ff] text-[#00d4ff] px-2 py-0.5 rounded">CITIZEN</span>
        </div>

        <nav className="space-y-4 flex-1">
          <SidebarLink icon={<LayoutGrid size={18}/>} label="COMMAND" sub="Dashboard" onClick={() => navigate('/')} />
          <SidebarLink icon={<Briefcase size={18}/>} label="EMPLOYMENT" sub="Grid" onClick={() => navigate('/employment')} />
          <SidebarLink icon={<RefreshCw size={18}/>} label="EXCHANGE" sub="Market" active onClick={() => navigate('/exchange')} />
          <SidebarLink icon={<Activity size={18}/>} label="THE PULSE" sub="City Feed" onClick={() => navigate('/thepulse')} />
          <SidebarLink icon={<Trophy size={18}/>} label="RANKINGS" sub="Leaderboard" onClick={() => navigate('/ranking')} />
          <SidebarLink icon={<User size={18}/>} label="IDENTITY" sub="Profile" onClick={() => navigate('/identity')} />
        </nav>

        <div className="pt-4 border-t border-[#30363d] text-[10px] text-slate-600">
          <p>DISCONNECT</p>
          <p className="mt-1 text-cyan-500/50">SECTOR: TECH QUARTER</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b border-[#30363d] flex items-center justify-between px-8 bg-black/20">
          <span className="text-[10px] text-slate-600 tracking-[0.2em] uppercase">Neo-Jamshedpur Unified City Platform</span>
          <div className="flex items-center gap-6">
            <Bell size={18} className="text-slate-600" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold">ONLINE</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <header className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-1">Resource Exchange</p>
              <h2 className="text-4xl font-bold tracking-tight text-white uppercase italic">Trade Market</h2>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#00d4ff] text-[#0a0c10] font-black px-6 py-2.5 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all"
            >
              <Plus size={20}/> LIST ITEM
            </button>
          </header>

          {/* DYNAMIC STAT CARDS */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <StatCard label="Total Listings" value={totalCount} />
            <StatCard label="Available" value={availableCount} />
            <StatCard label="Completed" value={completedCount} />
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 text-slate-600" size={18} />
              <input 
                placeholder="Search trades..." 
                className="w-full bg-[#161b22]/30 border border-[#30363d] rounded px-10 py-2.5 text-sm outline-none focus:border-cyan-500/50" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="bg-[#161b22] border border-[#30363d] px-4 py-2 rounded text-[11px] font-bold uppercase outline-none">
              <option>All Status</option>
            </select>
            <select className="bg-[#161b22] border border-[#30363d] px-4 py-2 rounded text-[11px] font-bold uppercase outline-none">
              <option>All Categories</option>
            </select>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10">
            {listings
              .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(item => (
                <TradeCard key={item.id} {...item} onAccept={() => handleAcceptTrade(item)} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const SidebarLink = ({ icon, label, sub, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-4 p-2 cursor-pointer border-r-2 transition-all ${active ? 'text-[#00d4ff] border-[#00d4ff] bg-[#00d4ff]/5' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>
    {icon}
    <div>
      <p className="text-[10px] font-bold tracking-widest uppercase leading-none">{label}</p>
      <p className="text-[11px] mt-1">{sub}</p>
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-[#161b22]/30 border border-[#30363d] p-6 text-center group hover:border-cyan-500/30 transition-all">
    <p className="text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors">{value}</p>
    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{label}</p>
  </div>
);

const TradeCard = ({ category, title, desc, seeking, rep, author, onAccept }) => (
  <div className="bg-[#161b22]/20 border border-[#30363d] p-6 hover:bg-[#161b22]/40 transition-all border-l-2 border-l-[#30363d] hover:border-l-[#00d4ff] animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="flex justify-between mb-4">
      <div className="flex gap-2">
        <span className="text-[9px] bg-cyan-900/20 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/30 font-bold uppercase tracking-tighter">Verified</span>
        <span className="text-[9px] text-slate-500 uppercase py-0.5">{category}</span>
      </div>
      <span className="text-[9px] text-[#00d4ff] border border-[#00d4ff]/30 px-2 py-0.5 font-bold">AVAILABLE</span>
    </div>
    <h3 className="font-bold text-lg text-slate-200 mb-2">{title}</h3>
    <p className="text-[13px] text-slate-500 mb-6 leading-relaxed line-clamp-2">{desc}</p>
    <div className="flex justify-between items-end border-t border-[#30363d] pt-4">
      <div className="flex-1 overflow-hidden">
        <p className="text-[9px] text-slate-600 uppercase mb-1">Seeking</p>
        <p className="text-[13px] text-[#00d4ff] font-semibold truncate">{seeking}</p>
        <p className="text-[11px] text-slate-500 mt-2 italic">by {author}</p>
      </div>
      <div className="text-right ml-4 min-w-15">
        <p className="text-[11px] text-slate-600 mb-1">0 offers</p>
        <p className="text-[12px] text-yellow-500 font-bold whitespace-nowrap">⭐ {rep} REP</p>
      </div>
    </div>
    <button onClick={onAccept} className="mt-6 w-full bg-[#00d4ff] text-black font-bold uppercase text-[10px] py-3 tracking-widest hover:brightness-110">
      ACCEPT TRADE
    </button>
  </div>
);

export default Exchange;