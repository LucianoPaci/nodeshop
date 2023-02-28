import { ReactElement, useEffect, useMemo, useState } from 'react'
import { OrderFields } from '@lucianopaci/nodeshop-types'
import { Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
// import Card from '../../app/components/Card'
import DataTable from '../../app/components/Table'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchOrders, selectOrdersState, postOrder } from './ordersSlice'
import CustomDrawer from '../../app/components/Drawer'

type Props = {}

const Orders = (props: Props) => {
  const dispatch = useAppDispatch()
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const { orders, status } = useAppSelector(selectOrdersState)
  const form = useForm({
    initialValues: {
      userEmail: '',
      itemName: '',
      itemPrice: '',
      itemsQuantity: 0,
    },
  })

  const handleSubmit = (values: any) => {
    console.log('Values', values)
    dispatch(postOrder(values))
  }
  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  // const displayItems: ReactElement[] = useMemo(() => {
  //   return (orders || []).map((order: OrderFields, key: number) => (
  //     <Card key={key} data={JSON.stringify(order)} />
  //   ))
  // }, [orders])

  if (status !== 'idle') {
    return <div style={{ fontSize: 24 }}>LOADING...</div>
  }

  return (
    <>
      {/* <Stack justify={'flex-start'}>{displayItems}</Stack> */}
      <div
        style={{
          margin: `16px 0px`,
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
        <CustomDrawer
          form={form}
          onHandleSubmit={handleSubmit}
          status={status}
          onHandleOpen={setOpenDrawer}
          open={openDrawer}
        />
      </div>

      <DataTable elements={orders} />
    </>
  )
}

export default Orders
