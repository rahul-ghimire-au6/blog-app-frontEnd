import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    commentData: [],
    loading: false,
    error: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    fetchAllComment: (state, action) => {
      state.commentData = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload.errMessage;
      state.loading = false;
    },
  },
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentReducer, commentActions };