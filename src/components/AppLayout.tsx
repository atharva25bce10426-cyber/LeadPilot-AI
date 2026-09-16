import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Bot,
  LayoutDashboard,
  Users,
  Cpu,
  Send,
  CalendarCheck,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users, badge: '64' },
    { name: 'AI Agent', path: '/agent', icon: Cpu, pulse: true },
    { name: 'Campaigns', path: '/campaigns', icon: Send, badge: '2' },
    { name: 'Appointments', path: '/appointments', icon: CalendarCheck, badge: '4' },
    { name: 'Analytics', path: '/dashboard', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3.5 bg-[#090d16] border-b border-slate-800/80 sticky top-0 z-40">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <span className="text-lg font-extrabold text-white tracking-tight">
            LeadPilot <span className="text-xs text-blue-400 font-mono">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
          </button>
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-[#080c16] border-r border-slate-800/80 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        
        {/* Brand Logo - Explicitly navigates to /dashboard */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <Link
            to="/dashboard"
            id="sidebar-logo"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                LeadPilot
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/30">
                AI
              </span>
            </div>
          </Link>
        </div>

        {/* Live AI Agent Pill */}
        <div className="px-4 pt-4 pb-2">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900/60 border border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-white tracking-wide">AI Agent Active</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              {user?.location || 'Austin, TX'}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                id={`sidebar-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 group ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80 hover:border-slate-800'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.pulse && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  {item.badge && (
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom User Profile Card */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <Link
            to="/settings"
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-900/90 border border-transparent hover:border-slate-800 transition-colors group"
          >
            <img
              src={
                user?.avatarUrl ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              }
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-full object-cover border border-blue-500/30 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="overflow-hidden flex-1 text-left">
              <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                <span>{user?.name || 'Local Founder'}</span>
              </h4>
              <p className="text-[11px] text-slate-400 truncate">{user?.businessName || user?.email}</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </Link>

          <button
            type="button"
            id="sidebar-logout-button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-800/80 hover:border-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* MOBILE DRAWER */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-[#090d16] border-r border-slate-800 h-full flex flex-col z-10 p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <Link
                to="/dashboard"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-base">LeadPilot AI</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-1 rounded text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileNavOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">
                Logged in as <span className="text-white font-medium">{user?.email}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-red-400 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN APPLICATION VIEW */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#080c16]/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Workspace: <strong className="text-white font-medium">{user?.businessName || 'LeadPilot Workspace'}</strong>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Autonomous Lead Engine Running
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/agent"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live AI Feed</span>
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-colors relative"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#080c16]" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0b0f1a] border border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                      Recent Activity
                    </span>
                    <span className="text-[10px] text-blue-400">All caught up</span>
                  </div>
                  <div className="py-2 space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                      <p className="text-white font-medium">New high-intent lead discovered</p>
                      <p className="text-slate-400 text-[11px]">Premier Real Estate Group (97% Match)</p>
                      <span className="text-[10px] text-slate-500 font-mono">12 mins ago</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                      <p className="text-white font-medium">Appointment booked for 10:30 AM</p>
                      <p className="text-slate-400 text-[11px]">David Vance confirmed Discovery Call</p>
                      <span className="text-[10px] text-slate-500 font-mono">42 mins ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
