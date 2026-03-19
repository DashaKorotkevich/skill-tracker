// pages/DashboardPage.tsx
import styles  from "./Dashboard.module.css";
import { useUserStore } from '@stores/user';
import { useTasksStore } from "@/stores/tasks";
import { useEffect } from 'react';
import { KPICard } from "@/components/ui";
import { Link, useNavigate } from 'react-router-dom';
import { TaskCard } from "@/components/shared";

export const DashboardPage = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const tasks = useTasksStore(state => state.getTasksByStatus());
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const isAdmin = useUserStore(state => state.isAdmin());
    const totalCount = useTasksStore(state => state.getCountTasksByStatus());
    const inProgress = useTasksStore(state => state.getCountTasksByStatus('in_progress'));
    const completed = useTasksStore(state => state.getCountTasksByStatus('done'));
    const pending = useTasksStore(state => state.getCountTasksByStatus('pending'));
    console.log(isAdmin)

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div className={styles.container}>
            <h1 className={styles.welcomeTitle}>
                Добро пожаловать, {user?.name}! 👋
            </h1>
            <p> {(isAdmin)? 'Вы управляете проектами' : 'Ваши задачи'}</p>
            <div className={styles.flexBetween}>
                <KPICard  
                    title="Всего" 
                    value={totalCount}
                    variant="total"
                    icon="📋"
                />
                <KPICard  
                    title="В работе" 
                    value={inProgress}
                    variant="inProgress"
                    icon="📋"
                />
                <KPICard  
                    title="Завершено" 
                    value={completed}
                    variant="completed"
                    icon="📋"
                />
                <KPICard  
                    title="Ожидают" 
                    value={pending}
                    variant="pending"
                    icon="📋"
                />
            </div>
            <div className={styles.flexBetween}>
                <p>Последние задачи</p>
                <Link to="/tasks" className={styles.viewAllLink}>
                    Посмотреть все →
                </Link>
            </div>
            <div className={styles.tasksGrid}>
                {tasks.map(task => (
                    <TaskCard 
                        key={task.id} 
                        task={task}
                        variant="compact"
                        /*onClick={() => navigate(`/tasks/${task.id}`)}*/
                    />
                ))}
            </div>
            
            {/* Если задач нет */}
            {tasks.length === 0 && (
                <div className={styles.emptyState}>
                    Пока нет задач!
                </div>
            )}
        </div>
    )
};