import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Buttons({ name, onClick, ...props }) {
  return (
    <section class="body__tableWrapper">
      <div class="body__container">
        <Button onClick={onClick} variant="primary" {...props}>
          {name}
        </Button>
      </div>
    </section>
  );
}
