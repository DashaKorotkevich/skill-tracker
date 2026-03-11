// components/Layout/index.tsx

import { Header } from './Header';
import { SideBar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export const Layout = () => {
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