import { Outlet } from 'react-router-dom';
import { DefaultMenu } from '../components/Menu/DefaultMenu';

export function DefaultLayout() {
  return (
    // @ts-ignore
    <DefaultMenu>
      <Outlet />
    </DefaultMenu>
  );
}