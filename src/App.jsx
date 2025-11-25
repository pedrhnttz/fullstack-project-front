import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddProduct from "./pages/AddProduct/AddProduct";
import ProductPage from "./pages/ProductPage/ProductPage";
import Sales from "./pages/Sales/Sales";
import EditProduct from "./pages/EditProduct/EditProduct";
import Dashboard from "./pages/Dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
