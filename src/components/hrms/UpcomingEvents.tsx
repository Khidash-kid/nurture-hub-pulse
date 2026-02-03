import { useState } from 'react';
import { Calendar, Cake, ClipboardList, Users, Award, Plus } from 'lucide-react';
import { upcomingEvents as initialEvents, employees, Event } from '@/data/hrmsData';
import { Modal } from './Modal';

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [filterType, setFilterType] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'meeting' as Event['type'],
    date: '',
    employeeId: '',
  });

  const eventConfig = {
    birthday: { icon: Cake, class: 'bg-secondary/15 text-secondary', label: 'Birthday' },
    review: { icon: ClipboardList, class: 'bg-info/15 text-info', label: 'Review' },
    meeting: { icon: Users, class: 'bg-primary/15 text-primary', label: 'Meeting' },
    anniversary: { icon: Award, class: 'bg-accent/15 text-accent', label: 'Anniversary' },
  };

  const filteredEvents = events
    .filter(e => filterType === 'all' || e.type === filterType)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddEvent = () => {
    if (!formData.title || !formData.date) return;

    const newEvent: Event = {
      id: `EVT${String(events.length + 1).padStart(3, '0')}`,
      type: formData.type,
      title: formData.title,
      date: formData.date,
      employeeId: formData.employeeId || undefined,
    };

    setEvents([...events, newEvent]);
    setIsAddModalOpen(false);
    setFormData({ title: '', type: 'meeting', date: '', employeeId: '' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getDaysUntil = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff < 0) return 'Passed';
    return `In ${diff} days`;
  };

  // Group events by month
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Upcoming Events</h1>
            <p className="text-muted-foreground">Birthdays, reviews, and team events</p>
          </div>
        </div>
        <button className="hrms-btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'birthday', 'review', 'meeting', 'anniversary'].map((type) => {
          const config = type !== 'all' ? eventConfig[type as keyof typeof eventConfig] : null;
          const Icon = config?.icon;
          
          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                filterType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }`}
            >
              {Icon && <Icon size={16} />}
              {type === 'all' ? 'All Events' : config?.label}
            </button>
          );
        })}
      </div>

      {/* Events Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
          <div key={month}>
            <h2 className="text-lg font-display font-semibold mb-4 text-muted-foreground">{month}</h2>
            <div className="space-y-3">
              {monthEvents.map((event) => {
                const config = eventConfig[event.type];
                const Icon = config.icon;
                const employee = event.employeeId ? employees.find(e => e.id === event.employeeId) : null;
                const daysUntil = getDaysUntil(event.date);
                const isPast = daysUntil === 'Passed';

                return (
                  <div
                    key={event.id}
                    className={`hrms-card flex items-center gap-4 ${isPast ? 'opacity-60' : ''}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${config.class} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{formatDate(event.date)}</span>
                        {employee && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{employee.department}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={`text-right flex-shrink-0 ${
                      daysUntil === 'Today' ? 'text-success' :
                      daysUntil === 'Tomorrow' ? 'text-primary' :
                      isPast ? 'text-muted-foreground' : 'text-muted-foreground'
                    }`}>
                      <p className="text-sm font-medium">{daysUntil}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <div className="hrms-card text-center py-12 text-muted-foreground">
            <Calendar size={48} className="mx-auto mb-4 opacity-30" />
            <p>No events found</p>
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Event">
        <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="hrms-input"
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
                className="hrms-input"
              >
                <option value="meeting">Meeting</option>
                <option value="birthday">Birthday</option>
                <option value="review">Review</option>
                <option value="anniversary">Anniversary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="hrms-input"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Related Employee (Optional)</label>
            <select
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="hrms-input"
            >
              <option value="">None</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="hrms-btn-outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="hrms-btn-primary">
              Add Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
