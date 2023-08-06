import {
    UserCircle,
    PencilCircle,
    ClockCounterClockwise,
    CreditCard,
    // HandCoins,
    Coins,
    ArrowLeft,
    List,
    X
} from "@phosphor-icons/react";
import { Aside, Container, Content, Header } from "./styles";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../lib/axios";
import { UserContext } from "../../contexts/UserContext";
import { priceFormatter } from "../../utils/formatter";
import logo from "../../assets/logo.jpg";
import Skeleton from "react-loading-skeleton";
import { Toast } from "../../components/Toast";

export function DefaultLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);

    const { toggleAuthenticatedState, authenticated } = useContext(AuthContext);
    const { userData, usernameCapitalized, loadingUserData } =
        useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) {
            navigate("/");
        }
    }, []);

    const sidebarSections = [
        {
            name: usernameCapitalized,
            pages: [
                {
                    path: "/launcher/profile",
                    icon: <UserCircle size={18} color="#8B8B8B" />,
                    title: "Ver perfil"
                },
                {
                    path: "/launcher/edit-profile",
                    icon: <PencilCircle size={18} color="#8B8B8B" />,
                    title: "Editar perfil"
                },
                {
                    path: "/launcher/history",
                    icon: <ClockCounterClockwise size={18} color="#8B8B8B" />,
                    title: "Meu histórico"
                },
                {
                    path: "/launcher/deposit",
                    icon: <CreditCard size={18} color="#8B8B8B" />,
                    title: "Depositar saldo"
                }
            ]
        },
        {
            name: "Jogos",
            pages: [
                {
                    path: "/launcher/games/double-gain",
                    icon: <Coins size={18} color="#8B8B8B" />,
                    title: "Double Gain"
                }
            ]
        }
    ];

    function handleLogout() {
        toggleAuthenticatedState(false);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        navigate("/");
    }

    function handleOpenSidebar() {
        setOpenSidebar(!openSidebar);
    }

    return (
        <Container>
            <Header>
                <NavLink to={"/launcher/home"} id="logo">
                    <img src={logo} alt="" />
                </NavLink>

                <button id="menu-btn" onClick={handleOpenSidebar}>
                    {openSidebar ? <X size={38} /> : <List size={38} />}
                </button>
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
                <Aside collapsable={openSidebar}>
                    <nav>
                        {sidebarSections.map((section) => {
                            return (
                                <div key={section.name}>
                                    <span>{section.name}</span>
                                    <ul>
                                        {section.pages.map((page) => {
                                            return (
                                                <NavLink
                                                    to={page.path}
                                                    key={page.title}
                                                >
                                                    <li>
                                                        {page.icon}
                                                        {page.title}
                                                    </li>
                                                </NavLink>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
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
            <Toast />
        </Container>
    );
}
