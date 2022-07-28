import { GetOrders } from './ordersAPI'
import { RootState } from '../../app/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { OrderFields } from '@lucianopaci/nodeshop-types'
// TODO: Add Orders Type
export interface OrdersState {
  orders: OrderFields[]
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
  },
})

export default ordersSlice.reducer
