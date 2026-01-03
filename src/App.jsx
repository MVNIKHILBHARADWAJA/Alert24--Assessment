import { useState } from "react";
import "./app.css";

export default function App() {
  const [travellers, setTravellers] = useState([
    { name: "", contact: "", thumbprint: false }
  ]);
  const [travelDate, setTravelDate] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const TICKET_PRICE = 1000;
  const LIFE_JACKET_PRICE = 100;
  const GST_RATE = 0.18;

  const travellerCount = travellers.length;

  const ticketTotal = travellerCount * TICKET_PRICE;
  const lifeJacketTotal = travellerCount * LIFE_JACKET_PRICE;
  const gst = ticketTotal * GST_RATE;
  const finalAmount = ticketTotal + lifeJacketTotal + gst - discount;

  const handleTravellerChange = (index, field, value) => {
    const updated = [...travellers];
    updated[index][field] = value;
    setTravellers(updated);
  };

  const addTraveller = () => {
    setTravellers([
      ...travellers,
      { name: "", contact: "", thumbprint: false }
    ]);
  };

  const applyCoupon = () => {
    setDiscount(0);
    setCouponMsg("");

    if (coupon === "NEW10" && travellerCount >= 2) {
      setDiscount(100);
      setCouponMsg("Coupon applied successfully!");
    } else if (coupon === "NEW20" && travellerCount >= 4) {
      setDiscount(200);
      setCouponMsg("Coupon applied successfully!");
    } else {
      setCouponMsg("Invalid coupon or conditions not met");
    }
  };

  const handleSubmit = () => {
    for (let t of travellers) {
      if (!t.name || !t.contact || !t.thumbprint) {
        alert("Please fill all traveller details and capture thumbprint.");
        return;
      }
    }

    if (!travelDate) {
      alert("Please select travel date.");
      return;
    }

    alert("Checkout successful!");
  };

  return (
    <div className="container">
      <h1>Alert24 Checkout</h1>

      
      <section>
        <h2>Traveller Details</h2>

        {travellers.map((traveller, index) => (
          <div className="traveller-card" key={index}>
            <input
              type="text"
              placeholder="Customer Name"
              value={traveller.name}
              onChange={(e) =>
                handleTravellerChange(index, "name", e.target.value)
              }
            />

            <input
              type="tel"
              placeholder="Contact Number"
              value={traveller.contact}
              onChange={(e) =>
                handleTravellerChange(index, "contact", e.target.value)
              }
            />

            <button
              onClick={() =>
                handleTravellerChange(index, "thumbprint", true)
              }
              className={traveller.thumbprint ? "success" : ""}
            >
              {traveller.thumbprint ? "Thumbprint Captured ✔" : "Capture Thumbprint"}
            </button>
          </div>
        ))}

        <button onClick={addTraveller} className="add-btn">
          + Add Traveller
        </button>
      </section>

     
      <section>
        <h2>Travel Date</h2>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />
      </section>

     
      <section>
        <h2>Coupon</h2>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={applyCoupon}>Apply</button>
        <p className="coupon-msg">{couponMsg}</p>
      </section>


      <section className="summary">
        <h2>Price Summary</h2>
        <p>Travellers: {travellerCount}</p>
        <p>Ticket Total: ₹{ticketTotal}</p>
        <p>GST (18%): ₹{gst.toFixed(2)}</p>
        <p>Life Jacket: ₹{lifeJacketTotal}</p>
        <p>Discount: -₹{discount}</p>
        <h3>Final Amount: ₹{finalAmount.toFixed(2)}</h3>
      </section>

      <button className="pay-btn" onClick={handleSubmit}>
        Proceed to Pay
      </button>
    </div>
  );
}
