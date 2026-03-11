// components/layout/SideBar/index.tsx
import styles from './SideBar.module.css'
import { NavLink } from 'react-router-dom'

const navigation = [
  { path: '/', label: 'Дашборд'},
  { path: '/tasks', label: 'Задачи'},
  { path: '/users', label: 'Пользователи'},
  { path: '/tests', label: 'Тесты'},
];

export const SideBar = () => {
    return (
         <aside className={`${styles.container} ${styles.sideBar}`}>
            <nav className={styles.nav}>
                {navigation.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => 
                        `${styles.link} ${isActive ? styles.active : ''}`
                        }
                    >
                        <span className={styles.label}>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
};