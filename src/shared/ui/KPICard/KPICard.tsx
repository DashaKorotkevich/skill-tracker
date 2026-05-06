// src/shared/ui/KPICard/KPICard.tsx
import type { ReactNode } from 'react';
import styles from './KPICard.module.css';

export interface KPICardProps {
  title: string;
  value: number | string;
  // Передаем цвет числа напрямую или через готовый вариант
  valueColor?: string; 
  icon?: ReactNode;
  className?: string;
}

export const KPICard = ({ 
  title, 
  value, 
  valueColor = 'inherit', // По умолчанию цвет черный (наследуется)
  icon, 
  className 
}: KPICardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.topRow}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      {/* Применяем цвет динамически через style или классы */}
      <div className={styles.value} style={{ color: valueColor }}>
        {value}
      </div>
    </div>
  );
};