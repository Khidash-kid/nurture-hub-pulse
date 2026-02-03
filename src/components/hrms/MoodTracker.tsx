import { useState } from 'react';
import { employees as initialEmployees, Employee } from '@/data/hrmsData';

const moods = [
  { id: 'great', emoji: '😄', label: 'Great', color: 'bg-success/15 text-success ring-success/30' },
  { id: 'good', emoji: '🙂', label: 'Good', color: 'bg-primary/15 text-primary ring-primary/30' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: 'bg-accent/15 text-accent ring-accent/30' },
  { id: 'stressed', emoji: '😓', label: 'Stressed', color: 'bg-warning/15 text-warning ring-warning/30' },
  { id: 'exhausted', emoji: '😩', label: 'Exhausted', color: 'bg-destructive/15 text-destructive ring-destructive/30' },
] as const;

export function MoodTracker() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const updateMood = (employeeId: string, mood: Employee['mood']) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId ? { ...emp, mood } : emp
    ));
  };

  const moodStats = moods.map(mood => ({
    ...mood,
    count: employees.filter(e => e.mood === mood.id).length,
    percentage: Math.round((employees.filter(e => e.mood === mood.id).length / employees.length) * 100),
  }));

  const averageMoodIndex = () => {
    const moodValues = { great: 5, good: 4, neutral: 3, stressed: 2, exhausted: 1 };
    const total = employees.reduce((sum, emp) => sum + (moodValues[emp.mood || 'neutral']), 0);
    return (total / employees.length).toFixed(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Mood Tracker</h1>
        <p className="text-muted-foreground">Monitor team well-being and morale</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="hrms-card lg:col-span-2">
          <h2 className="text-lg font-display font-semibold mb-4">Mood Distribution</h2>
          <div className="space-y-4">
            {moodStats.map((mood) => (
              <div key={mood.id} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${mood.color.split(' ')[0]} flex items-center justify-center text-2xl`}>
                  {mood.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{mood.label}</span>
                    <span className="text-sm text-muted-foreground">{mood.count} employees ({mood.percentage}%)</span>
                  </div>
                  <div className="hrms-progress h-3">
                    <div
                      className={`hrms-progress-bar ${mood.color.split(' ')[0].replace('/15', '')}`}
                      style={{ width: `${mood.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hrms-card">
          <h2 className="text-lg font-display font-semibold mb-4">Team Wellness Score</h2>
          <div className="text-center py-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(parseFloat(averageMoodIndex()) / 5) * 352} 352`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <p className="text-3xl font-display font-bold">{averageMoodIndex()}</p>
                  <p className="text-xs text-muted-foreground">out of 5</p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {parseFloat(averageMoodIndex()) >= 4 ? 'Team is doing great!' :
               parseFloat(averageMoodIndex()) >= 3 ? 'Room for improvement' :
               'Needs attention'}
            </p>
          </div>
        </div>
      </div>

      {/* Employee Mood Cards */}
      <div className="hrms-card">
        <h2 className="text-lg font-display font-semibold mb-4">Individual Mood Check-in</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {employees.map((employee) => {
            const currentMood = moods.find(m => m.id === employee.mood);
            
            return (
              <div key={employee.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {employee.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{employee.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{employee.department}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 justify-center">
                  {moods.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => updateMood(employee.id, mood.id)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl transition-all ${
                        employee.mood === mood.id
                          ? `${mood.color} ring-2`
                          : 'hover:bg-background/80'
                      }`}
                      title={mood.label}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
