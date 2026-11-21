
import { useState } from "react";

function Suppliers({ suppliers = [], setSuppliers }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function addSupplier(e) {
    e.preventDefault();

    if (!name.trim() || !location.trim()) return;

    if (editIndex !== null) {
      const updated = [...suppliers];

      updated[editIndex] = {
        name: name.trim(),
        location: location.trim()
      };

      setSuppliers(updated);
      setEditIndex(null);
    } else {
      setSuppliers([
        ...suppliers,
        { name: name.trim(), location: location.trim() }
      ]);
    }

    setName("");
    setLocation("");
  }

  function editSupplier(index) {
    setName(suppliers[index].name);
    setLocation(suppliers[index].location);
    setEditIndex(index);
  }

  function deleteSupplier(index) {
    setSuppliers(suppliers.filter((_, i) => i !== index));

    if (editIndex === index) {
      setEditIndex(null);
      setName("");
      setLocation("");
    } else if (editIndex !== null && index < editIndex) {
      setEditIndex(editIndex - 1);
    }
  }

  function cancelEdit() {
    setEditIndex(null);
    setName("");
    setLocation("");
  }

  const filteredSuppliers = suppliers
    .map((supplier, index) => ({
      ...supplier,
      originalIndex: index
    }))
    .filter((supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <div className="welcome-section">
        <div>
          <span className="welcome-label">SUPPLIER MANAGEMENT</span>
          <h1>Suppliers</h1>
          <p>Manage your food suppliers and their locations.</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card metric-card">
          <div className="metric-icon green-icon">🤝</div>
          <p>Total Suppliers</p>
          <h2>{suppliers.length}</h2>
          <span>Registered suppliers</span>
        </div>
      </div>

      <section className="card dashboard-panel">
        <div className="panel-heading">
          <div>
            <h3>{editIndex !== null ? "Edit Supplier" : "Add New Supplier"}</h3>
            <p>Enter supplier details</p>
          </div>
          <span className="panel-icon">🌱</span>
        </div>

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
            placeholder="Supplier location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <button type="submit">
            {editIndex !== null ? "Update Supplier" : "+ Add Supplier"}
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
            <h3>Supplier List</h3>
            <p>View and manage registered suppliers</p>
          </div>
          <span className="panel-icon">📋</span>
        </div>

        <input
          type="text"
          placeholder="Search suppliers by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="data-table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.originalIndex}>
                <td>{supplier.name}</td>
                <td>{supplier.location}</td>
                <td>
                  <button onClick={() => editSupplier(supplier.originalIndex)}>
                    Edit
                  </button>

                  <button onClick={() => deleteSupplier(supplier.originalIndex)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSuppliers.length === 0 && <p>No suppliers found.</p>}
      </section>
    </div>
  );
}

export default Suppliers;
