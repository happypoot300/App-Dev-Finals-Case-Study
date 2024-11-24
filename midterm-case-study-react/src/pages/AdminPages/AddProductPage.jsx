//react
import { useState, useEffect } from "react";
//react dom
import { useNavigate, Link, useLocation } from "react-router-dom";
//bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
//css style
import Style from "../../css modules/AddProductPage.module.css";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
//components
import ProductForm from "../../components/ProductForm.jsx";

export default function AddProductPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [isUserAdmin, setIsUserAdmin] = useState();
  const location = useLocation();
  useEffect(() => {
    setIsUserAdmin(location.state?.isUserAdmin);
  }, [location]);
  console.log(" isUserAdmin from add:", isUserAdmin);

  function navigateToHome() {
    navigate("/ViewProductPage", {
      state: { isUserAdmin: isUserAdmin },
      replace: true,
    });
  }

  function handleAddProduct(parameterForm) {
    fetch("http://127.0.0.1:8000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameterForm),
    })
      .then((response) => {
        if (response.ok) {
          navigateToHome();
        } else {
          throw new Error(
            response.statusText +
              " " +
              response.status +
              " The server encountered an unexpected condition that prevented it from fulfilling the request"
          );
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }

  return (
    <Container fluid className="pt-5 m-0">
      <div className={Style.addProductContainer}>
        <Container className="d-flex justify-content-between">
          <h2>Add New Product</h2>

          <Button variant="link" onClick={navigateToHome}>
            <FontAwesomeIcon className="pt-2" icon={faChevronLeft} size="2xl" />
          </Button>
        </Container>

        {error && (
          <div class="px-8 py-6 bg-red-400 text-white flex justify-between rounded">
            ERROR TEST PALANG
          </div>
        )}

        <ProductForm handleAddProduct={handleAddProduct} />
      </div>
    </Container>
  );
}