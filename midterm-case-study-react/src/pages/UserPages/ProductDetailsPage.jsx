//react
import { useState, useEffect } from "react";
//react dom
import { Link, useNavigate, useParams } from "react-router-dom";
//bootstrap
import { Container } from "react-bootstrap";
//css style
import Style from "../../css modules/ProductDetailsPage.module.css";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
//components
import ProductForm from "../../components/ProductForm.jsx";

export default function ProductDetailsPage() {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();

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

  return (
    <Container fluid className="pt-5 m-0">
      <div className={Style.DetailsProductContainer}>
        <Container className="d-flex justify-content-between">
          <h2>Viewing Product Details</h2>
          <Link to="/viewProductPage">
            <FontAwesomeIcon className="pt-2" icon={faChevronLeft} size="2xl" />
          </Link>
        </Container>

        {error && (
          <div class="px-8 py-6 bg-red-400 text-white flex justify-between rounded">
            <p>{error}</p>
          </div>
        )}

        <ProductForm id={id} formData={formData} isViewOnly={true} />
      </div>
    </Container>
  );
}
