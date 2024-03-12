import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseURL } from "../constants";

const initialState = {
    bookingData: '',
    allBookings: '',
    loading: false,
    error: '',
    allBookingloading: false,
    allBookingerror: ''
}

//creating the api call / thunk
export const createBooking = createAsyncThunk(
    'book/createBookingEntry', async (bookingData) => {
        const config = {
            headers: {
                authorization: `Bearer ${bookingData.user}`
            }
        }
        return await axios.post(`${baseURL}/api/booking/`, bookingData, config).then((response) => response.data)
    }
)

export const getAllBooking = createAsyncThunk(
    'book/getAllBooking', async (userId) => {
        const config = {
            headers: {
                authorization: `Bearer ${userId}`
            }
        }
        return await axios.get(`${baseURL}/api/booking/`,config).then((response) => response.data)
    }
)

const bookingSliceLogic = createSlice({
    name: 'bookingList',
    initialState,
    extraReducers: (builder) => {

        //Create Booking
        builder.addCase(createBooking.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createBooking.fulfilled, (state, action) => {
            state.loading = false
            state.bookingData = action.payload
            state.error = ''
        })
        builder.addCase(createBooking.rejected, (state, action) => {
            state.loading = false
            state.bookingData = []
            state.error = action.error.message
            throw new Error('Reservation Failed')
        })

        //Get all Booking
        builder.addCase(getAllBooking.pending, (state) => {
            state.allBookingloading = true
        })
        builder.addCase(getAllBooking.fulfilled, (state, action) => {
            state.allBookingloading = false
            state.allBookings = action.payload
            state.allBookingerror = ''
        })
        builder.addCase(getAllBooking.rejected, (state, action) => {
            state.allBookingloading = false
            state.allBookings = []
            state.allBookingerror = action.error.message
        })
    }
})

export default bookingSliceLogic.reducer
