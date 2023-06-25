import { useContext } from "react";
import { Container, Statistics } from "./styles";
import dayjs from "dayjs";
import { CaretDoubleDown, CaretDoubleUp, Pen } from "@phosphor-icons/react";
import { UserContext } from "../../../contexts/UserContext";

export function Profile() {
    const { userData, usernameCapitalized } = useContext(UserContext);

    const createdAt = dayjs(userData?.created_at).format("D/M/YYYY");

    return (
        <Container>
            <h1>Meu perfil</h1>

            <main>
                <img src="https://github.com/vini9457128.png" />
                <div>
                    <h2>{usernameCapitalized}</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corporis, aspernatur sint. Repellendus obcaecati
                        pariatur nesciunt
                    </p>
                    <span>Entrou em {createdAt}</span>
                </div>

                <div className="additional-information">
                    <h3>Informações adicionais</h3>
                    <div>
                        <p>E-mail</p>
                        <span>{userData?.email}</span>
                    </div>
                </div>

                <button>
                    <Pen size={24} />
                </button>
            </main>
            <Statistics>
                <div>
                    <p>Total de ganhos</p>
                    <span>
                        <CaretDoubleUp size={16} weight="bold" />
                        R$ 0,00
                    </span>
                </div>
                <div>
                    <p>Total de perdas</p>
                    <span>
                        <CaretDoubleDown size={16} weight="bold" />
                        R$ 0,00
                    </span>
                </div>
            </Statistics>
        </Container>
    );
}
