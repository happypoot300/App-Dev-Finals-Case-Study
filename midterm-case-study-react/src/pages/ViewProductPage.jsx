//react
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//bootstrap
import Button from "../components/Button.jsx";
import Dropdown from "react-bootstrap/Dropdown";
//css style
import Style from "../css modules/ViewProductPage.module.css";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
//components
import ProductList from "../components/ProductList.jsx";

export default function ViewProductPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [isUserAdmin, setIsUserAdmin] = useState();
  const location = useLocation();
  useEffect(() => {
    setIsUserAdmin(location.state?.isUserAdmin);
  }, [location]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  function handleLogout() {
    navigate("/", { replace: true });
  }

  return (
    <section>
      <header>
        <div className={Style.header__Title}>
          <div className={Style.titleLayout}>
            <h1>E-Com Product Management Ver 2.0</h1>
            <div className={Style.header__imgIcon}></div>
          </div>

          <Dropdown className={Style.header__userIcon}>
            <Dropdown.Toggle
              className={Style.iconBorder}
              variant="link"
              id="dropdown-basic"
            >
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                style={{ color: "4470FE" }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className="m-0 p-0">
              <Button
                className="d-flex justify-content-center align-items-center dropdown-item  m-0 p-0"
                name={"Log Out"}
                onClick={handleLogout}
              ></Button>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {isUserAdmin ? <h2>Admin Dashboard</h2> : <h2>Product List</h2>}
        <ProductList isUserAdmin={isUserAdmin} />
      </header>
    </section>
  );
}
