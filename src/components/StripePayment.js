import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { loadStripe } from "@stripe/stripe-js";

function StripePayment() {
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51NIWYSSFtn2sDko4j2NotyhGX9N2aB7yC2I5RUguTklqBjLcJpsUhqF1EJl4bQAVhM3c4YdmzM61j12JrtVSWfXJ00tgUsi2Ty"
    );
    const body = { product };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:8000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const [product, setProduct] = useState({
    name: "Go FullStack with KnowledgeHut",
    price: 1000,
    productOwner: "KnowledgeHut",
    description:
      "This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.",
    quantity: 1,
  });

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img
        variant="top"
        src="https://images.pexels.com/photos/12428359/pexels-photo-12428359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary" onClick={makePayment}>
          Buy Now for {product.price}
        </Button>
      </Card.Body>
    </Card>
  );
}
export default StripePayment;
