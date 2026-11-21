
import { useState } from "react";

function Inventory({ products, setProducts }) {
  const [amounts, setAmounts] = useState({});

  function getStockStatus(quantity) {
    if (quantity === 0) return "Out of Stock";
    if (quantity < 20) return "Low Stock";
    return "In Stock";
  }

  function updateStock(index, change) {
    const amount = Number(amounts[index]);

    if (!amount || amount <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const updatedProducts = [...products];

    const newQuantity =
      Number(updatedProducts[index].quantity) + change * amount;

    if (newQuantity < 0) {
      alert("Stock cannot be negative.");
      return;
    }

    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity: newQuantity
    };

    setProducts(updatedProducts);

    setAmounts({
      ...amounts,
      [index]: ""
    });
  }

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  const lowStock = products.filter(
    (product) => Number(product.quantity) > 0 &&
      Number(product.quantity) < 20
  ).length;

  const outOfStock = products.filter(
    (product) => Number(product.quantity) === 0
  ).length;

  return (
    <div>
      <div className="welcome-section">
        <div>
          <span className="welcome-label">INVENTORY MANAGEMENT</span>
          <h1>Inventory</h1>
          <p>Monitor and update your available food stock.</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card metric-card">
          <div className="metric-icon green-icon">🏬</div>
          <p>Total Stock</p>
          <h2>{totalStock} kg</h2>
          <span>Available quantity</span>
        </div>

        <div className="card metric-card">
          <div className="metric-icon orange-icon">⚠️</div>
          <p>Low Stock</p>
          <h2>{lowStock}</h2>
          <span>Products below 20 kg</span>
        </div>

        <div className="card metric-card">
          <div className="metric-icon purple-icon">📦</div>
          <p>Out of Stock</p>
          <h2>{outOfStock}</h2>
          <span>Products unavailable</span>
        </div>
      </div>

      <section className="card dashboard-panel">
        <div className="panel-heading">
          <div>
            <h3>Stock List</h3>
            <p>Manage your product quantities</p>
          </div>
          <span className="panel-icon">📋</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Available Stock</th>
              <th>Stock Status</th>
              <th>Update Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>

                <td>{product.quantity} kg</td>

                <td>
                  <span
                    className={`stock-status ${getStockStatus(
                      Number(product.quantity)
                    ).replaceAll(" ", "-").toLowerCase()}`}
                  >
                    {getStockStatus(Number(product.quantity))}
                  </span>
                </td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexWrap: "nowrap"
                    }}
                  >
                    <input
                      type="number"
                      min="1"
                      placeholder="Quantity"
                      value={amounts[index] || ""}
                      style={{ width: "120px", minWidth: 0 }}
                      onChange={(e) =>
                        setAmounts({
                          ...amounts,
                          [index]: e.target.value
                        })
                      }
                    />

                    <button onClick={() => updateStock(index, 1)}>
                      +
                    </button>

                    <button onClick={() => updateStock(index, -1)}>
                      -
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && <p>No products available.</p>}
      </section>
    </div>
  );
}

export default Inventory;
