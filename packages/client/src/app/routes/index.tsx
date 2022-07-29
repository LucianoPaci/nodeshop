import { RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import Orders from '../../features/orders'
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
    element: <h3>Emails</h3>,
  },
  {
    path: '*',
    title: 'Not Found',
    element: <h2>Flasheaste amigo</h2>,
  },
]

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: childrenRoutes,
  },
]

export default routes
