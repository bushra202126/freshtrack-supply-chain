
import { useState } from "react";

function Suppliers({ suppliers = [], setSuppliers }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  function addSupplier(e) {
    e.preventDefault();

    if (!name.trim() || !location.trim()) {
      return;
    }

    setSuppliers([
      ...suppliers,
      { name: name.trim(), location: location.trim() }
    ]);

    setName("");
    setLocation("");
  }

  return (
    <div>
      <h1>Supplier Management</h1>

      <h3>Add New Supplier</h3>

      <form onSubmit={addSupplier}>
        <input
          type="text"
          placeholder="Supplier name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button type="submit">Add Supplier</button>
      </form>

     <h3>Supplier List</h3>

<table className="data-table">
  <thead>
    <tr>
      <th>Supplier Name</th>
      <th>Location</th>
    </tr>
  </thead>

  <tbody>
    {suppliers.map((supplier, index) => (
      <tr key={index}>
        <td>{supplier.name}</td>
        <td>{supplier.location}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default Suppliers;
