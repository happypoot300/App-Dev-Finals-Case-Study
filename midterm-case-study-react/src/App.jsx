//imports
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//pages
import ViewProductPage from "./pages/ViewProductPage";
import ViewCartPage from "./pages/UserPages/ViewCartPage";
import AddToCartPage from "./pages/UserPages/AddToCartPage";
import AddProductPage from "./pages/AdminPages/AddProductPage";
import EditProductPage from "./pages/AdminPages/EditProductPage";
import LoginPage from "./pages/LoginPage";
//components

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ViewProductPage" element={<ViewProductPage />} />
        <Route path="/AddProductPage" element={<AddProductPage />} />
        <Route path="/EditProductPage/:id" element={<EditProductPage />} />
        <Route path="/ViewCartPage" element={<ViewCartPage />} />
        <Route path="/AddToCartPage" element={<AddToCartPage />} />
      </Routes>
    </div>
  );
}
