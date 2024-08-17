import { createSlice } from "@reduxjs/toolkit";
import {
  createGrade,
  deleteGrade,
  fetchAllGrades,
  fetchGradeById,
  updateGrade,
} from "./gradeThunk";
import { IGrade } from "@/types/grade";

interface gradeSliceState {
  isLoading: boolean;
  allGrades: IGrade[] | null;
  singleGrade: IGrade | null;
  error: string;
}

// type UserProfileKeys = keyof UserProfile;

const initialState: gradeSliceState = {
  isLoading: false,
  allGrades: null,
  singleGrade: null,
  error: "",
};

const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGrades.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllGrades.fulfilled, (state, action) => {
        state.allGrades = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllGrades.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(fetchGradeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGradeById.fulfilled, (state, action) => {
        state.singleGrade = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGradeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(createGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGrade.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(updateGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGrade.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(deleteGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGrade.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      });
  },
});

// export const {} = gradeSlice.actions;

export default gradeSlice.reducer;
