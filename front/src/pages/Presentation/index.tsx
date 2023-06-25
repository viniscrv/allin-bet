import { Container } from "./styles";
import { NavLink } from "react-router-dom";

export function Presentation() {
    return (
        <Container>
            <h1>Conecte-se com a sorte e aposte com confiança</h1>
            <p>
                Aventure-se nas apostas sem consequências reais! Explore
                estratégias com saldo virtual e aproveite a diversão sem riscos.
            </p>
            <NavLink to="/login">
                <button>Começar</button>
            </NavLink>
            <NavLink to={"/register"}>Ainda não tenho uma conta</NavLink>
        </Container>
    );
}
