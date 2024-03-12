import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    selectedVehicleState:{
        _id:'',
        carId: '',
        brand: '',
        carName: '',
        favouriteCount: '',
        seats: '',
        transmission: '',
        doors: '',
        carType: '',
        dailyRate: 0,
        carIamge: '',
        fav: false
    },
    priceDetails:{
        total:0,
        perDay:0,
        taxes:0,
        totalWithTax:0,
        NoOfDates:0,
    }
}

const selectedVehicleSlice = createSlice({
    name:'selectedVehicle',
    initialState,
    reducers:{
        saveSelectedVehicle:(state,{payload}) => {
            state.selectedVehicleState = Object.assign(state.selectedVehicleState, payload)
        },
        updatePriceDetails:(state,{payload}) => {
            state.priceDetails = Object.assign(state.priceDetails, payload)
        },
    }
})

export const { saveSelectedVehicle,updatePriceDetails} = selectedVehicleSlice.actions

export default selectedVehicleSlice.reducer;