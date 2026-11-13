
import { useState } from "react";

function Products({ products, setProducts }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  function addProduct(e) {
    e.preventDefault();

    if (!name.trim() || !quantity || Number(quantity) <= 0) {
      return;
    }
    function deleteProduct(index) {
  setProducts(products.filter((_, i) => i !== index));
}

    setProducts([
      ...products,
      { name: name.trim(), quantity: Number(quantity) }
    ]);

    setName("");
    setQuantity("");
  }

  return (
    <div>
      <h1>Product Management</h1>

      <h3>Add New Product</h3>

      <form onSubmit={addProduct}>
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

        <button type="submit">Add Product</button>
      </form>

     <h3>Product List</h3>

<table className="data-table">
  <thead>
    <tr>
      <th>Product Name</th>
      <th>Quantity (kg)</th>
    </tr>
  </thead>

  <tbody>
    {products.map((product, index) => (
      <tr key={index}>
        <td>{product.name}</td>
        <td>{product.quantity} kg</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Products;
