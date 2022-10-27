import { IEmail } from '@lucianopaci/nodeshop-types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { GetEmails } from './emailsAPI'

export interface EmailsState {
  emails: IEmail[]
  error: any
  status: 'idle' | 'loading' | 'failed'
}
const initialState: EmailsState = {
  emails: [],
  error: null,
  status: 'idle',
}
/* Async Fn */

export const fetchEmails = createAsyncThunk('emails/fetchEmails', async () => {
  const response = await GetEmails()
  return response.data
})

/* Selectors */
export const selectEmailsState = (state: RootState) => state.emails

/* Slice */
export const emailsSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.status = 'idle'
        state.emails = action.payload
      })
      .addCase(fetchEmails.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default emailsSlice.reducer
