import styles from './Avatar.module.css';
import { PASTELCOLORS } from '@/shared/config/colors';

interface AvatarProps {
  label: string;
  colorIndex?: number;
}

export const Avatar = ({ label, colorIndex = 0 }: AvatarProps) => {
    const bgColor = PASTELCOLORS[colorIndex % PASTELCOLORS.length];

    return (
        <div 
            className={styles.avatar}
            // Передаем цвет как CSS-переменную
            style={{ '--avatar-bg': bgColor } as React.CSSProperties}
        >
            {label}
        </div>
    ); 
};