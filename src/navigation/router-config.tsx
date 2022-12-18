import { Route, Routes } from 'react-router-dom';
import AddressBook from '../pages/address-book/AddressBook';
import DashBoard from '../pages/dash-board/DashBoard';
import Eos from '../pages/eos/Eos';
import ReceiveHome from '../pages/receive/receive-home/ReceiveHome';
import SendAnonimize from '../pages/send/anonymize/SendAnonymize';
import SendDeAnonimize from '../pages/send/de-anonymize/SendDeAnonimize';
import SendHome from '../pages/send/send-home/SendHome';
import Transactions from '../pages/transactions/Transactions';
import { AppRoutes } from './app-routes';

export const routes = [
    {
        path: AppRoutes.Default,
        component: DashBoard,
    },
    {
        path: AppRoutes.Dashboard,
        component: DashBoard,
    },
    {
        path: AppRoutes.Eos,
        component: Eos,
    },
    {
        path: AppRoutes.Send,
        children: [
            { path: AppRoutes.Default, component: SendHome },
            { path: AppRoutes.Anonymize, component: SendAnonimize },
            { path: AppRoutes.DeAnonymize, component: SendDeAnonimize },
        ],
    },
    {
        path: AppRoutes.Receive,
        children: [
            { path: AppRoutes.Default, component: ReceiveHome },
        ],
    },
    {
        path: AppRoutes.Transactions,
        component: Transactions,
    },
    {
        path: AppRoutes.AddressBook,
        component: AddressBook,
    },
];

export const RouterConfig = () => {
    return (
        <Routes>
            {routes.map((route, index) => {
                if(route.component && !route.children ) {
                    return (<Route key={index} path={route.path} element={<route.component />}/>)
                }
                return (<Route path={route.path} key={index}>
                    {route.children && !route.component && route.children.length > 0 && route.children.map((child, index) => (
                        <Route key={index} path={route.path + child.path} element={<child.component />} />
                    ))}
                </Route>)
            })}
        </Routes>
    );
};