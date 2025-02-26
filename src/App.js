import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/admin/Shop";
import AddProduct from "./pages/admin/Products/AddProduct";
import AddCategory from "./pages/admin/AddCategory";
import E404 from "./pages/admin/404";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./Components/Layout";
import Orders from "./pages/admin/Orders/Order"; // Update the path to the Order component
import Login from "../src/pages/auth/Login";
import VendorProfile from "./pages/admin/VendorProfile";
import EditVendorProfile from "./pages/admin/EditVendorProfile"; // Adjust the path
import OrderDetails from "./pages/admin/Orders/OrderDetails"; // Update the path to the OrderDetails component
import React, { useEffect, useState } from "react";
import Register from "./pages/auth/Register";
import Public from "./Components/Layout/Public";
import Protected from "./Components/Layout/Potected";
import { Provider } from "react-redux";
import store from "./store";
import Products from "./pages/admin/Products/Products";
import Subscriptions from "./pages/admin/Subscriptions";
import Shop from "./pages/admin/Shop";
import Dashboard from "./pages/admin/Dashboard";
import Deliver from "./pages/admin/Deliver";
import Complaints from './pages/admin/Complaints';
import UserList from "./Components/UserList/UserList";
import VendorList from "./Components/VendorList/VendorList";
import UserDetails from "./Components/UserDetails/UserDetails";
import VendorDetails from "./Components/VendorDetails/VendorDetails";
function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Protected>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </Protected>
                }
              />
               <Route
                path="/shop"
                element={
                  <Protected>
                    <Layout>
                      <Shop />
                    </Layout>
                  </Protected>
                }
              />
              <Route path="/login" element={<Public Component={Login} />} />
              <Route path="/signup" element={<Public Component={Register} />} />

              {/* <Route path="/signup" element={<Register/>} /> */}
              {/* <Route
                path="/products"
                element={
                  <Protected>
                    <Layout>
                      <Products />
                    </Layout>
                  </Protected>
                }
              /> */}
               <Route
                path="/deliver"
                element={
                  <Protected>
                    <Layout>
                      <Deliver />
                    </Layout>
                  </Protected>
                }
              />
              <Route
                path="/add-product"
                element={
                  <Protected>
                    <Layout>
                      <AddProduct />
                    </Layout>
                  </Protected>
                }
              />
              <Route
                path="/orders"
                element={
                  <Protected>
                    <Layout>
                      <Orders />
                    </Layout>
                  </Protected>
                }
              />
              {/* <Route
                path="/subscriptions"
                element={
                  <Protected>
                    <Layout>
                      <Subscriptions />
                    </Layout>
                  </Protected>
                }
              /> */}
              <Route
                path="/vendor/:id"
                element={
                  <Protected>
                    <Layout>
                      <VendorProfile />
                    </Layout>
                  </Protected>
                }
              />
              <Route
                path="/edit-vendor"
                element={
                  <Protected>
                    <Layout>
                      <EditVendorProfile />
                    </Layout>
                  </Protected>
                }
              />
              <Route
                path="/orders/:orderId"
                element={
                  <Protected>
                    <Layout>
                      <OrderDetails />
                    </Layout>
                  </Protected>
                }
              />
              <Route
                path="/admin/complaints"
                element={
                  <Protected>
                    <Layout>
                      <Complaints />
                    </Layout>
                  </Protected>
                }
              />
              <Route 
  path="/admin/users"
  element={
    <Protected>
      <Layout>
        <UserList />
      </Layout>
    </Protected>
  }
/>
<Route
  path="/admin/users/:id"
  element={
    <Protected>
      <Layout>
        <UserDetails />
      </Layout>
    </Protected>
  }
/>
<Route 
  path="/admin/vendors"
  element={
    <Protected>
      <Layout>
        <VendorList />
      </Layout>
    </Protected>
  }
/>
<Route
  path="/admin/vendorDetails/:id"
  element={
    <Protected>
      <Layout>
        <VendorDetails />
      </Layout>
    </Protected>
  }
/>


              <Route path="*" element={<E404 />} />
            </Routes>
          </Router>
        </div>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
