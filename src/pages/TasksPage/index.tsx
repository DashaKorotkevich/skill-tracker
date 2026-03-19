// pages/TasksPage.tsx
import styles  from "./TaskPage.module.css";
import { useUserStore } from '@stores/user';
import { SearchFilterPanel } from '@components/shared'

export const TasksPage = () => {
    const isAdmin = useUserStore(state => state.isAdmin());

    return(
        <div className={styles.container}>
            <h1>Задачи</h1>
            <p> {(isAdmin)? 'Управление задачами и проектами' : 'Ваши задачи'}</p>
            <SearchFilterPanel variant="tasks"/>
        </div>
    )
}