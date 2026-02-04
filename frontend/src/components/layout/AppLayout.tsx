import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// -- Sidebar Item Component --
const SidebarItem = ({ icon: Icon, label, path }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <button
      onClick={() => navigate(path)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
        isActive 
          ? "bg-primary-50 text-primary-600" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
};

// -- Main Layout Component --
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center px-6 border-b border-gray-100">
           <span className="font-bold text-lg text-gray-900">Glucolens</span>
        </div>
        <div className="px-3 py-6 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" />
          <SidebarItem icon={Activity} label="New Assessment" path="/assessment" />
          <SidebarItem icon={Settings} label="Settings" path="/settings" />
        </div>
        <div className="absolute bottom-4 left-0 w-full px-3">
          <div className="mb-2 px-3 py-2 flex items-center gap-3 rounded-lg bg-gray-50 border border-gray-100">
             <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {user?.name?.[0] || 'U'}
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
             </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => { logout(); navigate('/auth/login'); }}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64 w-full">
        <div className="container mx-auto p-8 max-w-7xl animate-in fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};