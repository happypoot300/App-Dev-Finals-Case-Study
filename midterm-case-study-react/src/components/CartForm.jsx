//react
import React, { useState, useEffect } from "react";
//bootstrap
import Button from "../components/Button.jsx";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
//router
import { useNavigate } from "react-router-dom";
//css
import Style from "../css modules/ProductForm.module.css";

export default function CartForm({
  formData,
  handleAddProduct,
  handleEditProduct,
  handleAddToCart,
  handleCheckout,
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

  /*   function handleAddSubmit(event) {
    event.preventDefault();
    handleAddProduct(product);
  }
  function handleEditSubmit(event) {
    event.preventDefault();
    handleEditProduct(product);
  } */

  function handleCartSubmit(event) {
    event.preventDefault();
  }

  const navigate = useNavigate();
  function navigateToAddToCartPage() {
    navigate("/AddToCartPage", { replace: true });
  }

  function navigateToCheckoutPage() {
    navigate("/CheckoutPage", { replace: true });
  }

  return (
    <Form onSubmit={handleCartSubmit}>
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
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          onChange={(e) => {
            onChangeProduct("price", e.target.value);
          }}
          readOnly={isViewOnly}
          defaultValue={1}
          min="1"
          required
        />
      </Form.Group>

      <Container className="d-flex justify-content-end">
        <Button className={Style.AddToCartButton} name="+ Add to Cart">
          + Add to Cart
        </Button>
      </Container>
    </Form>
  );
}
