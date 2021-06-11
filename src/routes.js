import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import FriendList from 'src/pages/FriendList';
import Dashboard from 'src/pages/Dashboard';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Settings from 'src/pages/Settings';
import Home from 'src/pages/homepage';
import Login from 'src/pages/signinpage';
import Register from 'src/pages/signuppage';
import Group from 'src/pages/Group';

const routes = (sendMessage, chatMessages, messageIds) => [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'group', element: <Group message={sendMessage} chat={chatMessages} ids={messageIds}/>},
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <FriendList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'group', element: <Group />},
      { path: '', element: <Home />},
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
];

export default routes;
