import type {TaskStatus, UserRole, AttemptTestStatus, TestStatus} from '@shared/types'

export type StatusVariant = 'task' | 'user' | 'attempt' | 'test';
export type StatusValue = TaskStatus | UserRole | AttemptTestStatus | TestStatus;

interface StatusProps {
  variant: StatusVariant;
  value: StatusValue;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

// Создаем тип для элемента конфига
type StatusConfigItem = {
  label: string;
  color: string;
  icon: string;
};

// Типизируем конфиг
const statusConfig: Record<StatusVariant, Record<string, StatusConfigItem>> = {
  task: {
    pending: { label: 'В ожидании', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
    in_progress: { label: 'В процессе', color: 'bg-blue-100 text-blue-800', icon: '🔄' },
    completed: { label: 'Завершено', color: 'bg-green-100 text-green-800', icon: '✅' },
    blocked: { label: 'Заблокировано', color: 'bg-red-100 text-red-800', icon: '⛔' }
  },
  user: {
    admin: { label: 'Администратор', color: 'bg-purple-100 text-purple-800', icon: '👑' },
    manager: { label: 'Менеджер', color: 'bg-blue-100 text-blue-800', icon: '⚡' },
    user: { label: 'Пользователь', color: 'bg-gray-100 text-gray-800', icon: '👤' }
  },
  attempt: {
    in_progress: { label: 'В процессе', color: 'bg-blue-100 text-blue-800', icon: '📝' },
    completed: { label: 'Завершен', color: 'bg-green-100 text-green-800', icon: '✓' },
    expired: { label: 'Истек', color: 'bg-orange-100 text-orange-800', icon: '⌛' }
  },
  test: {
    draft: { label: 'Черновик', color: 'bg-gray-100 text-gray-800', icon: '📄' },
    published: { label: 'Опубликован', color: 'bg-green-100 text-green-800', icon: '📢' },
    archived: { label: 'В архиве', color: 'bg-gray-100 text-gray-800', icon: '📦' }
  }
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
};

// Type guard функция
function isValidConfigKey(
  variantConfig: Record<string, StatusConfigItem>,
  key: string
): key is keyof typeof variantConfig {
  return key in variantConfig;
}

export const Status = ({
  variant,
  value,
  size = 'md',
  showLabel = true,
  className = ''
}: StatusProps) => {
  const variantConfig = statusConfig[variant];
  const valueKey = String(value);
  
  // Используем type guard
  if (isValidConfigKey(variantConfig, valueKey)) {
    const config = variantConfig[valueKey];
    
    return (
      <div className={`
        inline-flex items-center gap-1.5 
        rounded-full font-medium 
        ${config.color} 
        ${sizeClasses[size]} 
        ${className}
      `}>
        <span>{config.icon}</span>
        {showLabel && <span>{config.label}</span>}
      </div>
    );
  }

  // Fallback для неизвестных статусов
  return (
    <span className={`
      inline-flex items-center 
      rounded-full bg-gray-100 
      px-2 py-1 text-sm text-gray-800 
      ${className}
    `}>
      {String(value)}
    </span>
  );
};