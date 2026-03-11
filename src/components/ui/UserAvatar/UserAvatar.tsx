import { useAuthStore } from '@stores/auth';
import styles from './UserAvatar.module.css';

export const UserAvatar = () => {
    const { user } = useAuthStore();
    
    if (!user) return null;
    
    const initials = (user.name || user.username).slice(0, 2).toUpperCase();
    
    const colors = [
    '#FECACA',
    '#FEF3C7',
    '#D1FAE5',
    '#DBEAFE',
    '#E9D5FF',
    '#FFEDD5',
    '#CFFAFE', 
    '#FCE7F3', 
    '#D9F99D', 
    '#E0E7FF', 
    ];
    
    const colorIndex = user.username
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    
    return (
        <div 
            className={styles.avatar}
            style={{ backgroundColor: colors[colorIndex] }}
            title={user.name || user.username}
        >
            {initials}
        </div>
    );
};