import { useEffect, useState } from "react";
import { Container, Statistics } from "./styles";
import { api } from "../../../lib/axios";
import dayjs from "dayjs";
import { CaretDoubleDown, CaretDoubleUp, Pen } from "@phosphor-icons/react";

export function Profile() {

    interface dataType {
        username: string;
        email: string;
        created_at: Date;
        balance: number;
    }

    const [data, setData] = useState<dataType>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("/me");
            setData(response.data.user);
        };

        fetchData();
    }, []);

    const createdAt = dayjs(data?.created_at).format("D/M/YYYY");

    function capitalizeUsername(username: string) {
        return username.charAt(0).toUpperCase() + username.slice(1);
    }

    const username = capitalizeUsername(data?.username ? data?.username : "username");

    return (
        <Container>
            <h1>Meu perfil</h1>

            <main>
                <img src="https://github.com/viniscrv.png" />
                <div>
                    <h2>{username}</h2>
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
                        <span>{data?.email}</span>
                    </div>
                </div>

                <button><Pen size={24}/></button>
            </main>
            <Statistics>
                <div>
                    <p>Total de ganhos</p>
                    <span><CaretDoubleUp size={16} weight="bold" />R$ 0,00</span>
                </div>
                <div>
                    <p>Total de perdas</p>
                    <span><CaretDoubleDown size={16} weight="bold" />R$ 0,00</span>
                </div>
            </Statistics>
        </Container>
    );
}
