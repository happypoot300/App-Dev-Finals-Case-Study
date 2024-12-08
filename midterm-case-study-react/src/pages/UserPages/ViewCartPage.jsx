// React
import React, { useState, useEffect } from "react";
// Bootstrap
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";
// CSS
import Style from "../../css modules/ViewCartPage.module.css";
// React router
import { useNavigate, useLocation, useParams } from "react-router-dom";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// Images Template
import Image from "react-bootstrap/Image";
import placeholderImage from "../../images/placeholder_Image.jpg";

export default function ViewCartPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  //------------------------CART------------------------------------------------
  const [cart, setCart] = useState([]);

  function onChangeQuantity(itemId, value) {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: value };
        }
        return item;
      });
      return updatedCart;
    });

    fetch(`http://127.0.0.1:8000/api/carts/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: value }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  //------------------------END------------------------------------------------

  //------------------------CARTS FOR SPECIFIC USER-----------------------------
  const [userId, setUserId] = useState();
  const location = useLocation();
  useEffect(() => {
    setUserId(location.state?.userId);
    fetch(`http://127.0.0.1:8000/api/carts/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => setCart(data))
      .catch((error) => {
        console.log(error);
      });
  }, [location, userId]);
  console.log("userId from ViewCartPage: ", userId);
  //------------------------END------------------------------------------------

  //-------------------------PRODUCTS-------------------------------------
  const [products, setProducts] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await Promise.all(
        cart.map((item) =>
          fetch(`http://127.0.0.1:8000/api/products/${item.product_id}`).then(
            (response) => response.json()
          )
        )
      );
      setProducts(
        Object.fromEntries(
          productsData.map((product, index) => [
            cart[index].product_id,
            product,
          ])
        )
      );
    };
    fetchProducts();
  }, [cart]);
  //------------------------END PRODUCTS------------------------------------------------

  function updateCartTable() {
    console.log(" userId from updateCartTable: ", userId);
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
  }

  function onDeleteItem(id) {
    fetch(`http://127.0.0.1:8000/api/carts/${id}`, {
      method: "DELETE",
    })
      .then(() => updateCartTable())
      .catch((error) => console.error("Error deleting item:", error));
  }

  function onClearCart() {
    fetch(`http://127.0.0.1:8000/api/carts/${userId}/clear`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setCart([]);
        console.log("Cart cleared successfully");
      })
      .catch((error) => console.error("Error clearing cart:", error));
  }

  function navigateToHome() {
    navigate("/ViewProductPage", {
      state: { userId: userId },
      replace: true,
    });
  }

  return (
    <Container className="mt-5">
      <div className={Style.addProductContainer}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className="text-center">Your Cart</h1>
          <Button variant="link" onClick={navigateToHome}>
            <FontAwesomeIcon className="pt-2" icon={faChevronLeft} size="2xl" />
          </Button>
        </div>
        <div style={{ maxHeight: "340px", overflowY: "auto" }}>
          <Table responsive="sm" striped bordered hover>
            <thead className="sticky-top">
              <tr>
                <th style={{ width: "30%" }}>Product Name</th>
                <th style={{ width: "20%" }}>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex text-left align-items-center">
                      <Image thumbnail src={placeholderImage} width="30%" />
                      <p style={{ marginLeft: 10 }}>
                        {products[item.product_id]?.product_name}
                      </p>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          onChangeQuantity(item.id, e.target.value);
                        }}
                        className="form-control"
                      />
                    </td>
                    <td>₱{products[item.product_id]?.price}</td>
                    <td>
                      ₱
                      {(
                        products[item.product_id]?.price * item.quantity
                      ).toFixed(2)}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => onDeleteItem(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Items In Cart
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {error && <p className="text-danger text-center">{error}</p>}
        </div>
        <Row className="justify-content-end mt-5">
          <Form onSubmit={onClearCart}>
            <Row>
              <Col md={8}>
                <Card>
                  <Card.Body>
                    <Card.Title>Shipping Details</Card.Title>
                    <Form.Group controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formState">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter state"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter zip"
                        required
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                md={4}
                className="d-flex flex-column justify-content-between"
              >
                <Card>
                  <Card.Body>
                    <Card.Title>Payment Method</Card.Title>
                    <Form.Group controlId="formPaymentMethod">
                      <Form.Label>Payment Method</Form.Label>
                      <Form.Control as="select">
                        <option>Cash on Delivery</option>
                        <option>GCash e-Wallet</option>
                        <option>MAYA</option>
                        <option>PayPal</option>
                        <option>Credit/Debit Card</option>
                      </Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body>
                    <Card.Title>Grand Total</Card.Title>
                    <Card.Text>
                      ₱
                      {cart
                        .reduce((acc, item) => {
                          return (
                            acc +
                            products[item.product_id]?.price * item.quantity
                          );
                        }, 0)
                        .toFixed(2)}
                    </Card.Text>
                    <Button variant="primary" type="submit">
                      Checkout
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </Container>
  );
}
