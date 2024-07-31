import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CreateNews from "./pages/CreateNews";
import ViewNews from "./pages/ViewNews";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import PendingMembership from "./pages/PendingMembership";
import ProtectedRoutes from "./layouts/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="create-news" element={<CreateNews />} />
          <Route path="view-news" element={<ViewNews />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="resources" element={<Resources />} />
          <Route path="members" element={<PendingMembership />} />
          <Route path="pending-members" element={<PendingMembership />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
