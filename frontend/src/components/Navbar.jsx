
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">F</div>

        <div>
          <h2>FreshTrack</h2>
          <span>Smart Food Supply Chain</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="system-status">
          <span className="status-dot"></span>
          System Online
        </div>

        <div className="profile">
          <div className="profile-avatar">A</div>
          <div className="profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
