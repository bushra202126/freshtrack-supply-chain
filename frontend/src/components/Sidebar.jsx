
function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <h2>Menu</h2>

      <ul>
        <li onClick={() => onNavigate("Dashboard")}>Dashboard</li>
        <li onClick={() => onNavigate("Products")}>Products</li>
        <li onClick={() => onNavigate("Suppliers")}>Suppliers</li>
        <li onClick={() => onNavigate("Inventory")}>Inventory</li>
        <li onClick={() => onNavigate("Shipments")}>Shipments</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
