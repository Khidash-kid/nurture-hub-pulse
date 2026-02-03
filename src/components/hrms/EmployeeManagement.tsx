import { useState } from 'react';
import { Plus, Search, Eye, Trash2, Filter } from 'lucide-react';
import { employees as initialEmployees, departments, Employee } from '@/data/hrmsData';
import { Modal } from './Modal';

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    position: '',
    phone: '',
    birthday: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'all' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.position.trim()) errors.position = 'Position is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEmployee = () => {
    if (!validateForm()) return;

    const newEmployee: Employee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      department: formData.department,
      position: formData.position,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      mood: 'neutral',
      skills: [],
      birthday: formData.birthday || '1990-01-01',
      phone: formData.phone,
    };

    setEmployees([...employees, newEmployee]);
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', department: 'Engineering', position: '', phone: '', birthday: '' });
    setFormErrors({});
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const statusColors = {
    active: 'hrms-badge-success',
    'on-leave': 'hrms-badge-warning',
    inactive: 'hrms-badge-destructive',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground">Manage your team members</p>
        </div>
        <button className="hrms-btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Search and Filter */}
      <div className="hrms-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hrms-input pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
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
      </div>

      {/* Employee Table */}
      <div className="hrms-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="hrms-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {employee.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <span className={statusColors[employee.status]}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </span>
                  </td>
                  <td>{employee.joinDate}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewEmployee(employee)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-primary"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 transition-colors text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEmployees.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No employees found matching your criteria.
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Employee">
        <form onSubmit={(e) => { e.preventDefault(); handleAddEmployee(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`hrms-input ${formErrors.name ? 'border-destructive' : ''}`}
              placeholder="John Doe"
            />
            {formErrors.name && <p className="text-sm text-destructive mt-1">{formErrors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`hrms-input ${formErrors.email ? 'border-destructive' : ''}`}
              placeholder="john@company.com"
            />
            {formErrors.email && <p className="text-sm text-destructive mt-1">{formErrors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="hrms-input"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position *</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className={`hrms-input ${formErrors.position ? 'border-destructive' : ''}`}
                placeholder="Developer"
              />
              {formErrors.position && <p className="text-sm text-destructive mt-1">{formErrors.position}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`hrms-input ${formErrors.phone ? 'border-destructive' : ''}`}
                placeholder="+1 (555) 123-4567"
              />
              {formErrors.phone && <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Birthday</label>
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                className="hrms-input"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="hrms-btn-outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="hrms-btn-primary">
              Add Employee
            </button>
          </div>
        </form>
      </Modal>

      {/* View Employee Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Employee Details">
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                {selectedEmployee.avatar}
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold">{selectedEmployee.name}</h3>
                <p className="text-muted-foreground">{selectedEmployee.position}</p>
                <span className={statusColors[selectedEmployee.status]}>
                  {selectedEmployee.status.charAt(0).toUpperCase() + selectedEmployee.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{selectedEmployee.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{selectedEmployee.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{selectedEmployee.department}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium">{selectedEmployee.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employee ID</p>
                <p className="font-medium">{selectedEmployee.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Birthday</p>
                <p className="font-medium">{selectedEmployee.birthday}</p>
              </div>
            </div>
            {selectedEmployee.skills.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Skills</p>
                <div className="space-y-2">
                  {selectedEmployee.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="hrms-progress">
                        <div className="hrms-progress-bar bg-gradient-primary" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
