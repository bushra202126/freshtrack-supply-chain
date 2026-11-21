
function Sidebar({ onNavigate, currentPage }) {
  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Products", icon: "▦" },
    { name: "Suppliers", icon: "♙" },
    { name: "Inventory", icon: "▤" },
    { name: "Shipments", icon: "⇢" }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-heading">
        <p>WORKSPACE</p>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={
              currentPage === item.name ? "active" : ""
            }
            onClick={() => onNavigate(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-footer-icon">✦</div>
        <div>
          <strong>FreshTrack</strong>
          <p>Supply Chain System</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
