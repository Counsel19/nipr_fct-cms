import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllApprovedMembers,
  fetchAllPendingMembers,
  fetchAllPaidMembers,
  fetchAllActiveMembers,
  fetchAllInactiveMembers,
} from "./membersManagementThunk";
import { IMembership } from "@/types/membership";

interface membersManagementSliceState {
  pendingMembers: IMembership[] | null;
  approvedMembers: IMembership[] | null;
  paidMembers: IMembership[] | null;
  activeMembers: IMembership[] | null;
  inactiveMembers: IMembership[] | null;
  selectedMember: IMembership | null;
  redirectPath: string;
  isLoading: boolean;
  token: string | null;
  otp: string;
  showLoginModal: boolean;
  error: string;
}

const initialState: membersManagementSliceState = {
  pendingMembers: null,
  approvedMembers: null,
  paidMembers: null,
  activeMembers: null,
  inactiveMembers: null,
  selectedMember: null,
  isLoading: false,
  redirectPath: "/",
  token: sessionStorage.getItem("authToken") || "",
  otp: "",
  showLoginModal: true,
  error: "",
};

const membersManagementSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSelectedMember: (state, action) => {
      state.selectedMember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllApprovedMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllApprovedMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvedMembers = action.payload;
      })
      .addCase(fetchAllApprovedMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })
      .addCase(fetchAllPendingMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPendingMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingMembers = action.payload;
      })
      .addCase(fetchAllPendingMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(fetchAllActiveMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllActiveMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeMembers = action.payload;
      })
      .addCase(fetchAllActiveMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })
      .addCase(fetchAllPaidMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPaidMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paidMembers = action.payload;
      })
      .addCase(fetchAllPaidMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })
      .addCase(fetchAllInactiveMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllInactiveMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inactiveMembers = action.payload;
      })
      .addCase(fetchAllInactiveMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      });
  },
});

export const { setSelectedMember } = membersManagementSlice.actions;

export default membersManagementSlice.reducer;
