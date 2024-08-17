import { createSlice } from "@reduxjs/toolkit";
import {
  addResource,
  deleteResources,
  fetchResource,
  fetchSingleResource,
} from "./resourceThunk";
import { IResource } from "@/types/resource";

interface resourceSliceState {
  isLoading: boolean;
  allResources: IResource[] | null;
  selectedResourceItem: IResource | null;
  error: string;
}

// type UserProfileKeys = keyof UserProfile;

const initialState: resourceSliceState = {
  isLoading: false,
  allResources: null,
  selectedResourceItem: null,
  error: "",
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    selectResource: (state, action) => {
      state.selectedResourceItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchResource.fulfilled, (state, action) => {
        state.allResources = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })
      .addCase(fetchSingleResource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleResource.fulfilled, (state, action) => {
        state.selectedResourceItem = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(addResource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addResource.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addResource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(deleteResources.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteResources.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteResources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      });
  },
});

export const { selectResource } = resourceSlice.actions;

export default resourceSlice.reducer;
