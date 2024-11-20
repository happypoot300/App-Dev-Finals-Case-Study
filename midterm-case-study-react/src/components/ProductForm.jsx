//react
import React, { useState, useEffect } from "react";

//bootstrap
import Button from "../components/Button.jsx";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

//css
import Style from "../css modules/ProductForm.module.css";

export default function ProductForm({
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

  return (
    <Form onSubmit={formData == undefined ? handleAddSubmit : handleEditSubmit}>
      <Form.Group controlId="formProductName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="product_name"
          value={product.product_name}
          onChange={(e) => {
            onChangeProduct("product_name", e.target.value);
          }}
          readOnly={isViewOnly}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={(e) => {
            onChangeProduct("price", e.target.value);
          }}
          readOnly={isViewOnly}
          required
        />
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
          onChange={(e) => {
            onChangeProduct("category", e.target.value);
          }}
          readOnly={isViewOnly}
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
          readOnly={isViewOnly}
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
          readOnly={isViewOnly}
          required
        />
      </Form.Group>

      {isViewOnly ? (
        <Container>
          <Button className={Style.AddToCartButton}>Add to Cart</Button>

          <Button className={Style.BuyNowButton}>Buy Now</Button>
        </Container>
      ) : (
        <Button className={Style.SubmitButton} type="submit">
          Submit
        </Button>
      )}
    </Form>
  );
}
