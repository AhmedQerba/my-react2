import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="d-flex container shadow">
      <h2>Store</h2>
      <Link to="/" className="register-nav">
        Go To Web Site
      </Link>
    </div>
  );
}
