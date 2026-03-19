// components/shared/KPICard/KPICard.tsx
import styles from './KPICard.module.css';

export type KPICardVariant = 'total' | 'inProgress' | 'completed' | 'pending';

interface KPICardProps {
  title: string;
  value: number;
  variant: KPICardVariant; 
  icon?: string;
}

export const KPICard = ({ 
  title, 
  value, 
  variant,
  icon 
}: KPICardProps) => {
  return (
    <div className={`${styles.statsCard}`}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.value}>{value}</div>
    </div>
  );
};