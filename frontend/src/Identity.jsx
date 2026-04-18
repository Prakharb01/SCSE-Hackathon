import React, { useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  RefreshCw,
  Activity,
  Trophy,
  User,
  LogOut,
  Search,
  Plus,
  Bell,
  Zap,
  AlertTriangle,
  ChevronRight,
  Users,
  Calendar,
  Radio,
  X,
  Eye,
  Heart,
  MessageSquare,
  Star,
  MapPin,
} from "lucide-react";

export default function NeoJamshedpur() {
  const navigate = useNavigate();
  const {
    recentJobs = [],
    recentTrades = [],
    activeJobs = 0,
    activeTrades = 0,
    reputation = 100,
    completedJobs = 0,
    completedTrades = 0,
    currentUser
  } = useOutletContext();
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("IDENTITY");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerProfileUpload = () => fileInputRef.current?.click();
  const handleProfileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setProfilePicture(e.target.result);
    reader.readAsDataURL(file);
  };

  // --- GLOBAL STATE ---
  const [jobs, setJobs] = useState([
    {
      id: 1,
      type: "NORMAL",
      category: "Transport",
      title: "Data Runner - Steel District Archives",
      description: "Courier needed to transport encrypted data cores.",
      reward: "300 credits per run",
    },
    {
      id: 2,
      type: "CRITICAL",
      category: "Engineering",
      title: "Power Grid Emergency Repair - Sector 7",
      description: "Immediate repairs required for tertiary conduit failure.",
      reward: "1500 emergency credits",
    },
    {
      id: 3,
      type: "HIGH",
      category: "Engineering",
      title: "Neural Interface Calibration Technician",
      description: "Seeking skilled technician for wetware integration.",
      reward: "800 city credits",
    },
  ]);

  const [pulses, setPulses] = useState([
    {
      id: 1,
      type: "SOCIAL",
      sector: "Steel District",
      title: "Black Market Rumors",
      content: "City Watch confirmed three arrests in the old foundry.",
      author: "Director Steele",
      date: "4/18/2026",
      views: 12,
      likes: 4,
    },
    {
      id: 2,
      type: "ALERT",
      sector: "Power Grid",
      title: "CRITICAL: Blackout Warning",
      content: "Sectors 5-9 blackout from 23:00 to 03:00.",
      author: "Director Steele",
      date: "4/18/2026",
      views: 85,
      likes: 0,
    },
  ]);

  // --- HANDLERS ---
  const handleAddData = (newData) => {
    if (activeTab === "EMPLOYMENT") setJobs([newData, ...jobs]);
    if (activeTab === "THE PULSE") setPulses([newData, ...pulses]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#02080a] text-[#00e5ff] font-mono selection:bg-cyan-500/30">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-cyan-900/40 bg-[#030c0f] flex flex-col p-4 z-20">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Zap className="text-cyan-400 w-6 h-6 fill-cyan-400/20" />
          <h1 className="text-lg font-bold tracking-tighter uppercase leading-none">
            Neo
            <br />
            <span className="text-white">Jamshedpur</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 p-3 bg-cyan-950/20 border border-cyan-900/30 mb-6">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
            {currentUser?.["User name"]?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{currentUser?.["User name"] || 'User'}</div>
            <div className="text-[9px] text-cyan-400 opacity-70 italic">
              {currentUser?.Ranking || reputation} REP
            </div>
          </div>
          <span className="text-[8px] border border-cyan-500/50 px-1 text-cyan-400">
            CITIZEN
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="COMMAND"
            sub="Dashboard"
            active={activeTab === "COMMAND"}
            onClick={() => navigate("/app")}
          />
          <NavItem
            icon={<Briefcase size={18} />}
            label="EMPLOYMENT"
            sub="Grid"
            active={activeTab === "EMPLOYMENT"}
            onClick={() => navigate("/app/employment")}
          />
          <NavItem
            icon={<RefreshCw size={18} />}
            label="EXCHANGE"
            sub="Market"
            active={activeTab === "EXCHANGE"}
            onClick={() => navigate("/app/exchange")}
          />
          <NavItem
            icon={<Activity size={18} />}
            label="THE PULSE"
            sub="City Feed"
            active={activeTab === "THE PULSE"}
            onClick={() => navigate("/app/thepulse")}
          />
          <NavItem
            icon={<Trophy size={18} />}
            label="RANKINGS"
            sub="Leaderboard"
            active={activeTab === "RANKINGS"}
            onClick={() => navigate("/app/ranking")}
          />
          <NavItem
            icon={<User size={18} />}
            label="IDENTITY"
            sub="Profile"
            active={activeTab === "IDENTITY"}
            onClick={() => navigate("/app/identity")}
          />
        </nav>

        <button onClick={() => { localStorage.removeItem('auth'); navigate('/login', { replace: true }); }} className="flex items-center gap-2 text-[10px] opacity-50 hover:opacity-100 transition-all p-2 uppercase mt-auto">
          <LogOut size={14} /> Disconnect
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-cyan-900/30 p-3 px-8 flex justify-between items-center text-[10px] tracking-widest text-cyan-500/60">
          <span>NEO-JAMSHEDPUR UNIFIED CITY PLATFORM</span>
          <div className="flex gap-6 items-center">
            <Bell size={14} className="cursor-pointer" />
            <span className="flex items-center gap-2 text-green-500 font-bold italic">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />{" "}
              ONLINE
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          {activeTab === "COMMAND" && (
            <DashboardView jobs={jobs} pulses={pulses} currentUser={currentUser} />
          )}
          {activeTab === "EMPLOYMENT" && (
            <EmploymentView
              jobs={jobs}
              onOpenModal={() => setIsModalOpen(true)}
            />
          )}
          {activeTab === "THE PULSE" && (
            <PulseView
              pulses={pulses}
              onOpenModal={() => setIsModalOpen(true)}
            />
          )}
          {activeTab === "IDENTITY" && (
            <IdentityView
              profilePicture={profilePicture}
              triggerProfileUpload={triggerProfileUpload}
              handleProfileChange={handleProfileChange}
              fileInputRef={fileInputRef}
              reputation={reputation}
              jobsDone={completedJobs}
              tradesDone={completedTrades}
              totalListings={completedJobs + completedTrades}
              currentUser={currentUser}
            />
          )}
        </div>
      </main>

      {/* MODAL SYSTEM */}
      {isModalOpen && (
        <EntryModal
          type={activeTab}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddData}
        />
      )}
    </div>
  );
}

