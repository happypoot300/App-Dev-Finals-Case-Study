// React
import React, { useState } from "react";
// CSS
import styles from "../../css modules/CheckoutPage.module.css";

const CheckoutPage = ({ cartItems = [], onConfirmOrder }) => {
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    street: "",
    city: "",
    province: "",
    zipCode: "",
    contactNumber: "",
  });
  const [contactError, setContactError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    //error handler
    if (name === "contactNumber" && !/^\d*$/.test(value)) {
      setContactError("Please enter a valid number.");
      return;
    } else {
      setContactError("");
    }

    //error handler
    if (name === "zipCode") {
      if (!/^\d+$/.test(value)) {
        setZipCodeError("Please enter a valid zip code (numbers only).");
        return;
      } else {
        setZipCodeError("");
      }
    }

    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleConfirmOrder = () => {
    const { name, street, city, province, zipCode, contactNumber } =
      shippingDetails;

    if (!name || !street || !city || !province || !zipCode || !contactNumber) {
      alert("Please fill in all shipping details.");
      return;
    }

    const newOrderData = {
      shippingDetails,
      paymentMethod,
      items: cartItems,
    };

    setOrderData(newOrderData);
    setShowReceipt(true);

    if (typeof onConfirmOrder === "function") {
      onConfirmOrder(newOrderData); // order details to api call
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <form className={styles.checkoutForm}>
        <div className={styles.inputGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={shippingDetails.name}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Address:</label>
          <div className={styles.addressFields}>
            <div className={styles.inputGroup}>
              <label>Province:</label>
              <input
                type="text"
                name="province"
                value={shippingDetails.province}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Street Name, Building no., Housing no.:</label>
              <input
                type="text"
                name="street"
                value={shippingDetails.street}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Zip Code:</label>
              <input
                type="text"
                name="zipCode"
                value={shippingDetails.zipCode}
                onChange={handleInputChange}
                className={`${styles.inputField} ${
                  zipCodeError ? styles.error : ""
                }`}
              />
              {zipCodeError && (
                <p className={styles.errorText}>{zipCodeError}</p>
              )}
            </div>
          </div>
        </div>

        {/* contact number */}
        <div className={styles.inputGroup}>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={shippingDetails.contactNumber}
            onChange={handleInputChange}
            className={`${styles.inputField} ${
              contactError ? styles.error : ""
            }`}
          />
          {contactError && <p className={styles.errorText}>{contactError}</p>}
        </div>

        {/* payment method */}
        <div className={styles.inputGroup}>
          <label>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className={styles.inputField}
          >
            <option value="cash-on-delivery">Cash on Delivery</option>
            <option value="gcash">Gcash</option>
            <option value="credit-card">Credit Card</option>
          </select>
        </div>

        {/* confirm order button */}
        <button
          type="button"
          onClick={handleConfirmOrder}
          className={styles.confirmOrderBtn}
        >
          Confirm Order
        </button>
      </form>

      {/* Show Receipt pop up*/}
      {showReceipt && orderData && (
        <div className={styles.receiptModal}>
          <h3>Receipt</h3>
          <p>
            <strong>Name:</strong> {orderData.shippingDetails.name}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${orderData.shippingDetails.street}, ${orderData.shippingDetails.city}, ${orderData.shippingDetails.province}, ${orderData.shippingDetails.zipCode}`}
          </p>
          <p>
            <strong>Contact Number:</strong>{" "}
            {orderData.shippingDetails.contactNumber}
          </p>
          <p>
            <strong>Payment Method:</strong> {orderData.paymentMethod}
          </p>
          <h4>Items:</h4>
          <ul>
            {Array.isArray(orderData.items) && orderData.items.length > 0 ? (
              orderData.items.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                </li>
              ))
            ) : (
              <li>No items in the cart.</li>
            )}
          </ul>
          <button
            onClick={() => setShowReceipt(false)}
            className={styles.closeBtn}
          >
            Close
          </button>
        </div>
      )}
      {showReceipt && (
        <div className={styles.overlay} onClick={() => setShowReceipt(false)} />
      )}
    </div>
  );
};

export default CheckoutPage;
