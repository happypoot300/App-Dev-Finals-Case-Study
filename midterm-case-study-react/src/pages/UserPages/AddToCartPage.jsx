//react
import { useState, useEffect } from "react";
//react dom
import { useNavigate, useLocation, useParams } from "react-router-dom";
//bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
//css style
import Style from "../../css modules/AddProductPage.module.css";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
//components
import CartForm from "../../components/CartForm.jsx";

export default function AddToCartPage() {
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const [userId, setUserId] = useState();
  const location = useLocation();
  useEffect(() => {
    setUserId(location.state?.userId);
  }, [location]);

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

  function navigateToLastPage() {
    navigate("/ViewProductPage", {
      state: { userId: userId },
      replace: true,
    });
  }

  function handleAddToCart(parameterForm) {
    console.log("parameterForm: ", parameterForm);
    console.log("Iwas CALLED");
    fetch("http://127.0.0.1:8000/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameterForm),
    })
      .then((response) => {
        if (response.ok) {
          navigateToLastPage();
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
          <h2>Adding to Cart</h2>

          <Button variant="link" onClick={navigateToLastPage}>
            <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
          </Button>
        </Container>

        {error && (
          <div class="px-8 py-6 bg-red-400 text-white flex justify-between rounded">
            <p>{error}</p>
          </div>
        )}

        <CartForm
          formData={formData}
          handleAddToCart={handleAddToCart}
          id={id}
          userId={userId}
        />
      </div>
    </Container>
  );
}
