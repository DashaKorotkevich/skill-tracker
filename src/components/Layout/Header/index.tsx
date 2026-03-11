// components/layout/Header/index.tsx
import { useEffect } from 'react';
import { useAuthStore } from '@stores/auth';
import { useUserStore } from '@stores/user';
import { useNotificationStore } from '@stores/notification';
import styles from './Header.module.css';
import { CircleCheck, Bell } from 'lucide-react';
import { UserAvatar } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const { user } = useUserStore();
    const { unreadCount,  fetchNotifications } = useNotificationStore();

    useEffect(() => {
        fetchNotifications();
    }, []);

    
    console.log('🔔 unreadCount из стора:', unreadCount);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className={styles.container}>
            <div className={styles.itemsContainer}>
                <div className={styles.logo}>
                    <CircleCheck className={styles.logoIcon} />
                </div>
                <span>SkillTracker</span>
            </div>
            
            <div className={styles.itemsContainer}>
                <button className={styles.bellButton} data-count={unreadCount}>
                    <Bell className={styles.bellIcon} />
                </button>
                <div className={styles.accContainer}>
                    <UserAvatar />
                    <div className={styles.accInfoContainer}>
                        <p>{user?.name || 'Иван Иванов'}</p>
                        <p>{user?.role || 'акк'}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className={styles.logoutText}>
                    Выйти
                </button>
            </div>
        </header>
    );
};