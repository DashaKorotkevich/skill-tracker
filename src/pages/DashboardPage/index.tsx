// pages/DashboardPage.tsx
import styles  from "./Dashboard.module.css";
import { useUserStore } from '@stores/user';

export const DashboardPage = () => {
    const { user } = useUserStore();
    const isAdmin = useUserStore(state => state.isAdmin());
    console.log(isAdmin)
    return (
        <div className={styles.container}>
            <h1 className={styles.welcomeTitle}>
                Добро пожаловать, {user?.name}! 👋
            </h1>
            <p> {(isAdmin)? 'Вы управляете проектами' : 'Ваши задачи'}</p>
            <div className={styles.statsCards}>
                <div className={styles.statsCard}>
                    <p>Всего</p>
                </div>
                <div className={styles.statsCard}>
                    <p>В работе</p>
                </div>
                <div className={styles.statsCard}>
                    <p>Завершено</p>
                </div>
                <div className={styles.statsCard}>
                    <p>Ожидают</p>
                </div>
            </div>
        </div>
    )
};