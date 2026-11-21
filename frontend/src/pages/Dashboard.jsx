
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

  const [shipments, setShipments] = useState([
    { id: 1, destination: "Dhaka", status: "In Transit" },
    { id: 2, destination: "Gazipur", status: "Delivered" },
    { id: 3, destination: "Savar", status: "Pending" }
  ]);

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  const pendingShipments = shipments.filter(
    (s) => s.status === "Pending"
  ).length;

  const inTransitShipments = shipments.filter(
    (s) => s.status === "In Transit"
  ).length;

  const deliveredShipments = shipments.filter(
    (s) => s.status === "Delivered"
  ).length;

  const lowStockProducts = products.filter(
    (p) => Number(p.quantity) > 0 && Number(p.quantity) < 20
  );

  const outOfStockProducts = products.filter(
    (p) => Number(p.quantity) === 0
  );

  return (
    <div className="app-container">
      <Navbar />

      <div className="main-layout">
        <Sidebar onNavigate={setPage} currentPage={page} />

        <main className="dashboard-content">

          {page === "Dashboard" && (
            <>
              <div className="welcome-section">
                <div>
                  <span className="welcome-label">
                    DASHBOARD OVERVIEW
                  </span>

                  <h1>Welcome back to FreshTrack! 🌿</h1>

                  <p>
                    Monitor your food supply chain from one place.
                    Manage products, suppliers, stock and deliveries.
                  </p>
                </div>
              </div>

              <div className="dashboard-cards">

                <div className="card metric-card">
                  <div className="metric-icon green-icon">📦</div>
                  <p>Total Products</p>
                  <h2>{products.length}</h2>
                  <span>Products managed</span>
                </div>

                <div className="card metric-card">
                  <div className="metric-icon blue-icon">🤝</div>
                  <p>Total Suppliers</p>
                  <h2>{suppliers.length}</h2>
                  <span>Registered suppliers</span>
                </div>

                <div className="card metric-card">
                  <div className="metric-icon orange-icon">🏬</div>
                  <p>Available Stock</p>
                  <h2>{totalStock} kg</h2>
                  <span>Total inventory</span>
                </div>

                <div className="card metric-card">
                  <div className="metric-icon purple-icon">🚚</div>
                  <p>Total Shipments</p>
                  <h2>{shipments.length}</h2>
                  <span>Shipment records</span>
                </div>

              </div>

              <div className="dashboard-sections">

                <section className="card dashboard-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Shipment Overview</h3>
                      <p>Track your delivery progress</p>
                    </div>
                    <span className="panel-icon">🚚</span>
                  </div>

                  <div className="shipment-summary">
                    <div className="summary-item">
                      <span className="summary-dot pending-dot"></span>
                      <span>Pending</span>
                      <strong>{pendingShipments}</strong>
                    </div>

                    <div className="summary-item">
                      <span className="summary-dot transit-dot"></span>
                      <span>In Transit</span>
                      <strong>{inTransitShipments}</strong>
                    </div>

                    <div className="summary-item">
                      <span className="summary-dot delivered-dot"></span>
                      <span>Delivered</span>
                      <strong>{deliveredShipments}</strong>
                    </div>
                  </div>
                </section>

                <section className="card dashboard-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Inventory Alerts</h3>
                      <p>Check products that need attention</p>
                    </div>
                    <span className="panel-icon">⚠️</span>
                  </div>

                  <div className="alert-row">
                    <span>Low Stock</span>
                    <strong className="alert-number">
                      {lowStockProducts.length}
                    </strong>
                  </div>

                  {lowStockProducts.length > 0 && (
                    <p className="alert-description">
                      {lowStockProducts.map((p) => p.name).join(", ")}
                    </p>
                  )}

                  <div className="alert-row">
                    <span>Out of Stock</span>
                    <strong className="danger-number">
                      {outOfStockProducts.length}
                    </strong>
                  </div>

                  {outOfStockProducts.length > 0 && (
                    <p className="alert-description">
                      {outOfStockProducts.map((p) => p.name).join(", ")}
                    </p>
                  )}

                  {lowStockProducts.length === 0 &&
                    outOfStockProducts.length === 0 && (
                      <p className="success-message">
                        ✓ All products have sufficient stock.
                      </p>
                    )}
                </section>

              </div>

              <section className="card recent-activity">
                <h3>Quick Actions</h3>
                <p>
                  Choose a section to manage your supply chain.
                </p>

                <div className="quick-actions">
                  <button onClick={() => setPage("Products")}>
                    + Manage Products
                  </button>

                  <button onClick={() => setPage("Suppliers")}>
                    + Manage Suppliers
                  </button>

                  <button onClick={() => setPage("Inventory")}>
                    View Inventory
                  </button>

                  <button onClick={() => setPage("Shipments")}>
                    Track Shipments
                  </button>
                </div>
              </section>
            </>
          )}

          {page === "Products" && (
            <Products products={products} setProducts={setProducts} />
          )}

          {page === "Suppliers" && (
            <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} />
          )}

          {page === "Inventory" && (
            <Inventory products={products} setProducts={setProducts} />
          )}

          {page === "Shipments" && (
            <Shipments shipments={shipments} setShipments={setShipments} />
          )}

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
