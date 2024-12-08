//react
import React, { useState, useEffect } from "react";
//bootstrap
import Button from "../components/Button.jsx";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
//css
import Style from "../css modules/ProductForm.module.css";

export default function CartForm({
  formData,
  handleAddToCart,
  id,
  userId,
  error,
}) {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const cartState = {
      user_id: userId,
      product_id: id,
      quantity: 1,
    };
    console.log("cartState from CartFrom: ", cartState);
    setCart(cartState);
  }, [userId, id]);
  console.table("cart from CartFrom: ", cart);

  function onChangeQuantity(column, value) {
    setCart({ ...cart, [column]: value });
  }

  function handleCartSubmit(event) {
    event.preventDefault();
    handleAddToCart(cart);
  }

  return (
    <Form onSubmit={handleCartSubmit}>
      <Form.Group controlId="formProductName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="product_name"
          value={formData.product_name}
          readOnly={true}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          onChange={(e) => {
            onChangeQuantity("quantity", e.target.value);
          }}
          defaultValue={1}
          min="1"
          required
        />
      </Form.Group>

      <Container className="d-flex justify-content-end">
        <Button
          type="submit"
          className={Style.AddToCartButton}
          name="+ Add to Cart"
        >
          + Add to Cart
        </Button>
      </Container>
    </Form>
  );
}
