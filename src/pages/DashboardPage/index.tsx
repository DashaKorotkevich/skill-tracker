// pages/DashboardPage.tsx
import styles  from "./Dashboard.module.css";
import { useUserStore } from '@stores/user';
import { useTasksStore } from "@/stores/tasks";
import { useEffect } from 'react';
import { KPICard } from "@/shared/ui/KPICard/KPICard";
import { Clipboard, Zap, CircleCheck, Clock4 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TaskCard } from "@/components/shared";
import { COLORS } from '@/shared/config/colors';
import { TASK_STATUS_COLORS } from '@/entities/task/model/consts';

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
                    icon={<Clipboard size={20} color={COLORS.orange}/>} 
                    valueColor={COLORS.orange}
                />
                <KPICard  
                    title="В работе" 
                    value={inProgress}
                    icon={<Zap size={20} color={TASK_STATUS_COLORS.inProgress}/>} 
                    valueColor={TASK_STATUS_COLORS.inProgress}
                />
                <KPICard  
                    title="Завершено" 
                    value={completed}
                    icon={<CircleCheck size={20} color={TASK_STATUS_COLORS.completed}/>} 
                    valueColor={TASK_STATUS_COLORS.completed}
                />
                <KPICard  
                    title="Ожидают" 
                    value={pending}
                    icon={<Clock4 size={20} color={TASK_STATUS_COLORS.pending}/>} 
                    valueColor={TASK_STATUS_COLORS.pending}
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