// --- SUB-VIEWS ---

function DashboardView({ jobs, pulses, currentUser }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <div className="text-[10px] text-cyan-500 opacity-60 uppercase">
          Command Center
        </div>
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
          Welcome, <span className="text-cyan-400">{currentUser?.["User name"] || 'Citizen'}</span>
        </h2>
      </header>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Active Jobs" val={jobs.length} sub="Open Listings >" />
        <StatCard label="Active Trades" val="2" sub="Exchange Market >" />
        <StatCard label="Critical Alerts" val="1" sub="City Emergencies" />
        <StatCard label="Notifications" val="0" sub="Unread Alerts" />
      </div>

      <div className="bg-red-950/10 border border-red-900/50 p-4 flex gap-4 animate-pulse">
        <AlertTriangle className="text-red-500" />
        <div className="text-sm font-bold text-red-200">
          CRITICAL: Blackout Warning - Sectors 5-9 Tonight
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <DashboardBox title="Recent Jobs">
          {jobs.slice(0, 3).map((j) => (
            <div
              key={j.id}
              className="text-xs py-2 border-b border-cyan-900/20 text-white flex justify-between"
            >
              <span>{j.title}</span>
              <span className="text-cyan-500">[POSTED]</span>
            </div>
          ))}
        </DashboardBox>
        <DashboardBox title="Recent Trades">
          <div className="text-xs py-2 text-cyan-500/50 italic text-center">
            No recent trades indexed.
          </div>
        </DashboardBox>
      </div>
    </div>
  );
}

