export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  avatar: string;
  mood?: 'great' | 'good' | 'neutral' | 'stressed' | 'exhausted';
  skills: { name: string; level: number }[];
  birthday: string;
  phone: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'late' | 'absent' | 'half-day';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Event {
  id: string;
  type: 'birthday' | 'review' | 'meeting' | 'anniversary';
  title: string;
  date: string;
  employeeId?: string;
}

export const employees: Employee[] = [
  {
    id: 'EMP001',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2022-03-15',
    status: 'active',
    avatar: 'SC',
    mood: 'great',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 70 },
    ],
    birthday: '1990-02-14',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 'EMP002',
    name: 'Marcus Johnson',
    email: 'marcus.j@company.com',
    department: 'Design',
    position: 'UI/UX Lead',
    joinDate: '2021-07-20',
    status: 'active',
    avatar: 'MJ',
    mood: 'good',
    skills: [
      { name: 'Figma', level: 98 },
      { name: 'UI Design', level: 95 },
      { name: 'Prototyping', level: 88 },
      { name: 'CSS', level: 80 },
    ],
    birthday: '1988-05-22',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 'EMP003',
    name: 'Emily Watson',
    email: 'emily.w@company.com',
    department: 'HR',
    position: 'HR Manager',
    joinDate: '2020-01-10',
    status: 'active',
    avatar: 'EW',
    mood: 'neutral',
    skills: [
      { name: 'Recruitment', level: 92 },
      { name: 'Training', level: 88 },
      { name: 'Communication', level: 95 },
      { name: 'Conflict Resolution', level: 85 },
    ],
    birthday: '1985-11-03',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 'EMP004',
    name: 'David Kim',
    email: 'david.k@company.com',
    department: 'Engineering',
    position: 'DevOps Engineer',
    joinDate: '2023-02-28',
    status: 'on-leave',
    avatar: 'DK',
    mood: 'stressed',
    skills: [
      { name: 'AWS', level: 90 },
      { name: 'Docker', level: 92 },
      { name: 'Kubernetes', level: 85 },
      { name: 'CI/CD', level: 88 },
    ],
    birthday: '1992-08-17',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 'EMP005',
    name: 'Lisa Thompson',
    email: 'lisa.t@company.com',
    department: 'Marketing',
    position: 'Marketing Director',
    joinDate: '2019-11-05',
    status: 'active',
    avatar: 'LT',
    mood: 'good',
    skills: [
      { name: 'Digital Marketing', level: 95 },
      { name: 'Content Strategy', level: 90 },
      { name: 'SEO', level: 85 },
      { name: 'Analytics', level: 82 },
    ],
    birthday: '1987-02-08',
    phone: '+1 (555) 567-8901',
  },
  {
    id: 'EMP006',
    name: 'Alex Rivera',
    email: 'alex.r@company.com',
    department: 'Finance',
    position: 'Financial Analyst',
    joinDate: '2022-09-12',
    status: 'active',
    avatar: 'AR',
    mood: 'great',
    skills: [
      { name: 'Financial Modeling', level: 93 },
      { name: 'Excel', level: 98 },
      { name: 'SQL', level: 80 },
      { name: 'Reporting', level: 88 },
    ],
    birthday: '1991-06-25',
    phone: '+1 (555) 678-9012',
  },
  {
    id: 'EMP007',
    name: 'Jordan Blake',
    email: 'jordan.b@company.com',
    department: 'Engineering',
    position: 'Frontend Developer',
    joinDate: '2023-06-01',
    status: 'active',
    avatar: 'JB',
    mood: 'exhausted',
    skills: [
      { name: 'JavaScript', level: 88 },
      { name: 'React', level: 85 },
      { name: 'CSS', level: 90 },
      { name: 'Vue.js', level: 75 },
    ],
    birthday: '1995-12-10',
    phone: '+1 (555) 789-0123',
  },
  {
    id: 'EMP008',
    name: 'Mia Foster',
    email: 'mia.f@company.com',
    department: 'Sales',
    position: 'Sales Executive',
    joinDate: '2021-04-18',
    status: 'active',
    avatar: 'MF',
    mood: 'good',
    skills: [
      { name: 'Negotiation', level: 94 },
      { name: 'CRM', level: 88 },
      { name: 'Presentation', level: 90 },
      { name: 'Client Relations', level: 92 },
    ],
    birthday: '1989-09-30',
    phone: '+1 (555) 890-1234',
  },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ATT001', employeeId: 'EMP001', date: '2024-01-15', checkIn: '09:02', checkOut: '18:15', status: 'present' },
  { id: 'ATT002', employeeId: 'EMP002', date: '2024-01-15', checkIn: '09:30', checkOut: '18:00', status: 'late' },
  { id: 'ATT003', employeeId: 'EMP003', date: '2024-01-15', checkIn: '08:55', checkOut: '17:45', status: 'present' },
  { id: 'ATT004', employeeId: 'EMP004', date: '2024-01-15', checkIn: '-', checkOut: '-', status: 'absent' },
  { id: 'ATT005', employeeId: 'EMP005', date: '2024-01-15', checkIn: '09:00', checkOut: '18:30', status: 'present' },
  { id: 'ATT006', employeeId: 'EMP006', date: '2024-01-15', checkIn: '08:45', checkOut: '12:30', status: 'half-day' },
  { id: 'ATT007', employeeId: 'EMP007', date: '2024-01-15', checkIn: '09:15', checkOut: '19:00', status: 'late' },
  { id: 'ATT008', employeeId: 'EMP008', date: '2024-01-15', checkIn: '08:58', checkOut: '17:55', status: 'present' },
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: 'LV001',
    employeeId: 'EMP004',
    type: 'sick',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    reason: 'Medical appointment and recovery',
    status: 'approved',
    appliedOn: '2024-01-14',
  },
  {
    id: 'LV002',
    employeeId: 'EMP001',
    type: 'annual',
    startDate: '2024-02-10',
    endDate: '2024-02-14',
    reason: 'Family vacation',
    status: 'pending',
    appliedOn: '2024-01-12',
  },
  {
    id: 'LV003',
    employeeId: 'EMP006',
    type: 'personal',
    startDate: '2024-01-15',
    endDate: '2024-01-15',
    reason: 'Personal errand',
    status: 'approved',
    appliedOn: '2024-01-10',
  },
  {
    id: 'LV004',
    employeeId: 'EMP007',
    type: 'annual',
    startDate: '2024-01-22',
    endDate: '2024-01-26',
    reason: 'Traveling abroad',
    status: 'pending',
    appliedOn: '2024-01-08',
  },
  {
    id: 'LV005',
    employeeId: 'EMP002',
    type: 'sick',
    startDate: '2024-01-05',
    endDate: '2024-01-06',
    reason: 'Flu symptoms',
    status: 'approved',
    appliedOn: '2024-01-05',
  },
];

