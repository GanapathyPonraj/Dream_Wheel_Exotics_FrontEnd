import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseURL } from "../constants";

const initialState = {
    carData: '',
    loading: false,
    getAllCarloading:false,
    error: '',
    carEntry: '',
    carsAvailable: '',
    updateStatus: ''
}

//FAV values  Update and Delete

export const addFavCountToCar = createAsyncThunk(
    'fleet/addFavCountToCar', async (Data) => {
        return await axios.post(`${baseURL}/api/carRental/addFavouriteCount`, Data).then((response) => response.data)
    }
)

export const removeFavCountToCar = createAsyncThunk(
    'fleet/removeFavCountToCar', async (Data) => {
        return await axios.post(`${baseURL}/api/carRental/removeFavouriteCount`, Data).then((response) => response.data)
    }
)

//creating the api call / thunk
export const createCarEntries = createAsyncThunk(
    'fllets/createCarEntry', async (carData) => {
        return await axios.post(`${baseURL}/api/carRental/`, carData).then((response) => response.data)
    }
)

export const getAllCarWithAvailability = createAsyncThunk(
    'fleet/getAllCarWithAvailability', async (selectedDate) => {
        return await axios.get(`${baseURL}/api/carRental/dates`, { params: { selectedDate1: selectedDate } }).then((response) => response.data)
    }
)



const carSliceLogic = createSlice({
    name: 'carsList',
    initialState,
    extraReducers: (builder) => {
        
        //add fav count
        builder.addCase(addFavCountToCar.fulfilled, (state, action) => {
            const index = state.carData.findIndex(car => car._id === action.payload._id);
            if (index !== -1) {
                state.carData.splice(index, 1, action.payload);
            } else {
                state.carData.push(action.payload.carTemp);
            }
            state.loading = false
            state.error = ''
        })

        //subtract fav count
        builder.addCase(removeFavCountToCar.fulfilled, (state, action) => {
            const index = state.carData.findIndex(car => car._id === action.payload._id);
            if (index !== -1) {
                state.carData.splice(index, 1, action.payload);
            } else {
                state.carData.push(action.payload.carTemp);
            }
            state.loading = false
            state.error = ''
        })

        //get all cars based on dates
        
        builder.addCase(getAllCarWithAvailability.pending, (state) => {
            state.getAllCarloading = true
        })
        builder.addCase(getAllCarWithAvailability.fulfilled, (state, action) => {
            state.getAllCarloading = false
            state.carData = action.payload
            state.error = ''
        })
        builder.addCase(getAllCarWithAvailability.rejected, (state, action) => {
            state.getAllCarloading = false
            state.carData = []
            state.error = action.error.message
        })

        //create Car Entry
        builder.addCase(createCarEntries.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createCarEntries.fulfilled, (state, action) => {
            state.loading = false
            state.carEntry = action.payload
            state.error = ''
        })
        builder.addCase(createCarEntries.rejected, (state, action) => {
            state.loading = false
            state.carEntry = []
            state.error = action.error.message
        })

    }
})
export const { updateCarData } = carSliceLogic.actions

export default carSliceLogic.reducer