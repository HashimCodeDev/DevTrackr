import { ProjectStatus } from '@/types/project';

interface StatusBadgeProps {
  status: ProjectStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
    ACTIVE: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Active' },
    COMPLETED: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Completed' }
  };

  const config = statusConfig[status];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}