//react
import { useState, useEffect } from "react";
//bootstrap
import Button from "../components/Button.jsx";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
//css style
import Style from "../css modules/ViewProductPage.module.css";
//components
import Table from "../components/Table.jsx";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductList({ isUserAdmin, userId }) {
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/carts/${userId}`)
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
      .then((data) => setCart(data))
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, [userId]);

  function updateProductsList() {
    fetch("http://127.0.0.1:8000/api/products")
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
      .then((products) => {
        setProducts(products);
        setSearchResults([]);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }

  function handleSearchQuery() {
    const searchQueryLower = searchQuery;
    const filteredProducts = products.filter((product) => {
      return (
        product.product_name.includes(searchQueryLower) ||
        product.price.toLowerCase().includes(searchQueryLower) ||
        product.description.includes(searchQueryLower) ||
        product.category.includes(searchQueryLower) ||
        product.bar_code.includes(searchQueryLower) ||
        product.stock_quantity
          .toString()
          .toLowerCase()
          .includes(searchQueryLower)
      );
    });
    setSearchResults(filteredProducts);
  }

  function sortProductsOrder(column_name, orderBy) {
    fetch(
      `http://127.0.0.1:8000/api/products?sort=${column_name}&order=${orderBy}`
    )
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
        setSearchResults([]);
      })
      .catch((error) => console.error("Error fetching data", error));
  }

  function sortProductsCategory(category_name) {
    fetch(`http://127.0.0.1:8000/api/products?category=${category_name}`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
        setSearchResults([]);
      })
      .catch((error) => console.error("Error fetching data", error));
  }

  function navigateToAddProductPage() {
    navigate("/AddProductPage", {
      state: { isUserAdmin: isUserAdmin },
      replace: true,
    });
  }

  function navigateToViewCartPage(userId) {
    console.log("userId from ProductList: ", userId);
    navigate(`/ViewCartPage/${userId}`, {
      state: { userId: userId },
      replace: true,
    });
  }

  return (
    <Container fluid>
      <div className={Style.tableContainer}>
        <div className={Style.buttonContainer}>
          <Button
            className={Style.addButton}
            name={
              isUserAdmin ? (
                "+ Add Product"
              ) : (
                <span>
                  <FontAwesomeIcon icon={faCartPlus} size="sm" />
                  View Cart <Badge bg="danger">{cart.length}</Badge>
                </span>
              )
            }
            onClick={
              isUserAdmin
                ? () => navigateToAddProductPage()
                : () => navigateToViewCartPage(userId)
            }
          ></Button>
          <div className={Style.searchContainer}>
            <InputGroup>
              <Form.Control
                className={Style.searchInput}
                placeholder="Search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
              <Button
                className={Style.searchButton}
                name={
                  <span className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
                    Search
                  </span>
                }
                onClick={handleSearchQuery}
              ></Button>
            </InputGroup>
          </div>
        </div>
        <Table
          isUserAdmin={isUserAdmin}
          userId={userId}
          products={searchResults.length > 0 ? searchResults : products}
          updateProductsList={updateProductsList}
          sortProductsOrder={sortProductsOrder}
          sortProductsCategory={sortProductsCategory}
        />
      </div>
    </Container>
  );
}
