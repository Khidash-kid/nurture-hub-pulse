import { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, MinusCircle } from 'lucide-react';
import { attendanceRecords as initialRecords, employees, AttendanceRecord } from '@/data/hrmsData';

export function AttendanceTracker() {
  const [records] = useState<AttendanceRecord[]>(initialRecords);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee?.name || 'Unknown';
  };

  const getEmployeeAvatar = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee?.avatar || '??';
  };

  const statusConfig = {
    present: { icon: CheckCircle2, class: 'text-success bg-success/10', label: 'Present' },
    late: { icon: AlertCircle, class: 'text-warning bg-warning/10', label: 'Late' },
    absent: { icon: XCircle, class: 'text-destructive bg-destructive/10', label: 'Absent' },
    'half-day': { icon: MinusCircle, class: 'text-info bg-info/10', label: 'Half Day' },
  };

  const stats = {
    present: records.filter(r => r.status === 'present').length,
    late: records.filter(r => r.status === 'late').length,
    absent: records.filter(r => r.status === 'absent').length,
    halfDay: records.filter(r => r.status === 'half-day').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Track daily attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-muted-foreground" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="hrms-input w-auto"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="hrms-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="text-success" size={24} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold">{stats.present}</p>
            <p className="text-sm text-muted-foreground">Present</p>
          </div>
        </div>
        <div className="hrms-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
            <AlertCircle className="text-warning" size={24} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold">{stats.late}</p>
            <p className="text-sm text-muted-foreground">Late</p>
          </div>
        </div>
        <div className="hrms-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <XCircle className="text-destructive" size={24} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold">{stats.absent}</p>
            <p className="text-sm text-muted-foreground">Absent</p>
          </div>
        </div>
        <div className="hrms-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
            <MinusCircle className="text-info" size={24} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold">{stats.halfDay}</p>
            <p className="text-sm text-muted-foreground">Half Day</p>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="hrms-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="hrms-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const config = statusConfig[record.status];
                const Icon = config.icon;
                
                // Calculate hours worked
                let hours = '-';
                if (record.checkIn !== '-' && record.checkOut !== '-') {
                  const [inH, inM] = record.checkIn.split(':').map(Number);
                  const [outH, outM] = record.checkOut.split(':').map(Number);
                  const diff = (outH * 60 + outM) - (inH * 60 + inM);
                  hours = `${Math.floor(diff / 60)}h ${diff % 60}m`;
                }

                return (
                  <tr key={record.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {getEmployeeAvatar(record.employeeId)}
                        </div>
                        <div>
                          <p className="font-medium">{getEmployeeName(record.employeeId)}</p>
                          <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-muted-foreground" />
                        <span>{record.checkIn}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-muted-foreground" />
                        <span>{record.checkOut}</span>
                      </div>
                    </td>
                    <td>{hours}</td>
                    <td>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.class}`}>
                        <Icon size={14} />
                        <span className="text-sm font-medium">{config.label}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
