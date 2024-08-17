import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/auth/authSlice";
import DialogSlice from "./slices/dialogSlice";
import MembersManagementSlice from "./slices/membershipManagement/membersManagementSlice";
import GradeSlice from "./slices/grade/gradeSlice";
import EventSlice from "./slices/events/eventsSlice";
import NewsPostSlice from "./slices/news/newsSlice";
import GallerySlice from "./slices/gallery/gallerySlice";
import ResourceSlice from "./slices/resource/resourceSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    membershipManagement: MembersManagementSlice,
    dialog: DialogSlice,
    grade: GradeSlice,
    event: EventSlice,
    newsPost: NewsPostSlice,
    gallery: GallerySlice,
    resource: ResourceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
