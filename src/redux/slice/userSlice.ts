import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    loading: false,
    error: "",
    success: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    login: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    register: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    setUserDetails: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    logout: (state, action) => {
      state.userInfo = {};
    },
    setError: (state, action) => {
      state.error = action.payload.errMessage;
      state.loading = false;
    },
  },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userReducer, userActions };