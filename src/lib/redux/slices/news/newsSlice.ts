import { createSlice } from "@reduxjs/toolkit";
import {
  createNewsPost,
  deleteNewsPost,
  fetchAllNewsPost,
  fetchNewsPostById,
  updateNewsPost,
  updateNewsPostImage,
} from "./newsThunk";
import { INews } from "@/types/news";

interface newsSliceState {
  isLoading: boolean;
  allNewsPost: INews[] | null;
  singleNewsPost: INews | null;
  error: string;
}

// type UserProfileKeys = keyof UserProfile;

const initialState: newsSliceState = {
  isLoading: false,
  allNewsPost: null,
  singleNewsPost: null,
  error: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNewsPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllNewsPost.fulfilled, (state, action) => {
        state.allNewsPost = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllNewsPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(fetchNewsPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNewsPostById.fulfilled, (state, action) => {
        state.singleNewsPost = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNewsPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(createNewsPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewsPost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewsPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(updateNewsPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNewsPost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateNewsPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(updateNewsPostImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNewsPostImage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateNewsPostImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(deleteNewsPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNewsPost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNewsPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      });
  },
});

// export const {} = newsSlice.actions;

export default newsSlice.reducer;
