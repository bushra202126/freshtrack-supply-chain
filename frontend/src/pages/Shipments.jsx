
import { useState } from "react";

function Shipments() {
  const [shipments, setShipments] = useState([
    { id: 1, destination: "Dhaka", status: "In Transit" },
    { id: 2, destination: "Gazipur", status: "Delivered" },
    { id: 3, destination: "Savar", status: "Pending" }
  ]);

  const [destination, setDestination] = useState("");

  function addShipment(e) {
    e.preventDefault();

    if (!destination.trim()) return;

    setShipments([
      ...shipments,
      {
        id: shipments.length + 1,
        destination: destination.trim(),
        status: "Pending"
      }
    ]);

    setDestination("");
  }

  return (
    <div>
      <h1>Shipment Tracking</h1>

      <h3>Add New Shipment</h3>

      <form onSubmit={addShipment}>
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <button type="submit">Add Shipment</button>
      </form>

      <h3>Shipment List</h3>

      <table className="data-table">
  <thead>
    <tr>
      <th>Shipment ID</th>
      <th>Destination</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {shipments.map((shipment) => (
      <tr key={shipment.id}>
        <td>{shipment.id}</td>
        <td>{shipment.destination}</td>
        <td>{shipment.status}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default Shipments;
