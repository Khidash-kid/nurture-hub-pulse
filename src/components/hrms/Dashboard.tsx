import { Users, UserCheck, CalendarOff, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { employees, attendanceRecords, leaveRequests, upcomingEvents } from '@/data/hrmsData';

export function Dashboard() {
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeaveCount = employees.filter(e => e.status === 'on-leave').length;
  const presentToday = attendanceRecords.filter(a => a.status === 'present').length;
  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length;
  
  const moodStats = {
    great: employees.filter(e => e.mood === 'great').length,
    good: employees.filter(e => e.mood === 'good').length,
    neutral: employees.filter(e => e.mood === 'neutral').length,
    stressed: employees.filter(e => e.mood === 'stressed').length,
    exhausted: employees.filter(e => e.mood === 'exhausted').length,
  };

  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={employees.length}
          subtitle={`${activeEmployees} active`}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="primary"
        />
        <StatCard
          title="Present Today"
          value={presentToday}
          subtitle={`of ${employees.length} employees`}
          icon={UserCheck}
          variant="success"
        />
        <StatCard
          title="On Leave"
          value={onLeaveCount}
          subtitle="Approved absences"
          icon={CalendarOff}
          variant="secondary"
        />
        <StatCard
          title="Pending Requests"
          value={pendingLeaves}
          subtitle="Awaiting approval"
          icon={Clock}
          variant="accent"
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Mood Overview */}
        <div className="hrms-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Team Mood Overview</h2>
            <span className="text-sm text-muted-foreground">Today</span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[
              { emoji: '😄', label: 'Great', count: moodStats.great, color: 'bg-success/15 text-success' },
              { emoji: '🙂', label: 'Good', count: moodStats.good, color: 'bg-primary/15 text-primary' },
              { emoji: '😐', label: 'Neutral', count: moodStats.neutral, color: 'bg-accent/15 text-accent' },
              { emoji: '😓', label: 'Stressed', count: moodStats.stressed, color: 'bg-warning/15 text-warning' },
              { emoji: '😩', label: 'Exhausted', count: moodStats.exhausted, color: 'bg-destructive/15 text-destructive' },
            ].map((mood) => (
              <div key={mood.label} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${mood.color} flex items-center justify-center text-3xl mb-2`}>
                  {mood.emoji}
                </div>
                <p className="text-sm font-medium">{mood.count}</p>
                <p className="text-xs text-muted-foreground">{mood.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="hrms-card">
          <h2 className="text-lg font-display font-semibold mb-4">Quick Insights</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
              <TrendingUp className="text-success" size={20} />
              <div>
                <p className="text-sm font-medium">Attendance Rate</p>
                <p className="text-xs text-muted-foreground">92% this week</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10">
              <AlertCircle className="text-warning" size={20} />
              <div>
                <p className="text-sm font-medium">Late Check-ins</p>
                <p className="text-xs text-muted-foreground">3 employees today</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-info/10">
              <Users className="text-info" size={20} />
              <div>
                <p className="text-sm font-medium">New Joiners</p>
                <p className="text-xs text-muted-foreground">2 this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="hrms-card">
          <h2 className="text-lg font-display font-semibold mb-4">Department Distribution</h2>
          <div className="space-y-3">
            {Object.entries(departmentCounts).map(([dept, count]) => {
              const percentage = Math.round((count / employees.length) * 100);
              return (
                <div key={dept}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{dept}</span>
                    <span className="text-sm text-muted-foreground">{count} employees</span>
                  </div>
                  <div className="hrms-progress">
                    <div
                      className="hrms-progress-bar bg-gradient-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="hrms-card">
          <h2 className="text-lg font-display font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.slice(0, 4).map((event) => {
              const eventColors = {
                birthday: 'bg-secondary/15 text-secondary',
                review: 'bg-info/15 text-info',
                meeting: 'bg-primary/15 text-primary',
                anniversary: 'bg-accent/15 text-accent',
              };
              const eventIcons = {
                birthday: '🎂',
                review: '📋',
                meeting: '📅',
                anniversary: '🎉',
              };
              return (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-10 h-10 rounded-xl ${eventColors[event.type]} flex items-center justify-center text-lg`}>
                    {eventIcons[event.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
