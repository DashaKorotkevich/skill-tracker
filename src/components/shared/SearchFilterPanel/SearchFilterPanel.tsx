// components/shared/Filter/Filter.tsx
import { Input } from '@components/ui';
import styles from './SearchFilterPanel.module.css';

export type SearchFilterPanelVariant = 'tasks' | 'users' | 'tests';

interface SearchFilterPanelProps {
  variant: SearchFilterPanelVariant;
}

export const SearchFilterPanel = ({ 
  variant
}: SearchFilterPanelProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.ItemContainer}>
                <p>Поиск</p>
                {variant === 'tasks' && (
                    <Input placeholder='Поиск по названию или описанию' variant='search'/>
                )}
            </div>
            {/*
            {variant === 'users' && (
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
            )}*/}
            {/*
            {variant === 'tests' && (
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
            */}
        </div>
    )
}