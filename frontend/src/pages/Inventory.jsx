
function Inventory({ products }) {
  return (
    <div>
      <h1>Inventory Management</h1>

      <p>Monitor available food stock.</p>

      <h3>Stock List</h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Available Stock</th>
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

export default Inventory;
