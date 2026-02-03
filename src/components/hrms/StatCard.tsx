import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = 'primary' }: StatCardProps) {
  const variantClasses = {
    primary: 'hrms-stat-card',
    secondary: 'hrms-stat-card secondary',
    accent: 'hrms-stat-card accent',
    success: 'hrms-stat-card success',
  };

  const iconBgClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
  };

  return (
    <div className={`${variantClasses[variant]} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-display font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-sm ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBgClasses[variant]} flex items-center justify-center`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
