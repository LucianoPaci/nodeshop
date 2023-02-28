import { RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import Orders from '../../features/orders'
import Home from '../components/Home'
import Emails from '../../features/emails'
import NotFound from '../components/404'
export type CustomRouteObject = RouteObject & {
  title: string
}
const childrenRoutes: CustomRouteObject[] = [
  {
    index: true,
    path: '/',
    title: 'Orders',
    element: <Orders />,
  },
  {
    path: '/emails',
    title: 'Emails',
    element: <Emails />,
  },
  {
    path: '/home',
    title: 'Home',
    element: <Home />,
  },
  {
    path: '*',
    title: 'Not Found',
    element: <NotFound />,
  },
]

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: childrenRoutes,
  },
]

export default routes
