import { useState } from 'react';
import { Plus, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { leaveRequests as initialRequests, employees, LeaveRequest } from '@/data/hrmsData';
import { Modal } from './Modal';

export function LeaveManagement() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    employeeId: 'EMP001',
    type: 'annual' as LeaveRequest['type'],
    startDate: '',
    endDate: '',
    reason: '',
  });

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee?.name || 'Unknown';
  };

  const handleApprove = (id: string) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  const handleAddRequest = () => {
    if (!formData.startDate || !formData.endDate || !formData.reason) return;

    const newRequest: LeaveRequest = {
      id: `LV${String(requests.length + 1).padStart(3, '0')}`,
      employeeId: formData.employeeId,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    setRequests([newRequest, ...requests]);
    setIsAddModalOpen(false);
    setFormData({ employeeId: 'EMP001', type: 'annual', startDate: '', endDate: '', reason: '' });
  };

  const filteredRequests = requests.filter(req =>
    filterStatus === 'all' || req.status === filterStatus
  );

  const statusConfig = {
    pending: { icon: Clock, class: 'hrms-badge-warning', label: 'Pending' },
    approved: { icon: CheckCircle, class: 'hrms-badge-success', label: 'Approved' },
    rejected: { icon: XCircle, class: 'hrms-badge-destructive', label: 'Rejected' },
  };

  const typeColors = {
    annual: 'bg-primary/10 text-primary',
    sick: 'bg-destructive/10 text-destructive',
    personal: 'bg-info/10 text-info',
    maternity: 'bg-secondary/10 text-secondary',
    paternity: 'bg-accent/10 text-accent',
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">Review and manage leave requests</p>
        </div>
        <button className="hrms-btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} />
          New Request
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filterStatus === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-background/20 text-xs">
                {requests.filter(r => r.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Leave Cards */}
      <div className="grid gap-4">
        {filteredRequests.map((request) => {
          const config = statusConfig[request.status];
          const Icon = config.icon;
          const days = calculateDays(request.startDate, request.endDate);

          return (
            <div key={request.id} className="hrms-card">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{getEmployeeName(request.employeeId)}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[request.type]}`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                    <span className={config.class}>
                      <Icon size={12} className="inline mr-1" />
                      {config.label}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{request.reason}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{request.startDate} to {request.endDate}</span>
                    </div>
                    <span>•</span>
                    <span>{days} day{days > 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>Applied: {request.appliedOn}</span>
                  </div>
                </div>
                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="hrms-btn-primary px-4 py-2"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="px-4 py-2 rounded-lg border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filteredRequests.length === 0 && (
          <div className="hrms-card text-center py-12 text-muted-foreground">
            No leave requests found.
          </div>
        )}
      </div>

      {/* Add Request Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="New Leave Request">
        <form onSubmit={(e) => { e.preventDefault(); handleAddRequest(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Employee</label>
            <select
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="hrms-input"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Leave Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as LeaveRequest['type'] })}
              className="hrms-input"
            >
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
              <option value="maternity">Maternity Leave</option>
              <option value="paternity">Paternity Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="hrms-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="hrms-input"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="hrms-input min-h-[100px] resize-none"
              placeholder="Please provide a reason for your leave request..."
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="hrms-btn-outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="hrms-btn-primary">
              Submit Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
