import {
    UserCircle,
    PencilCircle,
    ClockCounterClockwise,
    CreditCard,
    HandCoins,
    Coins,
    ArrowLeft
} from "@phosphor-icons/react";
import { Aside, Container, Content, Header } from "./styles";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../lib/axios";
import { UserContext } from "../../contexts/UserContext";
import { priceFormatter } from "../../utils/formatter";

export function DefaultLayout() {
    const { toggleAuthenticatedState } = useContext(AuthContext);
    const { userData, usernameCapitalized } = useContext(UserContext);

    const navigate = useNavigate();

    function handleLogout() {
        toggleAuthenticatedState(false);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        navigate("/");
    }

    return (
        <Container>
            <Header>
                <h2>
                    <NavLink to={"/launcher"}>All in Bet Logo</NavLink>
                </h2>
                <div>
                    <img src="https://github.com/viniscrv.png" />
                    <span>{priceFormatter.format(userData?.balance!)}</span>
                </div>
            </Header>
            <Content>
                <Aside>
                    <nav>
                        <span>{usernameCapitalized}</span>
                        <ul>
                            <NavLink to={"/launcher/profile"}>
                                <li>
                                    <UserCircle size={18} color="#8B8B8B" />
                                    Ver perfil
                                </li>
                            </NavLink>
                            <li>
                                <PencilCircle size={18} color="#8B8B8B" />
                                Editar perfil
                            </li>
                            <NavLink to={"/launcher/history"}>
                                <li>
                                    <ClockCounterClockwise
                                        size={18}
                                        color="#8B8B8B"
                                    />
                                    Meu histórico
                                </li>
                            </NavLink>
                            <li>
                                <CreditCard size={18} color="#8B8B8B" />
                                Depositar saldo
                            </li>
                            <li>
                                <HandCoins size={18} color="#8B8B8B" />
                                Retirar saldo
                            </li>
                        </ul>
                        <span>Jogos</span>
                        <ul>
                            <li>
                                <Coins size={18} color="#8B8B8B" />
                                Double Gain
                            </li>
                        </ul>
                    </nav>
                    <span className="logout" onClick={handleLogout}>
                        <ArrowLeft size={18} color="#D94848" />
                        Sair
                    </span>
                </Aside>
                <section>
                    <Outlet />
                </section>
            </Content>
        </Container>
    );
}
