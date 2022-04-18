import { SidebarDrawerContext } from 'contexts/DrawerContext';
import { useContext } from 'react';

export const useDrawer = () => useContext(SidebarDrawerContext);
