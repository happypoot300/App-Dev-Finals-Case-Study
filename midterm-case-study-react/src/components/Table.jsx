//bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
//css style
import Style from "../css modules/Table.module.css";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faFilter,
  faTrash,
  faArrowUp,
  faArrowDown,
  faPenToSquare,
  faPesoSign,
  faEye,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
//react
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//barcode
import BarcodeGenerator from "./BarcodeGenerator";
const frenchGray = "#d0d5db";
const pesoSign = {
  peso: <FontAwesomeIcon icon={faPesoSign} />,
};

export default function ViewTable({
  isUserAdmin,
  userId,
  products,
  updateProductsList,
  sortProductsOrder,
  sortProductsCategory,
}) {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
      .then((formData) => setFormData(formData))
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);

  function navigateToEditProductPage(id, isUserAdmin) {
    navigate(`/EditProductPage/${id}`, {
      state: { isUserAdmin: isUserAdmin },
      replace: true,
    });
  }

  function navigateToAddToCartPage(id) {
    navigate(`/AddToCartPage/${id}`, {
      state: { userId: userId, id: id },
      replace: true,
    });
  }

  function navigateToProductDetailsPage(id) {
    navigate(`/ProductDetailsPage/${id}`, { replace: true });
  }

  function HandleDeleteProduct(id) {
    try {
      fetch(`http://127.0.0.1:8000/api/products/${id}`, { method: "DELETE" })
        .then(() => updateProductsList())
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  return (
    <Container fluid className="p-0 m-0">
      <Table striped bordered hover size="md">
        <thead>
          <tr>
            {!isUserAdmin && (
              <th style={{ backgroundColor: frenchGray }}>
                <Container className="text-center m-0 p-0">
                  <label className="text-nowrap pb-2">View</label>
                </Container>
              </th>
            )}
            {!isUserAdmin && <br />}

            <th style={{ backgroundColor: frenchGray }}>
              <div className={Style.filterContainer}>
                <label className="text-nowrap">Product Name</label>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <FontAwesomeIcon
                      className={Style.filterIcon}
                      icon={faFilter}
                      size="lg"
                      style={{ color: "4470FE" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="text-center m-0 p-0">
                    <Dropdown.Item
                      className="m-0 p-0"
                      onClick={() => updateProductsList()}
                    >
                      <p>-- Default --</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 p-0"
                      onClick={() => sortProductsOrder("product_name", "asc")}
                    >
                      <p>A-Z</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 p-0"
                      onClick={() => sortProductsOrder("product_name", "desc")}
                    >
                      <p>Z-A</p>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </th>
            <br />

            <th style={{ backgroundColor: frenchGray }}>
              <div className={Style.filterContainer}>
                <label className="text-nowrap">Price</label>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <FontAwesomeIcon
                      className={Style.filterIcon}
                      icon={faFilter}
                      size="lg"
                      style={{ color: "4470FE" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="text-center m-0 p-0">
                    <Dropdown.Item
                      className="d-flex justify-content-center  m-0 pt-2"
                      onClick={() => updateProductsList()}
                    >
                      <p className={Style.p}>-- Default --</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex justify-content-center  m-0 pt-2"
                      onClick={() => sortProductsOrder("price", "asc")}
                    >
                      <p className={Style.p}>Low - High</p>
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        className="pt-1"
                        style={{ color: "7899FF" }}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex justify-content-center m-0 pb-2"
                      onClick={() => sortProductsOrder("price", "desc")}
                    >
                      <p className={Style.p}>High - Low</p>
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className="pt-1"
                        style={{ color: "7899FF" }}
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </th>

            <br />

            <th style={{ backgroundColor: frenchGray }}>
              <Container className="pb-2 m-0 ">
                <label className="text-nowrap">Description</label>
              </Container>
            </th>
            <br />

            <th style={{ backgroundColor: frenchGray }}>
              <div className={Style.filterContainer}>
                <label className="text-nowrap">Category</label>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <FontAwesomeIcon
                      className={Style.filterIcon}
                      icon={faFilter}
                      size="lg"
                      style={{ color: "4470FE" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="m-0 pt-2 pb-2">
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() => updateProductsList()}
                    >
                      -- Default --
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() => sortProductsCategory("Automotive")}
                    >
                      Automotive
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() =>
                        sortProductsCategory("Beauty & Personal Care")
                      }
                    >
                      Beauty & Personal Care
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() => sortProductsCategory("Electronics")}
                    >
                      Electronics
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() => sortProductsCategory("Fashion")}
                    >
                      Fashion
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() => sortProductsCategory("Health & Fitness")}
                    >
                      Health & Fitness
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() => sortProductsCategory("Home & Kitchen")}
                    >
                      Home & Kitchen
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() => sortProductsCategory("Sports & Outdoors")}
                    >
                      Sports & Outdoors
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="m-0 pl-1"
                      onClick={() => sortProductsCategory("Toys & Games")}
                    >
                      Toys & Games
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </th>
            <br />

            {isUserAdmin && (
              <th style={{ backgroundColor: frenchGray }}>
                <Container className="pb-2 m-0 ">
                  <label className="text-nowrap">Bar Code</label>
                </Container>
              </th>
            )}
            {isUserAdmin && <br />}

            <th style={{ backgroundColor: frenchGray }}>
              <div className={Style.filterContainer}>
                <label className="text-nowrap">Stock Quantity</label>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <FontAwesomeIcon
                      className={Style.filterIcon}
                      icon={faFilter}
                      size="lg"
                      style={{ color: "4470FE" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="text-center m-0 p-0">
                    <Dropdown.Item
                      className="d-flex justify-content-center  m-0 pt-2"
                      onClick={() => updateProductsList()}
                    >
                      <p className={Style.p}>-- Default --</p>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex justify-content-center  m-0 pt-2"
                      onClick={() => sortProductsOrder("stock_quantity", "asc")}
                    >
                      <p className={Style.p}>Low - High</p>
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        className="pt-1"
                        style={{ color: "7899FF" }}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex justify-content-center m-0 pb-2"
                      onClick={() =>
                        sortProductsOrder("stock_quantity", "desc")
                      }
                    >
                      <p className={Style.p}>High - Low</p>
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className="pt-1"
                        style={{ color: "7899FF" }}
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </th>
            <br />

            <th style={{ backgroundColor: frenchGray }}>
              <Container className="pb-2 m-0 text-center">
                {isUserAdmin ? (
                  <label className="text-nowrap ">Action</label>
                ) : (
                  <label className="text-nowrap">Add to Cart</label>
                )}
              </Container>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              {!isUserAdmin && (
                <td
                  style={{ maxWidth: "250px" }}
                  className="text-truncate align-middle"
                >
                  <Container fluid className={Style.buttonContainer}>
                    <Button
                      variant="link"
                      className={Style.viewButton}
                      onClick={() => navigateToProductDetailsPage(product.id)}
                    >
                      <FontAwesomeIcon icon={faEye} size="2xl" />
                    </Button>
                  </Container>
                </td>
              )}
              {!isUserAdmin && <br />}

              <td
                style={{ maxWidth: "250px" }}
                className="text-truncate align-middle"
              >
                {product.product_name}
              </td>
              <br />
              <td
                style={{ maxWidth: "150px" }}
                className="text-truncate align-middle text-center"
              >
                {pesoSign.peso}
                {product.price}
              </td>
              <br />
              <td
                style={{ maxWidth: "400px" }}
                className="text-truncate align-middle"
              >
                {product.description}
              </td>
              <br />
              <td className="text-truncate align-middle">{product.category}</td>
              <br />
              {isUserAdmin && (
                <td className="text-truncate align-bottom text-center">
                  <BarcodeGenerator data={product.bar_code} />
                </td>
              )}
              {isUserAdmin && <br />}
              <td
                style={{ maxWidth: "100px" }}
                className="text-truncate align-middle text-center"
              >
                {product.stock_quantity}
              </td>
              <br />
              <td style={{ maxWidth: "90px" }} className="align-middle">
                {!isUserAdmin ? (
                  <Container fluid className={Style.buttonContainer}>
                    <Button
                      variant="link"
                      className={Style.editButton}
                      onClick={() => navigateToAddToCartPage(product.id)}
                    >
                      <FontAwesomeIcon icon={faCartPlus} size="2xl" />
                    </Button>
                  </Container>
                ) : (
                  <Container fluid className={Style.buttonContainer}>
                    <Button
                      variant="link"
                      className={Style.editButton}
                      onClick={() =>
                        navigateToEditProductPage(product.id, isUserAdmin)
                      }
                    >
                      <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                    </Button>

                    <Button
                      variant="link"
                      className={Style.deleteButton}
                      onClick={() => HandleDeleteProduct(product.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="2xl" />
                    </Button>
                  </Container>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
