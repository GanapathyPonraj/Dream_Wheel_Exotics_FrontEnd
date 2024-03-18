import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseURL } from "../constants";

const initialState = {
    userData: '',
    userDataFromLS: '',
    loading: false,
    error: '',
    favMessage: '',
    userLogIn: '',
    pageLocation:''
}

//Log In a User
export const logInUserToApp = createAsyncThunk(
    'user/login', async (userData) => {
        try{
            const response = await axios.post(`${baseURL}/api/register/logIn`, userData)
            return response.data
        }
        catch (error) {
           throw new Error(error.response.data.error)
          }
    }
)

//SignUp a User
export const SignUpUserToApp = createAsyncThunk(
    'user/SignUp', async (userData) => {
        return await axios.post(`${baseURL}/api/register/signUp`, userData).then((response) => response.data)
    }
)

//add Fav Car to User
export const addFavtoUser = createAsyncThunk(
    'user/addFavtoUser', async (userData) => {
        const config = {
            headers: {
                authorization: `Bearer ${userData.userToken}`
            }
        }
        return await axios.post(`${baseURL}/api/user/fav`, userData, config).then((response) => response.data)
    }
)

//remove Fav Car From User
export const removeFavFromUser = createAsyncThunk(
    'user/removeFavFromUser', async (userData) => {
        const config = {
            headers: {
                authorization: `Bearer ${userData.userToken}`
            }
        }
        return await axios.post(`${baseURL}/api/user/removefav`, userData, config).then((response) => response.data)
    }
)

//Add Pic To User
export const addPicToUser = createAsyncThunk(
    'user/addPicToUser', async (data) => {
        const config = {
            headers: {
                authorization: `Bearer ${data.userToken}`
            }
        }
        return await axios.post(`${baseURL}/api/user/pic`, data, config).then((response) => response.data)
    }
)


export const getUserDetails = createAsyncThunk(
    'user/getUserDetails', async (userId1) => {
        return await axios.get(`${baseURL}/api/user/`, { headers: { authorization: `Bearer ${userId1.token}` } }).then((response) => response.data)
    }
)

const userSliceLogic = createSlice(
    {
        name: 'userList',
        initialState,
        reducers: {
            saveUserData: (state, { payload }) => {
                state.userDataFromLS = JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null)
            },
            logoutUserData: (state) => {
                state.userData = null
                state.userDataFromLS = null
                state.userLogIn = null
            },
            updatePageLocation:(state,action) => {
                // console.log('updatedLocation',action.payload);
                state.pageLocation = action.payload
            }
        },
        extraReducers: (builder) => {
            //LogIn User
            builder.addCase(logInUserToApp.pending, (state) => {
                state.loading = true
            })
            builder.addCase(logInUserToApp.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload))
                state.error = null
                state.userLogIn = action.payload
                state.loading = false
            })
            builder.addCase(logInUserToApp.rejected, (state, action) => {
                state.loading = false
                state.userLogIn = null
                state.error = action.error.message
                throw new Error('Failed To LogIn')
            })

            //SignUp User
            builder.addCase(SignUpUserToApp.pending, (state) => {
                state.loading = true
            })
            builder.addCase(SignUpUserToApp.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload))
                state.error = null
                state.userLogIn = action.payload
                state.loading = false
            })
            builder.addCase(SignUpUserToApp.rejected, (state, action) => {
                state.loading = false
                state.userLogIn = null
                state.error = action.error.message
            })

            //add fav cars to users
            builder.addCase(addFavtoUser.pending, (state) => {
                state.loading = true
            })
            builder.addCase(addFavtoUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload.userTemp
                state.error = ''
            })
            builder.addCase(addFavtoUser.rejected, (state, action) => {
                state.loading = false
                //state.userData = []
                state.error = action.error.message
            })


            //remove fav cars from users
            builder.addCase(removeFavFromUser.pending, (state) => {
                state.loading = true
            })
            builder.addCase(removeFavFromUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload.userTemp
                state.error = ''
            })
            builder.addCase(removeFavFromUser.rejected, (state, action) => {
                state.loading = false
                // state.userData = []
                state.error = action.error.message
            })

            //add Pics to users
            builder.addCase(addPicToUser.pending, (state) => {
                state.loading = true
            })
            builder.addCase(addPicToUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload.data
                state.error = ''
            })
            builder.addCase(addPicToUser.rejected, (state, action) => {
                state.loading = false
                // state.userData = []
                state.error = action.error.message
            })

            //get user details
            builder.addCase(getUserDetails.pending, (state) => {
                state.loading = true
            })
            builder.addCase(getUserDetails.fulfilled, (state, action) => {
                const response = action.payload
                delete response.password
                state.userData = response
                state.error = ''
                state.loading = false
            })
            builder.addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false
                // state.userData = []
                state.error = action.error.message
            })
        }
    })

export const { saveUserData, logoutUserData,updatePageLocation } = userSliceLogic.actions

export default userSliceLogic.reducer
