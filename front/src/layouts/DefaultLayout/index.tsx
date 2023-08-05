import {
    UserCircle,
    PencilCircle,
    ClockCounterClockwise,
    CreditCard,
    // HandCoins,
    Coins,
    ArrowLeft
} from "@phosphor-icons/react";
import { Aside, Container, Content, Header } from "./styles";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../lib/axios";
import { UserContext } from "../../contexts/UserContext";
import { priceFormatter } from "../../utils/formatter";
import logo from "../../assets/logo.jpg";
import Skeleton from "react-loading-skeleton";

export function DefaultLayout() {
    const { toggleAuthenticatedState, authenticated } = useContext(AuthContext);
    const { userData, usernameCapitalized, loadingUserData } =
        useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) {
            navigate("/");
        }
    }, []);

    function handleLogout() {
        toggleAuthenticatedState(false);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        navigate("/");
    }

    return (
        <Container>
            <Header>
                <NavLink to={"/launcher/home"}>
                    <img id="logo" src={logo} alt="" />
                </NavLink>
                <div>
                    <NavLink to={"/launcher/profile"}>
                        <img src="https://github.com/vini9457128.png" />
                    </NavLink>
                    <span>
                        {loadingUserData ? (
                            <Skeleton
                                width={80}
                                baseColor="#171717"
                                highlightColor="#202024"
                                borderRadius={4}
                                height={30}
                                duration={0.5}
                            />
                        ) : (
                            priceFormatter.format(userData?.balance!)
                        )}
                    </span>
                </div>
            </Header>
            <Content>
                <Aside>
                    <nav>
                        <span>{usernameCapitalized}</span>
                        <ul>
                            <NavLink
                                to={"/launcher/profile"}
                            >
                                <li>
                                    <UserCircle size={18} color="#8B8B8B" />
                                    Ver perfil
                                </li>
                            </NavLink>
                            <NavLink to={"/launcher/edit-profile"}>
                                <li>
                                    <PencilCircle size={18} color="#8B8B8B" />
                                    Editar perfil
                                </li>
                            </NavLink>
                            <NavLink to={"/launcher/history"}>
                                <li>
                                    <ClockCounterClockwise
                                        size={18}
                                        color="#8B8B8B"
                                    />
                                    Meu histórico
                                </li>
                            </NavLink>
                            <NavLink to={"/launcher/deposit"}>
                                <li>
                                    <CreditCard size={18} color="#8B8B8B" />
                                    Depositar saldo
                                </li>
                            </NavLink>
                            {/* <li>
                                <HandCoins size={18} color="#8B8B8B" />
                                Retirar saldo
                            </li> */}
                        </ul>
                        <span>Jogos</span>
                        <ul>
                            <NavLink to={"/launcher/games/double-gain"}>
                                <li>
                                    <Coins size={18} color="#8B8B8B" />
                                    Double Gain
                                </li>
                            </NavLink>
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
