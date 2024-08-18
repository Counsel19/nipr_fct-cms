import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateNews from "./pages/CreateNews";
import ViewNews from "./pages/ViewNews";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import PendingMembership from "./pages/PendingMembership";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import ApprovedMembership from "./pages/ApprovedMembership";
import PaidMembership from "./pages/PaidMembersip";
import InactiveMembership from "./pages/InactiveMembership";
import ActiveMembersip from "./pages/ActiveMembership";
import ViewApplication from "./pages/ViewApplication";
import AllEvents from "./pages/AllEvents";
import CreateEvent from "./pages/CreateEvent";
import ViewEvent from "./pages/ViewEvent";
import EditEvent from "./pages/EditEvent";
import AddToGallery from "./pages/AddToGallery";
import ViewSinglePost from "./pages/ViewSinglePost";
import AddNewResource from "./pages/AddNewResource";
import ViewSingleResource from "./pages/ViewSingleResource";
import EditSingleResource from "./pages/EditSingleResoure";
import AllGrades from "./pages/AllGrades";
import ViewSingleGrade from "./pages/ViewSingleGrade";
import CreateGrade from "./pages/CreateGrade";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />

          <Route path="news">
            <Route index element={<ViewNews />} />
            <Route path="new" element={<CreateNews />} />
            <Route path=":postId" element={<ViewSinglePost />} />
          </Route>
          <Route path="gallery">
            <Route index element={<Gallery />} />
            <Route path="new" element={<AddToGallery />} />
            <Route path=":id" element={<AddToGallery />} />
            <Route path=":id/edit" element={<AddToGallery />} />
          </Route>
          <Route path="resources">
            <Route index element={<Resources />} />
            <Route path="new" element={<AddNewResource />} />
            <Route path=":resourceId" element={<ViewSingleResource />} />
            <Route path=":resourceId/edit" element={<EditSingleResource />} />
          </Route>
          <Route path="members">
            <Route index element={<PendingMembership />} />
            <Route path=":userId" element={<ViewApplication />} />
          </Route>

          <Route path="pending-members" element={<PendingMembership />} />
          <Route path="approved-members" element={<ApprovedMembership />} />
          <Route path="paid-members" element={<PaidMembership />} />
          <Route path="active-members" element={<ActiveMembersip />} />
          <Route path="inactive-members" element={<InactiveMembership />} />
          <Route path="events">
            <Route index element={<AllEvents />} />
            <Route path="new" element={<CreateEvent />} />
            <Route path=":eventId" element={<ViewEvent />} />
            <Route path=":eventId/edit" element={<EditEvent />} />
          </Route>
          <Route path="grade">
            <Route index element={<AllGrades />} />
            <Route path="new" element={<CreateGrade />} />
            <Route path=":gradeId" element={<ViewSingleGrade />} />
            <Route path=":gradeId/edit" element={<EditEvent />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
