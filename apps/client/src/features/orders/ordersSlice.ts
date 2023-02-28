import { GetOrders, PostOrder } from './ordersAPI'
import { RootState } from '../../app/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IOrder } from '@lucianopaci/nodeshop-types'
// TODO: Add Orders Type
export interface OrdersState {
  orders: IOrder[]
  error: any
  status: 'idle' | 'loading' | 'failed'
}
const initialState: OrdersState = {
  orders: [],
  error: null,
  status: 'idle',
}

/* Async Fn*/

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await GetOrders()
  return response.data
})

export const postOrder = createAsyncThunk(
  'orders/postOrder',
  async (data: any) => {
    const response = await PostOrder(data)
    return response.data
  }
)

/* Selectors */
export const selectOrdersState = (state: RootState) => state.orders

/* Slice */
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(postOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orders = [...state.orders, action.payload]
      })
      .addCase(postOrder.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default ordersSlice.reducer
