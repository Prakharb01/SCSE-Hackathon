import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, RefreshCw, Activity, 
  Trophy, User, LogOut, Bell, Zap, AlertTriangle, 
  Terminal, ShieldCheck, Plus, Eye, Heart, MessageSquare,
  MapPin, Calendar, Star
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('COMMAND');
  const navigate = useNavigate();
  
  // Destructure completedJobs from context so we can display it
  const { 
    recentJobs, 
    recentTrades, 
    activityFeed, 
    activeJobs, 
    activeTrades, 
    criticalAlerts, 
    criticalAlertMessage, 
    credits,
    reputation,
    completedJobs,
    completedTrades,
    currentUser
  } = useOutletContext();

  const renderContent = () => {
    switch (activeTab) {
      case 'COMMAND':
        return <CommandView 
          recentJobs={recentJobs} 
          recentTrades={recentTrades} 
          activityFeed={activityFeed} 
          navigate={navigate} 
          activeJobs={activeJobs} 
          activeTrades={activeTrades} 
          criticalAlerts={criticalAlerts} 
          criticalAlertMessage={criticalAlertMessage} 
          credits={credits}
          reputation={reputation}
          completedJobs={completedJobs}
          completedTrades={completedTrades}
          currentUser={currentUser}
        />;
      case 'EMPLOYMENT':
        return <EmploymentView completedJobs={completedJobs} />; // <--- Pass it down
      case 'THE PULSE':
        return <PulseView />;
      case 'IDENTITY':
        return <IdentityView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full opacity-30 italic">
            <Terminal className="mb-2" />
            <p>ACCESSING {activeTab}...</p>
            <p className="text-[10px]">ENCRYPTED DATA STREAM OFFLINE</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#02080a] text-[#00e5ff] font-mono selection:bg-cyan-500/30">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-cyan-900/50 bg-[#030c0f] flex flex-col p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Zap className="text-cyan-400 w-6 h-6" />
          <h1 className="text-lg font-bold tracking-tighter uppercase leading-tight">Neo<br/>Jamshedpur</h1>
        </div>

        <div className="flex items-center gap-3 p-3 bg-cyan-950/20 rounded-sm border border-cyan-900/30 mb-6">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">{currentUser?.["User name"]?.charAt(0).toUpperCase() || 'U'}</div>
          <div>
            <div className="text-xs font-bold text-white">{currentUser?.["User name"] || 'User'}</div>
            <div className="text-[10px] text-cyan-400 opacity-70 italic">{currentUser?.Ranking || reputation} REP • CITIZEN</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<LayoutDashboard size={18}/>} label="COMMAND" sub="Dashboard" active={activeTab === 'COMMAND'} onClick={() => navigate('/app')} />
          <NavItem icon={<Briefcase size={18}/>} label="EMPLOYMENT" sub="Grid" active={activeTab === 'EMPLOYMENT'} onClick={() => navigate('/app/employment')} />
          <NavItem icon={<RefreshCw size={18}/>} label="EXCHANGE" sub="Market" active={activeTab === 'EXCHANGE'} onClick={() => navigate('/app/exchange')} />
          <NavItem icon={<Activity size={18}/>} label="THE PULSE" sub="City Feed" active={activeTab === 'THE PULSE'} onClick={() => navigate('/app/thepulse')} />
          <NavItem icon={<Trophy size={18}/>} label="RANKINGS" sub="Leaderboard" active={activeTab === 'RANKINGS'} onClick={() => navigate('/app/ranking')} />
          <NavItem icon={<User size={18}/>} label="IDENTITY" sub="Profile" active={activeTab === 'IDENTITY'} onClick={() => navigate('/app/identity')} />
        </nav>

        <button onClick={() => { localStorage.removeItem('auth'); navigate('/login', { replace: true }); }} className="flex items-center gap-2 text-xs opacity-50 hover:opacity-100 transition-all p-2 mt-auto">
          <LogOut size={14} /> DISCONNECT
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

/* --- PAGE VIEWS --- */

const CommandView = ({ recentJobs, recentTrades, activityFeed, navigate, activeJobs, activeTrades, criticalAlerts, criticalAlertMessage, credits, reputation, completedJobs, completedTrades, currentUser }) => (
  <div className="animate-in fade-in duration-500">
    <header className="flex justify-between items-start mb-8">
      <div>
        <div className="text-[10px] tracking-[0.2em] text-cyan-500/60 uppercase">Command Center</div>
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
          Welcome, <span className="text-cyan-400">{currentUser?.["User name"] || 'Citizen'}</span>
        </h2>
        <div className="text-[10px] mt-1 opacity-70">SECTOR: Tech Quarter | CLEARANCE: Citizen</div>
      </div>
      <div className="text-right">
        <div className="text-[10px] tracking-widest opacity-60 uppercase">Reputation Score</div>
        <div className="text-4xl font-bold text-white">{currentUser?.Ranking || reputation}</div>
        <div className="text-[10px] text-cyan-400 uppercase">City Credits</div>
        <div className="text-2xl font-bold text-cyan-400">{credits}</div>
      </div>
    </header>

    <div className="grid grid-cols-4 gap-4 mb-6">
      <StatCard icon={<Briefcase size={16}/>} label="ACTIVE JOBS" val={activeJobs.toString()} sub="OPEN LISTINGS >" onClick={() => navigate('/app/employment')} />
      <StatCard icon={<RefreshCw size={16}/>} label="ACTIVE TRADES" val={activeTrades.toString()} sub="EXCHANGE MARKET >" onClick={() => navigate('/app/exchange')} />
      <StatCard icon={<AlertTriangle size={16} className="text-red-500"/>} label="CRITICAL ALERTS" val={criticalAlerts.toString()} sub="CITY EMERGENCIES" />
      <StatCard icon={<Bell size={16}/>} label="NOTIFICATIONS" val={criticalAlerts.toString()} sub="UNREAD ALERTS" />
    </div>

    <div className={`${criticalAlerts > 0 ? 'bg-red-950/20 border-red-900/50 text-red-200' : 'bg-cyan-950/10 border-cyan-900/30 text-cyan-300'} p-4 mb-6 flex items-start gap-4`}>
      <AlertTriangle className={`${criticalAlerts > 0 ? 'text-red-500' : 'text-cyan-400' } shrink-0`} size={20} />
      <div>
        <div className={`text-xs font-bold uppercase tracking-widest ${criticalAlerts > 0 ? 'text-red-500' : 'text-cyan-400'}`}>
          {criticalAlerts > 0 ? `Critical City Alerts (${criticalAlerts})` : 'No Critical Alerts'}
        </div>
        <div className={`text-sm mt-1 italic font-bold ${criticalAlerts > 0 ? 'text-red-200' : 'text-cyan-200'}`}>
          {criticalAlertMessage}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <SectionBox title="RECENT JOBS" onViewAll={() => navigate('/app/employment')}>
        {recentJobs.map((job) => (
          <JobRow key={job.id} title={job.title} sector={job.sector} level={job.level} />
        ))}
      </SectionBox>
      <SectionBox title="RECENT TRADES" onViewAll={() => navigate('/app/exchange')}>
        {recentTrades.map((trade) => (
          <TradeRow key={trade.id} title={trade.title} type={trade.type} status={trade.status} />
        ))}
      </SectionBox>
    </div>

    <SectionBox title="CITY ACTIVITY FEED" onViewAll={() => navigate('/app/thepulse')}>
      <div className="space-y-3 font-mono">
        {activityFeed.map((activity, index) => (
          <FeedRow key={index} user={activity.user} action={activity.action} time={activity.time} />
        ))}
      </div>
    </SectionBox>

    <div className="grid grid-cols-3 gap-4 mt-6">
      {/* Updated to use completedJobs and completedTrades from context */}
      <FooterStat icon={<Briefcase size={20}/>} val={completedJobs.toString()} label="JOBS COMPLETED" />
      <FooterStat icon={<RefreshCw size={20}/>} val={completedTrades.toString()} label="TRADES COMPLETED" />
      <FooterStat icon={<ShieldCheck size={20} className="text-yellow-500"/>} val="PENDING" label="VERIFICATION" color="text-yellow-500" />
    </div>
  </div>
);

const EmploymentView = ({ completedJobs }) => (
  <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
    <div className="flex justify-between items-end mb-8">
      <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Job Listings</h2>
      <button className="bg-cyan-400 text-black px-6 py-2 font-bold text-xs flex items-center gap-2 hover:bg-white transition-all uppercase"><Plus size={16}/> Post Job</button>
    </div>
    <div className="grid grid-cols-4 gap-4 mb-8 text-center">
      {['TOTAL', 'OPEN', 'IN PROGRESS', 'COMPLETED'].map((l) => (
        <div key={l} className="bg-[#041217] border border-cyan-900/40 p-4">
          {/* Updated the COMPLETED logic here as well */}
          <div className="text-3xl font-bold text-cyan-400">
            {l === 'TOTAL' || l === 'OPEN' ? '3' : l === 'COMPLETED' ? completedJobs : '0'}
          </div>
          <div className="text-[9px] text-cyan-700 font-bold uppercase tracking-widest">{l}</div>
        </div>
      ))}
    </div>
    <div className="space-y-4">
      <JobCard title="Data Runner - Steel District Archives" type="NORMAL" sector="Transport" reward="300 credits" />
      <JobCard title="Power Grid Emergency Repair" type="CRITICAL" sector="Engineering" reward="1500 credits" />
    </div>
  </div>
);

// ... rest of the shared components (PulseView, IdentityView, NavItem, etc.) remain the same
const PulseView = () => (
  <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-4">
      <Activity className="text-cyan-400" /> The Pulse
    </h2>
    <div className="bg-[#041217]/40 border border-cyan-900/30 p-6">
      <div className="text-[9px] text-cyan-400 font-black mb-2 uppercase">● SOCIAL — Steel District</div>
      <h3 className="text-xl font-bold text-white mb-2 italic">Black Market Rumors</h3>
      <p className="text-xs text-cyan-100/40 mb-4 font-sans leading-relaxed">City Watch confirmed three arrests in the old foundry following reports of unlicensed trade hubs.</p>
      <div className="flex justify-between text-[10px] opacity-40 uppercase pt-4 border-t border-cyan-900/20 font-bold">
        <span>Director Steele — 4/18/2026</span>
        <div className="flex gap-4"><Eye size={12}/> 85 <Heart size={12}/> 12</div>
      </div>
    </div>
  </div>
);

const IdentityView = () => (
  <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-8">
    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Identity Record</h2>
    <div className="bg-[#030c0f] border border-cyan-500/30 p-8 flex items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 text-[10px] text-cyan-500/10">DNA-ID: 772-XQ-9</div>
      <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center text-4xl font-bold text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]">{currentUser?.["User name"]?.charAt(0).toUpperCase() || 'U'}</div>
      <div>
        <h3 className="text-3xl font-black text-white uppercase">{currentUser?.["User name"] || 'User'}</h3>
        <div className="text-cyan-500 font-mono text-sm">@{currentUser?.["User name"]?.toLowerCase().replace(/\s+/g, '_') || 'citizen'}</div>
        <div className="flex gap-4 mt-4 text-[10px] uppercase font-bold">
          <span className="bg-cyan-500 text-black px-2">CITIZEN</span>
          <span className="flex items-center gap-1 opacity-60"><MapPin size={10}/> Tech Quarter</span>
        </div>
      </div>
      <div className="ml-auto text-center border-l border-cyan-900/40 pl-8">
         <div className="text-[10px] opacity-40 uppercase mb-1">Reputation</div>
         <div className="text-4xl font-black text-cyan-400">{reputation}</div>
      </div>
    </div>
  </div>
);

