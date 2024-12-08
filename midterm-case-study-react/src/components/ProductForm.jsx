//react
import React, { useState, useEffect } from "react";
//bootstrap
import Button from "../components/Button.jsx";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
//router
import { useNavigate, useLocation } from "react-router-dom";
//css
import Style from "../css modules/ProductForm.module.css";
// Template Image
import Image from "react-bootstrap/Image";
import placeholderImage from "../images/placeholder_Image.jpg";

export default function ProductForm({
  id,
  formData,
  handleAddProduct,
  handleEditProduct,
  isViewOnly,
  error,
}) {
  const productState =
    formData == undefined
      ? {
          product_name: "",
          price: "",
          description: "",
          category: "",
          bar_code: "",
          stock_quantity: "",
        }
      : { ...formData };

  const [product, setProduct] = useState(productState);

  useEffect(() => {
    setProduct(productState);
  }, [formData]);

  function onChangeProduct(column, value) {
    setProduct({ ...product, [column]: value });
  }

  function handleAddSubmit(event) {
    event.preventDefault();
    handleAddProduct(product);
  }
  function handleEditSubmit(event) {
    event.preventDefault();
    handleEditProduct(product);
  }

  const navigate = useNavigate();
  return (
    <>
      {isViewOnly ? (
        <Form>
          <Container fluid>
            <Row>
              <Col md={5}>
                <Image thumbnail src={placeholderImage} width="100%" />
              </Col>
              <Col md={7} className="d-flex flex-column mt-auto">
                <Form.Group controlId="formProductName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="product_name"
                    value={product.product_name}
                    readOnly={isViewOnly}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">₱</InputGroup.Text>

                    <Form.Control
                      type="number"
                      name="price"
                      value={product.price}
                      readOnly={isViewOnly}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="formQuantity">
                  <Form.Label>Available Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock_quantity"
                    value={product.stock_quantity}
                    readOnly={isViewOnly}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={product.description}
                    readOnly={isViewOnly}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={product.category}
                    disabled={isViewOnly}
                    required
                  >
                    <option value="">Select a Category</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Beauty & Personal Care">
                      Beauty and Personal Care
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Health & Fitness">Health and Fitness</option>
                    <option value="Home & Kitchen">Home and Kitchen</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                    <option value="Toys & Games">Toys & Games</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBarcode">
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="bar_code"
                    value={product.bar_code}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
      ) : (
        <Form
          onSubmit={formData == undefined ? handleAddSubmit : handleEditSubmit}
        >
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={(e) => {
                onChangeProduct("product_name", e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">₱</InputGroup.Text>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => {
                  onChangeProduct("price", e.target.value);
                }}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={product.description}
              onChange={(e) => {
                onChangeProduct("description", e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={product.category}
              onChange={(e) => {
                onChangeProduct("category", e.target.value);
              }}
              required
            >
              <option value="">Select a Category</option>
              <option value="Automotive">Automotive</option>
              <option value="Beauty & Personal Care">
                Beauty and Personal Care
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Health & Fitness">Health and Fitness</option>
              <option value="Home & Kitchen">Home and Kitchen</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Toys & Games">Toys & Games</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBarcode">
            <Form.Label>Barcode</Form.Label>
            <Form.Control
              type="text"
              name="bar_code"
              value={product.bar_code}
              onChange={(e) => {
                onChangeProduct("bar_code", e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Available Quantity</Form.Label>
            <Form.Control
              type="number"
              name="stock_quantity"
              value={product.stock_quantity}
              onChange={(e) => {
                onChangeProduct("stock_quantity", e.target.value);
              }}
              required
            />
          </Form.Group>
          <div>
            <Button
              className={Style.SubmitButton}
              type="submit"
              name="Submit"
            ></Button>
          </div>
        </Form>
      )}
    </>
  );
}
