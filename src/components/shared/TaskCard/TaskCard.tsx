// components/shared/TaskCard/TaskCard.tsx
import styles from './TaskCard.module.css';
import type { Task } from '@shared/types';
import { Status } from '@components/ui';

export type TaskCardVariant = 'full' | 'compact';

interface TaskCardProps {
  task: Task;
  variant?: TaskCardVariant; // по умолчанию 'compact'
  onClick?: () => void;
}

export const TaskCard = ({ 
  task, 
  variant = 'compact',
  onClick 
}: TaskCardProps) => {

  // Форматирование даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указан';
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  // Получение имени сотрудника
  const getEmployeeName = () => {
    if (task.employee?.name) return task.employee.name;
    if (task.employee?.username) return task.employee.username;
    return `ID: ${task.employee_id}`;
  };

  // Статус на русском
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Ожидает',
      in_progress: 'В работе',
      done: 'Завершено',
    };
    return statusMap[status] || status;
  };

  return (
    <div>
      {/* ===== КОМПАКТНАЯ ВЕРСИЯ ===== */}
      {variant === 'compact' && (
        <div className={styles.compactContainer}>
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{task.title}</h3>
            {task.deadline && (
                <div className={styles.deadline}>
                    Дедлайн: {formatDate(task.deadline)}
                </div>
            )}
            {task.employee?.username && (
                <div className={styles.deadline}>
                    Кому: {task.employee.username}
                </div>
            )}
          </div>
          <div className={styles.cardContent}>
            <Status variant='task' value={task.status}></Status>
          </div>
        </div>
      )}

      {/* ===== ПОЛНАЯ ВЕРСИЯ ===== */}
      {variant === 'full' && (
        <div className={styles.compactContainer}>
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{task.title}</h3>
            {task.deadline && (
                <div className={styles.deadline}>
                    Дедлайн: {formatDate(task.deadline)}
                </div>
            )}
            {task.employee?.username && (
                <div className={styles.deadline}>
                    {task.employee.username}
                </div>
            )}
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.compactTitle}>{task.created_at}</h3>
          </div>
        </div>
      )}
    </div>
  );
};