export const notifications: Notification[] = [
  {
    id: 'NOT001',
    type: 'info',
    title: 'New Leave Request',
    message: 'Sarah Chen has submitted a leave request for review',
    timestamp: '2024-01-15T10:30:00',
    read: false,
  },
  {
    id: 'NOT002',
    type: 'success',
    title: 'Payroll Processed',
    message: 'January payroll has been successfully processed for all employees',
    timestamp: '2024-01-15T09:00:00',
    read: false,
  },
  {
    id: 'NOT003',
    type: 'warning',
    title: 'Attendance Alert',
    message: '3 employees have been marked late today',
    timestamp: '2024-01-15T09:45:00',
    read: true,
  },
  {
    id: 'NOT004',
    type: 'alert',
    title: 'Document Expiring',
    message: 'Employment contract for David Kim expires in 30 days',
    timestamp: '2024-01-14T16:00:00',
    read: true,
  },
  {
    id: 'NOT005',
    type: 'info',
    title: 'Team Meeting',
    message: 'Monthly all-hands meeting scheduled for tomorrow at 2 PM',
    timestamp: '2024-01-14T14:30:00',
    read: true,
  },
];

export const upcomingEvents: Event[] = [
  { id: 'EVT001', type: 'birthday', title: 'Lisa Thompson\'s Birthday', date: '2024-02-08', employeeId: 'EMP005' },
  { id: 'EVT002', type: 'birthday', title: 'Sarah Chen\'s Birthday', date: '2024-02-14', employeeId: 'EMP001' },
  { id: 'EVT003', type: 'review', title: 'Q1 Performance Reviews', date: '2024-02-01' },
  { id: 'EVT004', type: 'meeting', title: 'All Hands Meeting', date: '2024-01-20' },
  { id: 'EVT005', type: 'anniversary', title: 'Emily Watson - 4 Years', date: '2024-01-10', employeeId: 'EMP003' },
];

export const departments = ['Engineering', 'Design', 'HR', 'Marketing', 'Finance', 'Sales'];
export const positions = ['Developer', 'Senior Developer', 'Lead', 'Manager', 'Director', 'Analyst', 'Executive'];
