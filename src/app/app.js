import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../reducers/index'; 
import bookingSlice from '../app/reducer';
import selectedVehicleSlice from '../app/vehicleReducer';
import carSliceLogic from '../app/carSlice';
import bookingSliceLogic from '../app/bookingSlice';
import userSliceLogic from '../app/userSlice';

const store = configureStore({
    reducer: {
            booking:bookingSlice,
            selectedVehicle:selectedVehicleSlice,
            carDataStore:carSliceLogic,
            bookingLogic:bookingSliceLogic,
            user:userSliceLogic
    }
});

export default store