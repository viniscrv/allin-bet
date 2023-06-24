import { Container } from "./styles";
import { NavLink } from "react-router-dom";

export function Presentation() {
    return (
        <Container>
            <h1>Conecte-se com a sorte e aposte com confiança</h1>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur et est magnam nam asperiores dolore nemo quibusdam.
            </p>
            <NavLink to="/login">
                <button>Começar</button>
            </NavLink>
            <a href="/signup">Ainda não tenho uma conta</a>
        </Container>
    );
}
