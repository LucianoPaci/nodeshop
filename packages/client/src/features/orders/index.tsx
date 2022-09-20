import { OrderFields } from '@lucianopaci/nodeshop-types'
import { Stack } from '@mantine/core'
import { ReactElement, useEffect, useMemo } from 'react'
import Card from '../../app/components/Card'
import DataTable from '../../app/components/Table'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchOrders, selectOrdersState } from './ordersSlice'

type Props = {}

const Orders = (props: Props) => {
  const dispatch = useAppDispatch()
  const { orders, status } = useAppSelector(selectOrdersState)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const displayItems: ReactElement[] = useMemo(() => {
    return (orders || []).map((order: OrderFields, key: number) => (
      <Card key={key} data={JSON.stringify(order)} />
    ))
  }, [orders])

  if (status !== 'idle') {
    return <div style={{ fontSize: 24 }}>LOADING...</div>
  }

  return (
    <>
      {/* <Stack justify={'flex-start'}>{displayItems}</Stack> */}
      <DataTable elements={orders} />
    </>
  )
}

export default Orders
