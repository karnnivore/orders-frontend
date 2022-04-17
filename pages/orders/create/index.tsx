import { Container } from "@mui/material";
import { CreateOrderComponent } from "../../../components/orders/createOrder/CreateOrderComponent";

export default function Create() {
  return(
    <Container maxWidth="sm">
      <CreateOrderComponent/>
    </Container>
  )
}