const NavItem = ({ icon, label, sub, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-l-2 ${active ? 'bg-cyan-950/30 border-cyan-400 text-white' : 'border-transparent opacity-60 hover:opacity-100 hover:bg-cyan-950/10'}`}
  >
    {icon}
    <div>
      <div className="text-[11px] font-bold uppercase leading-none">{label}</div>
      <div className="text-[9px] opacity-70 tracking-tighter uppercase">{sub}</div>
    </div>
  </div>
);

const JobCard = ({ title, type, sector, reward }) => (
  <div className="bg-[#041217]/60 border border-cyan-900/30 p-6 hover:border-cyan-400/50 transition-all">
    <div className="flex justify-between text-[10px] mb-2 font-bold uppercase">
      <span className={type === 'CRITICAL' ? 'text-red-500' : 'text-cyan-400'}>{type}</span>
      <span className="opacity-40">{sector}</span>
    </div>
    <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
    <div className="text-[10px] text-yellow-500 italic font-bold">REWARD: {reward}</div>
  </div>
);

const StatCard = ({ icon, label, val, sub, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-[#041217] border border-cyan-900/40 p-4 ${onClick ? 'cursor-pointer hover:border-cyan-400/50 hover:bg-[#071822]' : ''}`}
  >
    <div className="flex items-center gap-2 text-[10px] text-cyan-400/70 mb-2 uppercase tracking-tighter">
      {icon} {label}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{val}</div>
    <div className={`text-[9px] uppercase ${onClick ? 'text-cyan-400 opacity-90' : 'opacity-40'}`}>{sub}</div>
  </div>
);

