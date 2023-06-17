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

export function History() {
    interface dataType {
        Bet: {
            created_at: Date;
            isVictory: boolean;
            value: string;
        }[];
    }

    const [data, setData] = useState<dataType>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("/history");
            setData(response.data.userBets);
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
                        {data?.Bet.map((bet, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <span>
                                            <Coins size={18} color="#8B8B8B" />
                                            Double gain
                                        </span>
                                    </td>
                                    <td>{priceFormatter.format(Number(bet.value))}</td>
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
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </Container>
    );
}
