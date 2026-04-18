import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, RefreshCw, Activity, 
  Trophy, User, LogOut, Plus, Search, ChevronRight, 
  Users, Calendar, Zap, X 
} from 'lucide-react';

const EmploymentGrid = () => {
  const navigate = useNavigate();
  const { recentJobs, completedJobs, setCredits, setCompletedJobs, setRecentJobs, currentUser } = useOutletContext();
  
  // --- STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState("");
  const [createdJobs, setCreatedJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobOptionsOpen, setJobOptionsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Engineering',
    type: 'NORMAL',
    description: '',
    reward: ''
  });

  // --- DATA PROCESSING ---
  const allJobs = [
    ...createdJobs,
    ...recentJobs.map((job, index) => ({
      id: job.id || `recent-${index}`,
      type: job.level,
      category: job.sector,
      title: job.title,
      description: `Automated job posting for ${job.sector} sector. ${job.level} priority assignment.`,
      reward: job.level === 'CRITICAL' ? '1500 credits' : job.level === 'HIGH' ? '800 credits' : '300 credits'
    }))
  ];

  // Logic: Display only jobs that match the search term (Title or Category)
  const displayedJobs = allJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- HANDLERS ---
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setJobOptionsOpen(true);
  };

  const handleAcceptJob = () => {
    if (selectedJob) {
      // 1. Increase the completed jobs counter by 1
      setCompletedJobs(prev => prev + 1);

      // 2. Extract reward number and update credits
      const rewardValue = parseInt(selectedJob.reward);
      if (!isNaN(rewardValue)) {
        setCredits(prev => prev + rewardValue);
      }

      // 3. Remove the accepted job from the dynamic lists
      setRecentJobs(prev => prev.filter(job => job.title !== selectedJob.title));
      setCreatedJobs(prev => prev.filter(job => job.id !== selectedJob.id));

      // 4. Close UI
      setJobOptionsOpen(false);
      setSelectedJob(null);
    }
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      id: Date.now(),
    };
    setCreatedJobs(prev => [newEntry, ...prev]);
    setIsModalOpen(false);
    setFormData({ title: '', category: 'Engineering', type: 'NORMAL', description: '', reward: '' });
  };

  return (
    <div className="flex min-h-screen bg-[#02080a] text-[#00e5ff] font-mono selection:bg-cyan-500/30">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-cyan-900/40 bg-[#030c0f] flex flex-col p-4 shrink-0">
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
          <span className="text-[8px] border border-cyan-500/50 px-1 text-cyan-400 bg-cyan-500/10">CITIZEN</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="COMMAND" sub="Dashboard" onClick={() => navigate('/app')} />
          <NavItem icon={<Briefcase size={18} />} label="EMPLOYMENT" sub="Grid" active onClick={() => navigate('/app/employment')} />
          <NavItem icon={<RefreshCw size={18} />} label="EXCHANGE" sub="Market" onClick={() => navigate('/app/exchange')} />
          <NavItem icon={<Activity size={18} />} label="THE PULSE" sub="City Feed" onClick={() => navigate('/app/thepulse')} />
          <NavItem icon={<Trophy size={18} />} label="RANKINGS" sub="Leaderboard" onClick={() => navigate('/app/ranking')} />
          <NavItem icon={<User size={18} />} label="IDENTITY" sub="Profile" onClick={() => navigate('/app/identity')} />
        </nav>

        <div className="mt-auto space-y-4">
          <button onClick={() => { localStorage.removeItem('auth'); navigate('/login', { replace: true }); }} className="flex items-center gap-2 text-[10px] opacity-50 hover:opacity-100 transition-all p-2">
            <LogOut size={14} /> DISCONNECT
          </button>
          <div className="text-[9px] opacity-30 px-2 uppercase tracking-widest">Sector: Tech Quarter</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-cyan-900/30 p-3 px-8 flex justify-between items-center text-[10px] tracking-widest text-cyan-500/60">
          <span>NEO-JAMSHEDPUR UNIFIED CITY PLATFORM</span>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2 text-green-500 font-bold italic">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> ONLINE
            </span>
          </div>
        </div>

        <div className="p-10 max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-cyan-500 opacity-60 uppercase mb-1">Employment Grid</div>
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Job Listings</h2>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-400 text-black px-6 py-2 font-bold text-xs flex items-center gap-2 hover:bg-white transition-all uppercase tracking-widest"
            >
              <Plus size={16} /> Post Job
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-10">
            <CounterBox val={allJobs.length} label="TOTAL" />
            <CounterBox val={allJobs.length} label="OPEN" />
            <CounterBox val="0" label="IN PROGRESS" />
            <CounterBox val={completedJobs} label="COMPLETED" />
          </div>

          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={16} />
              <input 
                type="text" 
                placeholder="Search jobs by title or category..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#041217] border border-cyan-900/50 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-400/50 placeholder:text-cyan-800 text-white"
              />
            </div>
            <FilterButton label="ALL STATUS" />
            <FilterButton label="ALL CATEGORIES" />
          </div>

          <div className="space-y-4">
            {displayedJobs.length > 0 ? (
              displayedJobs.map(job => (
                <JobCard key={job.id} {...job} onClick={() => handleJobClick(job)} />
              ))
            ) : (
              <div className="text-center py-20 border border-dashed border-cyan-900/20 text-cyan-800 text-xs tracking-widest">
                NO MATCHING CONTRACTS FOUND IN DATABASE
              </div>
            )}
          </div>
        </div>

        {/* --- MODALS --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#030c0f] border border-cyan-500 w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold italic uppercase">Broadcast New Contract</h3>
                <X className="cursor-pointer opacity-50 hover:opacity-100" onClick={() => setIsModalOpen(false)} />
              </div>
              <form onSubmit={handleCreateJob} className="space-y-4">
                <input required placeholder="Contract Title" className="w-full bg-[#041217] border border-cyan-900 p-2 text-xs outline-none text-white" onChange={e => setFormData({...formData, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-2">
                  <select className="bg-[#041217] border border-cyan-900 p-2 text-[10px] text-cyan-400" onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option>Engineering</option><option>Transport</option><option>Security</option>
                  </select>
                  <select className="bg-[#041217] border border-cyan-900 p-2 text-[10px] text-cyan-400" onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="NORMAL">NORMAL</option><option value="HIGH">HIGH</option><option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
                <input required placeholder="Reward (e.g. 500 Credits)" className="w-full bg-[#041217] border border-cyan-900 p-2 text-xs text-yellow-500" onChange={e => setFormData({...formData, reward: e.target.value})} />
                <textarea required placeholder="Description" rows="3" className="w-full bg-[#041217] border border-cyan-900 p-2 text-xs text-white" onChange={e => setFormData({...formData, description: e.target.value})} />
                <button className="w-full bg-cyan-400 text-black py-2 font-bold uppercase text-[10px]">Initialize Transmission</button>
              </form>
            </div>
          </div>
        )}

        {jobOptionsOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#030c0f] border border-cyan-500 w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold italic uppercase">Job Options</h3>
                <button onClick={() => setJobOptionsOpen(false)}><X size={20} /></button>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-bold text-white mb-2">{selectedJob.title}</h4>
                <p className="text-sm text-cyan-100/60 mb-4">{selectedJob.description}</p>
                <div className="text-sm text-yellow-500 font-bold">Reward: {selectedJob.reward}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleAcceptJob} className="flex-1 bg-cyan-500 text-black font-bold py-3 text-xs">ACCEPT JOB</button>
                <button onClick={() => setJobOptionsOpen(false)} className="flex-1 border border-cyan-500 text-cyan-400 font-bold py-3 text-xs">DECLINE</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

/* --- UI COMPONENTS --- */
const NavItem = ({ icon, label, sub, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-r-2 ${active ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300' : 'border-transparent opacity-50 hover:opacity-100 hover:bg-cyan-950/10'}`}>
    {icon}
    <div>
      <div className="text-[11px] font-bold uppercase leading-none tracking-tight">{label}</div>
      <div className="text-[9px] opacity-60 tracking-tighter uppercase">{sub}</div>
    </div>
  </div>
);

const CounterBox = ({ val, label }) => (
  <div className="bg-[#041217]/50 border border-cyan-900/30 p-4 text-center group hover:border-cyan-500/50 transition-colors">
    <div className="text-3xl font-bold text-cyan-400 leading-none mb-2">{val}</div>
    <div className="text-[9px] text-cyan-700 tracking-[0.2em] font-bold uppercase">{label}</div>
  </div>
);

const FilterButton = ({ label }) => (
  <button className="bg-[#041217] border border-cyan-900/50 px-4 py-2 text-[10px] font-bold tracking-widest flex items-center gap-4 hover:border-cyan-400 transition-all">
    <span className="flex items-center gap-2 opacity-60"><Search size={12}/> {label}</span>
    <span className="opacity-40 text-[8px]">▼</span>
  </button>
);

const JobCard = ({ type, category, title, description, reward, onClick }) => {
  const typeStyles = {
    NORMAL: "bg-cyan-900/20 text-cyan-400 border-cyan-500/30",
    CRITICAL: "bg-red-950/30 text-red-500 border-red-500/40",
    HIGH: "bg-yellow-900/20 text-yellow-500 border-yellow-500/40"
  };

  return (
    <div className="bg-[#041217]/40 border border-cyan-900/30 p-6 relative group hover:bg-[#041217]/80 hover:border-cyan-500/40 transition-all cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <span className={`text-[8px] px-2 py-0.5 border font-bold ${typeStyles[type] || typeStyles.NORMAL}`}>{type}</span>
          <span className="text-[10px] text-cyan-700 uppercase tracking-widest font-bold">{category}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] border border-cyan-400 px-1 text-cyan-400 font-bold scale-90 italic">ACTIVE</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-xs text-cyan-100/40 leading-relaxed mb-4 max-w-2xl">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-6 text-[10px]">
          <span className="flex items-center gap-2 opacity-60"><Calendar size={12}/> 4/18/2026</span>
          <span className="flex items-center gap-2 opacity-60"><Users size={12}/> 0 APPLICANTS</span>
          <span className="text-yellow-500 font-bold uppercase tracking-widest italic">Reward: {reward}</span>
        </div>
        <ChevronRight size={18} className="opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export default EmploymentGrid;