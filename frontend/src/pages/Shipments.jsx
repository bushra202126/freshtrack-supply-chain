
import { useState } from "react";

function Shipments({ shipments, setShipments }) {
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("Pending");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function saveShipment(e) {
    e.preventDefault();

    if (!destination.trim()) return;

    if (editIndex !== null) {
      const updated = [...shipments];

      updated[editIndex] = {
        ...updated[editIndex],
        destination: destination.trim(),
        status
      };

      setShipments(updated);
      setEditIndex(null);
    } else {
      setShipments([
        ...shipments,
        {
          id: Date.now(),
          destination: destination.trim(),
          status
        }
      ]);
    }

    setDestination("");
    setStatus("Pending");
  }

  function editShipment(index) {
    setDestination(shipments[index].destination);
    setStatus(shipments[index].status);
    setEditIndex(index);
  }

  function deleteShipment(index) {
    setShipments(shipments.filter((_, i) => i !== index));

    if (editIndex === index) {
      cancelEdit();
    } else if (editIndex !== null && index < editIndex) {
      setEditIndex(editIndex - 1);
    }
  }

  function cancelEdit() {
    setEditIndex(null);
    setDestination("");
    setStatus("Pending");
  }

  const filteredShipments = shipments
    .map((shipment, index) => ({
      ...shipment,
      originalIndex: index
    }))
    .filter((shipment) =>
      shipment.destination.toLowerCase().includes(search.toLowerCase())
    );

  const delivered = shipments.filter(
    (shipment) => shipment.status === "Delivered"
  ).length;

  const inTransit = shipments.filter(
    (shipment) => shipment.status === "In Transit"
  ).length;

  const pending = shipments.filter(
    (shipment) => shipment.status === "Pending"
  ).length;

  return (
    <div>
      <div className="welcome-section">
        <div>
          <span className="welcome-label">SHIPMENT MANAGEMENT</span>
          <h1>Shipments</h1>
          <p>Manage and track your food deliveries.</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card metric-card">
          <div className="metric-icon green-icon">🚚</div>
          <p>Total Shipments</p>
          <h2>{shipments.length}</h2>
          <span>All registered shipments</span>
        </div>

        <div className="card metric-card">
          <div className="metric-icon green-icon">✅</div>
          <p>Delivered</p>
          <h2>{delivered}</h2>
          <span>Successfully delivered</span>
        </div>

        <div className="card metric-card">
          <div className="metric-icon orange-icon">🚛</div>
          <p>In Transit</p>
          <h2>{inTransit}</h2>
          <span>Currently on the way</span>
        </div>

        <div className="card metric-card">
          <div className="metric-icon purple-icon">⏳</div>
          <p>Pending</p>
          <h2>{pending}</h2>
          <span>Waiting for dispatch</span>
        </div>
      </div>

      <section className="card dashboard-panel">
        <div className="panel-heading">
          <div>
            <h3>{editIndex !== null ? "Edit Shipment" : "Add New Shipment"}</h3>
            <p>Enter shipment destination and status</p>
          </div>
          <span className="panel-icon">🚚</span>
        </div>

        <form onSubmit={saveShipment}>
          <input
            type="text"
            placeholder="Delivery destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button type="submit">
            {editIndex !== null ? "Update Shipment" : "+ Add Shipment"}
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
            <h3>Shipment List</h3>
            <p>View and manage all deliveries</p>
          </div>
          <span className="panel-icon">📋</span>
        </div>

        <input
          type="text"
          placeholder="Search by destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="data-table">
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>#{shipment.id}</td>
                <td>{shipment.destination}</td>
                <td>
                  <span
                    className={`stock-status ${shipment.status
                      .replaceAll(" ", "-")
                      .toLowerCase()}`}
                  >
                    {shipment.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => editShipment(shipment.originalIndex)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteShipment(shipment.originalIndex)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredShipments.length === 0 && <p>No shipments found.</p>}
      </section>
    </div>
  );
}

export default Shipments;