const SectionBox = ({ title, children, onViewAll }) => (
  <div className="bg-[#030c0f] border border-cyan-900/30 rounded-sm mb-6">
    <div className="p-3 border-b border-cyan-900/30 flex justify-between items-center">
      <h3 className="text-[10px] font-bold flex items-center gap-2 uppercase tracking-[0.2em] text-cyan-400">
        <Terminal size={12}/> {title}
      </h3>
      <span 
        className="text-[9px] opacity-40 cursor-pointer hover:opacity-100 hover:underline uppercase transition-all" 
        onClick={onViewAll}
      >
        View All
      </span>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const JobRow = ({ title, sector, level }) => (
  <div className="flex justify-between items-center py-3 border-b border-cyan-900/10 last:border-0">
    <div>
      <div className="text-xs font-bold text-white">{title}</div>
      <div className="text-[10px] opacity-50">{sector}</div>
    </div>
    <span className={`text-[8px] px-1 font-bold ${level === 'CRITICAL' ? 'bg-red-500 text-black' : 'bg-cyan-500/20 text-cyan-400'}`}>{level}</span>
  </div>
);

const TradeRow = ({ title, type, status }) => (
  <div className="flex justify-between items-center py-3 border-b border-cyan-900/10 last:border-0">
    <div>
      <div className="text-xs font-bold text-white">{title}</div>
      <div className="text-[10px] opacity-50">{type}</div>
    </div>
    <span className="text-[8px] px-1 border border-cyan-500/50 text-cyan-400 font-bold">{status}</span>
  </div>
);

const FeedRow = ({ user, action, time }) => (
  <div className="flex justify-between items-center text-[10px]">
    <div className="flex gap-2">
      <span className="text-cyan-400 font-bold">▪ {user}</span>
      <span className="opacity-70">{action}</span>
    </div>
    <span className="opacity-30">{time}</span>
  </div>
);

const FooterStat = ({ icon, val, label, color = "text-white" }) => (
  <div className="bg-[#041217] border border-cyan-900/40 p-4 text-center">
    <div className="flex justify-center mb-2 opacity-70 italic">{icon}</div>
    <div className={`text-xl font-bold mb-1 ${color}`}>{val}</div>
    <div className="text-[9px] opacity-40 tracking-widest uppercase">{label}</div>
  </div>
);

export default Dashboard;