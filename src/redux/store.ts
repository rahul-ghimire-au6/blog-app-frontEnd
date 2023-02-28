import { configureStore } from '@reduxjs/toolkit';
import { commentReducer } from './slice/commentSlice';
import { blogReducer } from './slice/blogSlice';
import { userReducer } from './slice/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    comment: commentReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;