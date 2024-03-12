import { createSlice } from '@reduxjs/toolkit'
// const now = 
// var currentDate = new Date();
const date = new Date();
const pickupDateString = new Date().toISOString();
const dropOffDateString = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

const initialState = {
    bookingValue: {
        location: '1171 Kenaston Street,Ottawa,K1B 4A6',
        dropOffDate: dropOffDateString,
        dropOffTime: date.getHours()+ ':' + date.getMinutes() ,
        pickupDate: pickupDateString,
        pickupTime: date.getHours()+ ':' + date.getMinutes(),
    },
    mapValue: [45.421001, -75.625580],
    contactDetails:'',
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        saveBookingDetails: (state, { payload }) => {
            state.bookingValue = Object.assign(state.bookingValue, payload)
        },
        saveMapCoordinates: (state, { payload }) => {
            state.mapValue = payload 
        },
        saveContact:(state, { payload }) => {
            state.contactDetails = payload
        },
    }
}
)

export const { saveBookingDetails, saveMapCoordinates,saveContact,updateSteps } = bookingSlice.actions

export default bookingSlice.reducer;