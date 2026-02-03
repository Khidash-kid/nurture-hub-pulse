import { useState } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, AlertCircle, Check, Trash2 } from 'lucide-react';
import { notifications as initialNotifications, Notification } from '@/data/hrmsData';

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const typeConfig = {
    info: { icon: Info, class: 'bg-info/10 text-info border-info/20' },
    warning: { icon: AlertTriangle, class: 'bg-warning/10 text-warning border-warning/20' },
    success: { icon: CheckCircle, class: 'bg-success/10 text-success border-success/20' },
    alert: { icon: AlertCircle, class: 'bg-destructive/10 text-destructive border-destructive/20' },
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="hrms-btn-outline">
            <Check size={16} />
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;

          return (
            <div
              key={notification.id}
              className={`hrms-card flex items-start gap-4 transition-all ${
                !notification.read ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${config.class}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                    <p className="text-xs text-muted-foreground/70 mt-2">{formatTime(notification.timestamp)}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-primary"
                        title="Mark as read"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 transition-colors text-destructive"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              )}
            </div>
          );
        })}
        {notifications.length === 0 && (
          <div className="hrms-card text-center py-12">
            <Bell size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