function EmploymentView({ jobs, onOpenModal }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
          Job Listings
        </h2>
        <button
          onClick={onOpenModal}
          className="bg-cyan-400 text-black px-6 py-2 font-bold text-xs flex items-center gap-2 hover:bg-white transition-all uppercase"
        >
          <Plus size={16} /> Post Job
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {["TOTAL", "OPEN", "IN PROGRESS", "COMPLETED"].map((l, i) => (
          <div
            key={l}
            className="bg-[#041217] border border-cyan-900/40 p-4 text-center"
          >
            <div className="text-3xl font-bold text-cyan-400">
              {i === 0 || i === 1 ? jobs.length : 0}
            </div>
            <div className="text-[9px] text-cyan-700 font-bold uppercase tracking-widest">
              {l}
            </div>
          </div>
        ))}
      </div>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-[#041217]/40 border border-cyan-900/30 p-6 group hover:border-cyan-400/50"
        >
          <div className="flex justify-between text-[10px] mb-2 uppercase font-bold">
            <span className="text-cyan-400 bg-cyan-900/20 px-2">
              {job.type}
            </span>
            <span className="text-cyan-800">by Director Steele</span>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400">
            {job.title}
          </h3>
          <p className="text-xs text-cyan-100/40 my-3">{job.description}</p>
          <div className="text-[10px] text-yellow-500 font-bold italic uppercase tracking-widest">
            REWARD: {job.reward}
          </div>
        </div>
      ))}
    </div>
  );
}

