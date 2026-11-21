
import { useState } from "react";

function Products({ products, setProducts }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function addProduct(e) {
    e.preventDefault();

    if (!name.trim() || !quantity || Number(quantity) <= 0) {
      return;
    }

    if (editIndex !== null) {
      const updatedProducts = [...products];

      updatedProducts[editIndex] = {
        ...updatedProducts[editIndex],
        name: name.trim(),
        quantity: Number(quantity)
      };

      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([
        ...products,
        { name: name.trim(), quantity: Number(quantity) }
      ]);
    }

    setName("");
    setQuantity("");
  }

  function editProduct(index) {
    setName(products[index].name);
    setQuantity(products[index].quantity);
    setEditIndex(index);
  }

  function deleteProduct(index) {
    setProducts(products.filter((_, i) => i !== index));

    if (editIndex === index) {
      setEditIndex(null);
      setName("");
      setQuantity("");
    } else if (editIndex !== null && index < editIndex) {
      setEditIndex(editIndex - 1);
    }
  }

  function cancelEdit() {
    setEditIndex(null);
    setName("");
    setQuantity("");
  }

  const filteredProducts = products
    .map((product, index) => ({
      ...product,
      originalIndex: index
    }))
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="products-page">

      <div className="welcome-section">
        <div>
          <span className="welcome-label">PRODUCT MANAGEMENT</span>
          <h1>Products</h1>
          <p>Manage your food products and available quantities.</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card metric-card">
          <div className="metric-icon green-icon">📦</div>
          <p>Total Products</p>
          <h2>{products.length}</h2>
          <span>Registered products</span>
        </div>

        <div className="card metric-card">
          <div className="metric-icon orange-icon">🏬</div>
          <p>Total Quantity</p>
          <h2>
            {products.reduce(
              (total, product) => total + Number(product.quantity),
              0
            )} kg
          </h2>
          <span>Available product stock</span>
        </div>
      </div>

      <section className="card dashboard-panel">
        <div className="panel-heading">
          <div>
            <h3>{editIndex !== null ? "Edit Product" : "Add New Product"}</h3>
            <p>Enter product information below</p>
          </div>
          <span className="panel-icon">🌱</span>
        </div>

        <form onSubmit={addProduct} className="product-form">
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Quantity (kg)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />

          <button type="submit">
            {editIndex !== null ? "Update Product" : "+ Add Product"}
          </button>

          {editIndex !== null && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="card dashboard-panel">
        <div className="panel-heading">
          <div>
            <h3>Product List</h3>
            <p>View and manage all your products</p>
          </div>
          <span className="panel-icon">📋</span>
        </div>

        <input
          type="text"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.originalIndex}>
                <td>{product.name}</td>
                <td>{product.quantity} kg</td>
                <td>
                  <button
                    onClick={() => editProduct(product.originalIndex)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.originalIndex)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <p>No products found.</p>
        )}
      </section>

    </div>
  );
}

export default Products;
