import { createSlice } from "@reduxjs/toolkit";
import {
  createNewEvent,
  deleteEvent,
  fetchAllEvents,
  fetchEventById,
  fetchEventWithAttendace,
  updateEvent,
  updateEventImage,
} from "./eventsThunk";
import { IEvent, IEventWithAttendace } from "@/types/event";

interface gradeSliceState {
  isLoading: boolean;
  allEvents: IEvent[] | null;
  allEventsWithAttendace: IEventWithAttendace[] | null;
  singleEvent: IEvent | null;
  error: string;
}

// type UserProfileKeys = keyof UserProfile;

const initialState: gradeSliceState = {
  isLoading: false,
  allEvents: null,
  singleEvent: null,
  allEventsWithAttendace: null,
  error: "",
};

const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.allEvents = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(fetchEventById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.singleEvent = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(fetchEventWithAttendace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEventWithAttendace.fulfilled, (state, action) => {
        state.allEventsWithAttendace = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchEventWithAttendace.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(createNewEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewEvent.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(updateEventImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEventImage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateEventImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      })

      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "";
      });
  },
});

// export const {} = gradeSlice.actions;

export default gradeSlice.reducer;
