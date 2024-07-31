import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/auth/authSlice";
import DialogSlice from "./slices/dialogSlice";
import MembersManagementSlice from "./slices/membershipManagement/membersManagementSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    membershipManagement: MembersManagementSlice,
    dialog: DialogSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
