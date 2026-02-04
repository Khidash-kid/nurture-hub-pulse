import { useState } from 'react';
import { Sidebar } from '@/components/hrms/Sidebar';
import { Dashboard } from '@/components/hrms/Dashboard';
import { EmployeeManagement } from '@/components/hrms/EmployeeManagement';
import { AttendanceTracker } from '@/components/hrms/AttendanceTracker';
import { LeaveManagement } from '@/components/hrms/LeaveManagement';
import { Notifications } from '@/components/hrms/Notifications';
import { MoodTracker } from '@/components/hrms/MoodTracker';
import { SkillMatrix } from '@/components/hrms/SkillMatrix';
import { UpcomingEvents } from '@/components/hrms/UpcomingEvents';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeManagement />;
      case 'attendance':
        return <AttendanceTracker />;
      case 'leave':
        return <LeaveManagement />;
      case 'notifications':
        return <Notifications />;
      case 'mood':
        return <MoodTracker />;
      case 'skills':
        return <SkillMatrix />;
      case 'events':
        return <UpcomingEvents />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 lg:ml-0 overflow-x-hidden">
        <div className="p-6 lg:p-8 pt-20 lg:pt-8 max-w-7xl mx-auto">
          {renderSection()}
          
        </div>
      </main>
    </div>
  );
};

export default Index;