function PulseView({ pulses, onOpenModal }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
          The Pulse
        </h2>
        <button
          onClick={onOpenModal}
          className="bg-cyan-400 text-black px-6 py-2 font-bold text-xs flex items-center gap-2 hover:bg-white transition-all uppercase"
        >
          <Plus size={16} /> Broadcast
        </button>
      </div>
      {pulses.map((p) => (
        <div
          key={p.id}
          className="bg-[#041217]/40 border border-cyan-900/30 p-6"
        >
          <div className="text-[9px] text-cyan-400 font-black mb-2 uppercase">
            ● {p.type} — {p.sector}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 italic">
            {p.title}
          </h3>
          <p className="text-xs text-cyan-100/40 mb-4">{p.content}</p>
          <div className="flex justify-between text-[10px] opacity-40 uppercase pt-4 border-t border-cyan-900/20 font-bold">
            <span>
              {p.author} — {p.date}
            </span>
            <div className="flex gap-4">
              <Eye size={12} /> {p.views} <Heart size={12} /> {p.likes}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function IdentityView({
  profilePicture,
  triggerProfileUpload,
  handleProfileChange,
  fileInputRef,
  reputation,
  jobsDone,
  tradesDone,
  totalListings,
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
        Identity Record
      </h2>
      <div className="bg-[#030c0f] border border-cyan-500/30 p-8 flex items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 text-[10px] text-cyan-500/20">
          DNA-ID: 772-XQ-9
        </div>
        <div className="relative">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-cyan-400 object-cover shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center text-4xl font-bold text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              P
            </div>
          )}
          <button
            type="button"
            onClick={triggerProfileUpload}
            className="absolute bottom-0 right-0 rounded-full bg-cyan-400 text-black w-8 h-8 flex items-center justify-center text-[10px] font-bold border border-cyan-500"
          >
            Edit
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileChange}
          />
        </div>
        <div>
          <h3 className="text-3xl font-black text-white uppercase">{currentUser?.["User name"] || 'User'}</h3>
          <div className="text-cyan-500 font-mono text-sm">@{currentUser?.["User name"]?.toLowerCase().replace(/\s+/g, '_') || 'citizen'}</div>
          <div className="flex gap-4 mt-4 text-[10px] uppercase font-bold">
            <span className="bg-cyan-500 text-black px-2">CITIZEN</span>
            <span className="flex items-center gap-1 opacity-60">
              <MapPin size={10} /> Tech Quarter
            </span>
            <span className="flex items-center gap-1 opacity-60">
              <Calendar size={10} /> SINCE 2026
            </span>
          </div>
        </div>
        <div className="ml-auto text-center border-l border-cyan-900/40 pl-8">
          <div className="text-[10px] opacity-40 uppercase mb-1">
            Reputation
          </div>
          <div className="text-4xl font-black text-cyan-400">{reputation}</div>
          <div className="text-[10px] opacity-40 uppercase">City Score</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <ProfileStat
          icon={<Briefcase size={16} />}
          val={jobsDone.toString()}
          label="Jobs Done"
        />
        <ProfileStat
          icon={<RefreshCw size={16} />}
          val={tradesDone.toString()}
          label="Trades Done"
        />
        <ProfileStat
          icon={<Star size={16} />}
          val={totalListings.toString()}
          label="Total Listings"
        />
      </div>
    </div>
  );
}

// --- SHARED UI COMPONENTS ---

const NavItem = ({ icon, label, sub, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-r-2 ${active ? "bg-cyan-950/40 border-cyan-400 text-cyan-300" : "border-transparent opacity-40 hover:opacity-100"}`}
  >
    {icon}
    <div>
      <div className="text-[11px] font-bold uppercase leading-none">
        {label}
      </div>
      <div className="text-[9px] opacity-60 uppercase">{sub}</div>
    </div>
  </div>
);

const StatCard = ({ label, val, sub }) => (
  <div className="bg-[#041217] border border-cyan-900/40 p-4">
    <div className="text-[10px] text-cyan-400/70 mb-2 uppercase tracking-tighter">
      ● {label}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{val}</div>
    <div className="text-[9px] opacity-40 uppercase">{sub}</div>
  </div>
);

const DashboardBox = ({ title, children }) => (
  <div className="bg-[#030c0f] border border-cyan-900/30 p-4">
    <div className="text-[10px] font-bold uppercase text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4">
      {title}
    </div>
    {children}
  </div>
);

const ProfileStat = ({ icon, val, label }) => (
  <div className="bg-[#041217]/50 border border-cyan-900/30 p-6 text-center">
    <div className="flex justify-center text-cyan-400 mb-2">{icon}</div>
    <div className="text-3xl font-bold text-white mb-1">{val}</div>
    <div className="text-[9px] opacity-40 uppercase tracking-widest">
      {label}
    </div>
  </div>
);

function EntryModal({ type, onClose, onSave }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    reward: "",
    category: "General",
  });
  const isJob = type === "EMPLOYMENT";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-[#030c0f] border-2 border-cyan-500 w-full max-w-lg p-8 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
        <h3 className="text-xl font-bold text-white mb-6 uppercase italic tracking-tighter">
          Transmit New {isJob ? "Job" : "Pulse"}
        </h3>
        <input
          placeholder="Subject/Title"
          className="w-full bg-[#041217] border border-cyan-900 p-3 mb-4 text-xs focus:border-cyan-400 outline-none"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <textarea
          placeholder="Description Content"
          rows="3"
          className="w-full bg-[#041217] border border-cyan-900 p-3 mb-4 text-xs focus:border-cyan-400 outline-none resize-none"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        {isJob && (
          <input
            placeholder="Reward (e.g. 500 Credits)"
            className="w-full bg-[#041217] border border-cyan-900 p-3 mb-6 text-xs text-yellow-500 outline-none"
            onChange={(e) => setData({ ...data, reward: e.target.value })}
          />
        )}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-cyan-900 py-3 font-bold uppercase text-[10px] hover:bg-cyan-950"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                ...data,
                id: Date.now(),
                type: "NORMAL",
                author: currentUser?.["User name"] || "Citizen",
                date: "4/18/2026",
                views: 0,
                likes: 0,
              })
            }
            className="flex-1 bg-cyan-400 text-black py-3 font-bold uppercase text-[10px]"
          >
            Initialize Transmission
          </button>
        </div>
      </div>
    </div>
  );
}
