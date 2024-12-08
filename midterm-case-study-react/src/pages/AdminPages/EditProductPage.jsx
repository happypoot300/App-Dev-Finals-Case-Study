//react
import { useState, useEffect } from "react";
//react dom
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
//bootstrap
import { Container, Button } from "react-bootstrap";
//css style
import Style from "../../css modules/EditProductPage.module.css";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
//components
import ProductForm from "../../components/ProductForm.jsx";

export default function EditProductPage() {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [isUserAdmin, setIsUserAdmin] = useState();
  const location = useLocation();
  useEffect(() => {
    setIsUserAdmin(location.state?.isUserAdmin);
  }, [location]);

  function navigateToHome() {
    navigate("/ViewProductPage", {
      state: { isUserAdmin: isUserAdmin },
      replace: true,
    });
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            response.statusText +
              " " +
              response.status +
              " The server has not found anything matching the Request-URI"
          );
        }
      })
      .then((products) => setFormData(products))
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);

  function handleEditProduct(parameterForm) {
    fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      method: "PUT",
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
      <div className={Style.editProductContainer}>
        <Container className="d-flex justify-content-between">
          <h2>Edit Product Details</h2>
          <Button variant="link" onClick={navigateToHome}>
            <FontAwesomeIcon className="pt-2" icon={faChevronLeft} size="2xl" />
          </Button>
        </Container>

        {error && (
          <div class="px-8 py-6 bg-red-400 text-white flex justify-between rounded">
            <p>{error}</p>
          </div>
        )}

        <ProductForm
          formData={formData}
          handleEditProduct={handleEditProduct}
        />
      </div>
    </Container>
  );
}
