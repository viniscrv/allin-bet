import {
    Article,
    CalendarBlank,
    Coins,
    GameController,
    Money
} from "@phosphor-icons/react";
import { Container, HistoryList } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import dayjs from "dayjs";
import { priceFormatter } from "../../../utils/formatter";
import Skeleton from "react-loading-skeleton";

export function History() {
    interface dataType {
        Bet: {
            created_at: Date;
            isVictory: boolean;
            value: string;
        }[];
    }

    const [data, setData] = useState<dataType>();
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        setLoadingHistory(true);
        const fetchData = async () => {
            const response = await api.get("/history");
            setData(response.data.userBets);
            setLoadingHistory(false);
        };

        fetchData();
    }, []);

    function formatDate(date: Date) {
        const createdAt = dayjs(date).format("D/M/YYYY");

        return createdAt;
    }

    return (
        <Container>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span>
                                    <GameController size={18} color="#8B8B8B" />
                                    Jogo
                                </span>
                            </th>
                            <th>
                                <span>
                                    <Money size={18} color="#8B8B8B" />
                                    Valor apostado
                                </span>
                            </th>
                            <th>
                                <span>
                                    <Article size={18} color="#8B8B8B" />
                                    Resultado
                                </span>
                            </th>
                            <th>
                                <span>
                                    <CalendarBlank size={18} color="#8B8B8B" />
                                    Data
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingHistory ? (
                            <tr>
                                <td colSpan={4} style={{ padding: 0 }}>
                                    {[1, 2, 3, 4, 5, 6].map((i) => {
                                        return (
                                            <Skeleton
                                                key={i}
                                                baseColor="#171717"
                                                highlightColor="#202024"
                                                borderRadius={4}
                                                height={20}
                                                duration={0.5}
                                            />
                                        );
                                    })}
                                </td>
                            </tr>
                        ) : (
                            data?.Bet.map((bet, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span>
                                                <Coins
                                                    size={18}
                                                    color="#8B8B8B"
                                                />
                                                Double gain
                                            </span>
                                        </td>
                                        <td>
                                            {priceFormatter.format(
                                                Number(bet.value)
                                            )}
                                        </td>
                                        {bet.isVictory && (
                                            <td style={{ color: "#358e43" }}>
                                                Vitória
                                            </td>
                                        )}
                                        {!bet.isVictory && (
                                            <td style={{ color: "#D94848" }}>
                                                Derrota
                                            </td>
                                        )}

                                        <td>{formatDate(bet.created_at)}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </HistoryList>
        </Container>
    );
}
