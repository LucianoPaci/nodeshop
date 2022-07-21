import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchOrders, selectOrdersState } from './ordersSlice'
type Props = {}

const Orders = (props: Props) => {
  const dispatch = useAppDispatch()
  const { orders, status } = useAppSelector(selectOrdersState)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <>
      {status !== 'idle' ? (
        <div style={{ fontSize: 24 }}>LOADING...</div>
      ) : orders.length > 0 ? (
        <div>{JSON.stringify(orders, null, 2)}</div>
      ) : (
        <div>Orders</div>
      )}
    </>
  )
}

export default Orders
