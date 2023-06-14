import {
    CalendarBlank,
    Club,
    Coins,
    GameController,
    Money
} from "@phosphor-icons/react";
import { Container, HistoryList } from "./styles";

export function History() {
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
                                    <Club size={18} color="#8B8B8B" />
                                    Ganhos/Perdas
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
                        <tr>
                            <td>
                                <span>
                                    <Coins size={18} color="#8B8B8B" />
                                    Double gain
                                </span>
                            </td>
                            <td>R$ 62,00</td>
                            <td>+ R$ 62,00</td>
                            <td>01/01/2023</td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <Coins size={18} color="#8B8B8B" />
                                    Double gain
                                </span>
                            </td>
                            <td>R$ 62,00</td>
                            <td>+ R$ 62,00</td>
                            <td>01/01/2023</td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <Coins size={18} color="#8B8B8B" />
                                    Double gain
                                </span>
                            </td>
                            <td>R$ 62,00</td>
                            <td>+ R$ 62,00</td>
                            <td>01/01/2023</td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <Coins size={18} color="#8B8B8B" />
                                    Double gain
                                </span>
                            </td>
                            <td>R$ 62,00</td>
                            <td>+ R$ 62,00</td>
                            <td>01/01/2023</td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <Coins size={18} color="#8B8B8B" />
                                    Double gain
                                </span>
                            </td>
                            <td>R$ 62,00</td>
                            <td>+ R$ 62,00</td>
                            <td>01/01/2023</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </Container>
    );
}
