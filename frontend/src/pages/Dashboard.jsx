
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Products from "./Products";
import Suppliers from "./Suppliers";
import Inventory from "./Inventory";
import Shipments from "./Shipments";


function Dashboard() {
  const [page, setPage] = useState("Dashboard");

const [suppliers, setSuppliers] = useState([
  { name: "Green Farm", location: "Dhaka" },
  { name: "Fresh Foods Ltd", location: "Gazipur" },
  { name: "Natural Harvest", location: "Savar" }
]);

  const [products, setProducts] = useState([
  { name: "Rice", quantity: 50 },
  { name: "Potato", quantity: 30 },
  { name: "Tomato", quantity: 20 }
]);

  return (
    <div>
      <Navbar />

      <div className="main-layout">
        <Sidebar onNavigate={setPage} />

        <div className="dashboard-content">

          {page === "Dashboard" && (
            <>
              <h1>Dashboard Overview</h1>

              <div className="dashboard-cards">
                <div className="card">
                  <h3>Total Products</h3>
                  <h2>25</h2>
                </div>

                <div className="card">
                  <h3>Total Suppliers</h3>
                  <h2>12</h2>
                </div>

                <div className="card">
                  <h3>Available Stock</h3>
                  <h2>150</h2>
                </div>

                <div className="card">
                  <h3>Pending Shipments</h3>
                  <h2>5</h2>
                </div>
              </div>
            </>
          )}

          {page === "Products" && (
  <Products products={products} setProducts={setProducts} />
)}
        
          {page === "Suppliers" && (
  <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} />
)}
          {page === "Inventory" && (
  <Inventory products={products} />
)}
          {page === "Shipments" && <Shipments />}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
