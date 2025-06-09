// reactstrap components
import {
  Container
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import { CheckoutFormWrapper } from '../../components/Forms/AuthForms/CheckoutForms/CheckoutFormWrapper';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AuthFooter from "components/Footers/RegisterFooter.js";


function Checkout() {
  return (
    <>
      <IndexNavbar />
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "#57249F",
          clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
          marginBottom: "-350px",
          zIndex: "-10",
        }}
      >
      </div>
      <div className='bg-white'>
        <Container className='mt--9'>
          <CheckoutFormWrapper />
        </Container>
      </div>
      <AuthFooter />
    </>
  );
}

Checkout.layout = Auth;

export default Checkout;
