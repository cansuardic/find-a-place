import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import AddComment from "./components/AddComment";
import Login from "./components/Login";
import AddUpdateVenue from "./components/AddUpdateVenue";
import Admin from "./components/Admin";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Template from "./components/Template";
import VenueDetail from "./components/VenueDetail";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Template />}>
        <Route path="/" element={<Home />} />
        <Route path="venue/:id" element={<VenueDetail />} />
        <Route path="venue/:id/comment/new" element={<AddComment />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
        <Route path="admin/addupdate/venue/:id" element={<AddUpdateVenue />} />
        <Route path="admin/addupdate/venue/new" element={<AddUpdateVenue />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
