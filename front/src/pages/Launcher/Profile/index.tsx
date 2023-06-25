import { useContext, useEffect, useState } from "react";
import { Container, Statistics } from "./styles";
import dayjs from "dayjs";
import { CaretDoubleDown, CaretDoubleUp, Pen } from "@phosphor-icons/react";
import { UserContext } from "../../../contexts/UserContext";
import { NavLink } from "react-router-dom";
import { api } from "../../../lib/axios";
import { priceFormatter } from "../../../utils/formatter";

export function Profile() {
    const { userData, usernameCapitalized } = useContext(UserContext);

    const createdAt = dayjs(userData?.created_at).format("D/M/YYYY");

    interface metricsType {
        totalProfit: number;
        totalLosses: number;
    }

    const [metricsData, setMetricsData] = useState<metricsType>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("/metrics");
            setMetricsData(response.data);
        };

        fetchData();
    }, []);

    return (
        <Container>
            <h1>Meu perfil</h1>

            <main>
                <img src="https://github.com/vini9457128.png" />
                <div>
                    <h2>{usernameCapitalized}</h2>
                    <p>{userData?.summary}</p>
                    <span>Entrou em {createdAt}</span>
                </div>

                <div className="additional-information">
                    <h3>Informações adicionais</h3>
                    <div>
                        <p>E-mail</p>
                        <span>{userData?.email}</span>
                    </div>
                </div>

                <NavLink to={"/launcher/edit-profile"}>
                    <Pen size={24} />
                </NavLink>
            </main>
            <Statistics>
                <div>
                    <p>Total de ganhos</p>
                    <span>
                        <CaretDoubleUp size={16} weight="bold" />
                        {priceFormatter.format(metricsData?.totalProfit!)}
                    </span>
                </div>
                <div>
                    <p>Total de perdas</p>
                    <span>
                        <CaretDoubleDown size={16} weight="bold" />
                        {priceFormatter.format(metricsData?.totalLosses!)}
                    </span>
                </div>
            </Statistics>
        </Container>
    );
}
