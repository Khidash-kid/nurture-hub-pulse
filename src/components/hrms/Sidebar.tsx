import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  CalendarOff, 
  Bell, 
  SmilePlus, 
  BarChart3, 
  Calendar,
  Menu,
  X,
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'attendance', label: 'Attendance', icon: CalendarClock },
  { id: 'leave', label: 'Leave Management', icon: CalendarOff },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'mood', label: 'Mood Tracker', icon: SmilePlus },
  { id: 'skills', label: 'Skill Matrix', icon: BarChart3 },
  { id: 'events', label: 'Upcoming Events', icon: Calendar },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-sidebar flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-sidebar-foreground">
                PeopleHub
              </h1>
              <p className="text-xs text-sidebar-foreground/60">HR Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsMobileOpen(false);
                }}
                className={`hrms-sidebar-item w-full ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {item.id === 'notifications' && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
                    2
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-medium">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                admin@company.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
