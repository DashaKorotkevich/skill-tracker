// components/PageLayout/index.tsx

import { Header } from './Header';
import { SideBar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export const PageLayout = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <SideBar/>
        <Outlet/>
      </div>
    </div>
  );
};