import { useState } from 'react';
import { Search, Star, TrendingUp } from 'lucide-react';
import { employees, departments } from '@/data/hrmsData';

export function SkillMatrix() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.skills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = filterDept === 'all' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  // Get all unique skills across employees
  const allSkills = [...new Set(employees.flatMap(e => e.skills.map(s => s.name)))];

  // Calculate top skills
  const topSkills = allSkills.map(skill => {
    const avgLevel = employees
      .filter(e => e.skills.some(s => s.name === skill))
      .reduce((sum, e) => sum + (e.skills.find(s => s.name === skill)?.level || 0), 0) /
      employees.filter(e => e.skills.some(s => s.name === skill)).length;
    const count = employees.filter(e => e.skills.some(s => s.name === skill)).length;
    return { name: skill, avgLevel: Math.round(avgLevel), count };
  }).sort((a, b) => b.avgLevel - a.avgLevel).slice(0, 6);

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-success';
    if (level >= 75) return 'bg-primary';
    if (level >= 60) return 'bg-accent';
    if (level >= 45) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  const getSkillBadge = (level: number) => {
    if (level >= 90) return { label: 'Expert', class: 'hrms-badge-success' };
    if (level >= 75) return { label: 'Advanced', class: 'hrms-badge-primary' };
    if (level >= 60) return { label: 'Intermediate', class: 'hrms-badge-info' };
    return { label: 'Beginner', class: 'hrms-badge-warning' };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Skill Matrix</h1>
        <p className="text-muted-foreground">View and analyze team competencies</p>
      </div>

      {/* Top Skills Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {topSkills.map((skill, index) => (
          <div key={skill.name} className="hrms-card p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {index < 3 && <Star className="text-accent" size={14} />}
              <span className="text-2xl font-display font-bold">{skill.avgLevel}%</span>
            </div>
            <p className="text-sm font-medium truncate">{skill.name}</p>
            <p className="text-xs text-muted-foreground">{skill.count} people</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="hrms-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search employees or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hrms-input pl-10"
            />
          </div>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="hrms-input w-auto"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="hrms-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                {employee.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">{employee.position}</p>
                <span className="hrms-badge-primary text-xs">{employee.department}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp size={14} />
                  <span className="text-sm font-medium">
                    {Math.round(employee.skills.reduce((sum, s) => sum + s.level, 0) / employee.skills.length)}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Avg. Skill</p>
              </div>
            </div>
            <div className="space-y-3">
              {employee.skills.map((skill) => {
                const badge = getSkillBadge(skill.level);
                return (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={badge.class}>{badge.label}</span>
                        <span className="text-sm text-muted-foreground w-10 text-right">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="hrms-progress">
                      <div
                        className={`hrms-progress-bar ${getSkillColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="hrms-card text-center py-12 text-muted-foreground">
          No employees found matching your criteria.
        </div>
      )}
    </div>
  );
}
