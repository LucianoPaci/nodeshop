import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import ordersReducer from '../features/orders/ordersSlice'
import emailsReducer from '../features/emails/emailsSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    emails: emailsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
