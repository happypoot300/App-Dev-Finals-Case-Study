//imports
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//pages
//AdminPages
import AddProductPage from "./pages/AdminPages/AddProductPage";
import EditProductPage from "./pages/AdminPages/EditProductPage";
//UserPages
import AddToCartPage from "./pages/UserPages/AddToCartPage";
import CheckoutPage from "./pages/UserPages/CheckoutPage";
import ProductDetailsPage from "./pages/UserPages/ProductDetailsPage";
import ViewCartPage from "./pages/UserPages/ViewCartPage";
//GlobalPages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewProductPage from "./pages/ViewProductPage";

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/*AdminPages*/}
        <Route path="/AddProductPage" element={<AddProductPage />} />
        <Route path="/EditProductPage/:id" element={<EditProductPage />} />

        {/*UserPages*/}
        <Route path="/AddToCartPage/:id" element={<AddToCartPage />} />
        <Route path="/CheckoutPage" element={<CheckoutPage />} />
        <Route
          path="/ProductDetailsPage/:id"
          element={<ProductDetailsPage />}
        />
        <Route path="/ViewCartPage/:id" element={<ViewCartPage />} />

        {/*GlobalPages*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/ViewProductPage" element={<ViewProductPage />} />
      </Routes>
    </div>
  );
}
