import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import ShoppingCart from "./pages/ShoppingCart";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/admin/AdminPage";
import Dashboard from "./pages/admin/pages/Dashboard";
import Products from "./pages/admin/pages/Products";
import Users from "./pages/admin/pages/Users";
import EditProduct from "./pages/admin/pages/form/EditProduct";
import CreateProduct from "./pages/admin/pages/form/CreateProduct";
import Ads from "./pages/admin/pages/Ads";
import EditAd from "./pages/admin/pages/form/EditAd";
import CreateAd from "./pages/admin/pages/form/CreateAd";
import EditCategory from "./pages/admin/pages/form/EditCategory";
import CreateCategory from "./pages/admin/pages/form/CreateCategory";
import CategoriesColorsSizes from "./pages/admin/pages/CategoriesColorsSizes";
import CreateColor from "./pages/admin/pages/form/CreateColor";
import CreateSize from "./pages/admin/pages/form/CreateSize";
import EditColor from "./pages/admin/pages/form/EditColor";
import EditSize from "./pages/admin/pages/form/EditSize";
import Orders from "./pages/admin/pages/Orders";
import OrderDetail from "./pages/admin/pages/OrderDetail";
import NotificationDetail from "./pages/NotificationDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<DetailPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/notifications/:id" element={<NotificationDetail />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminPage>
              <Dashboard />
            </AdminPage>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminPage>
              <Products />
            </AdminPage>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminPage>
              <Users />
            </AdminPage>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <AdminPage>
              <CreateProduct />
            </AdminPage>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminPage>
              <EditProduct />
            </AdminPage>
          }
        />
        <Route
          path="/admin/ads"
          element={
            <AdminPage>
              <Ads />
            </AdminPage>
          }
        />
        <Route
          path="/admin/ads/create"
          element={
            <AdminPage>
              <CreateAd />
            </AdminPage>
          }
        />
        <Route
          path="/admin/ads/edit/:id"
          element={
            <AdminPage>
              <EditAd />
            </AdminPage>
          }
        />
        <Route
          path="/admin/attributes"
          element={
            <AdminPage>
              <CategoriesColorsSizes />
            </AdminPage>
          }
        />
        <Route
          path="/admin/category/create"
          element={
            <AdminPage>
              <CreateCategory />
            </AdminPage>
          }
        />
        <Route
          path="/admin/color/create"
          element={
            <AdminPage>
              <CreateColor />
            </AdminPage>
          }
        />
        <Route
          path="/admin/size/create"
          element={
            <AdminPage>
              <CreateSize />
            </AdminPage>
          }
        />
        <Route
          path="/admin/category/edit/:id"
          element={
            <AdminPage>
              <EditCategory />
            </AdminPage>
          }
        />
        <Route
          path="/admin/color/edit/:id"
          element={
            <AdminPage>
              <EditColor />
            </AdminPage>
          }
        />
        <Route
          path="/admin/size/edit/:id"
          element={
            <AdminPage>
              <EditSize />
            </AdminPage>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminPage>
              <Orders />
            </AdminPage>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <AdminPage>
              <OrderDetail />
            </AdminPage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
