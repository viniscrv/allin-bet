import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, Container } from "./styles";
import { ToastContext } from "../../../../contexts/ToastContext";
import { api } from "../../../../lib/axios";
import { AxiosError } from "axios";
import { UserContext } from "../../../../contexts/UserContext";

const playerOptionsFormSchema = z.object({
    value: z.number()
});

interface Card {
    id: Number;
    value: String;
    turned: Boolean;
}

const BASE_CARDS: Card[] = [
    { id: 1, value: "", turned: false },
    { id: 2, value: "", turned: false },
    { id: 3, value: "", turned: false },
    { id: 4, value: "", turned: false },
    { id: 5, value: "", turned: false },
    { id: 6, value: "", turned: false },
    { id: 7, value: "", turned: false },
    { id: 8, value: "", turned: false },
    { id: 9, value: "", turned: false },
    { id: 10, value: "", turned: false },
    { id: 11, value: "", turned: false },
    { id: 12, value: "", turned: false },
    { id: 13, value: "", turned: false },
    { id: 14, value: "", turned: false },
    { id: 15, value: "", turned: false },
    { id: 16, value: "", turned: false },
    { id: 17, value: "", turned: false },
    { id: 18, value: "", turned: false },
    { id: 19, value: "", turned: false },
    { id: 20, value: "", turned: false },
    { id: 21, value: "", turned: false },
    { id: 22, value: "", turned: false },
    { id: 23, value: "", turned: false },
    { id: 24, value: "", turned: false },
    { id: 25, value: "", turned: false }
];

type playerOptionsFormData = z.infer<typeof playerOptionsFormSchema>;

export function Mines() {
    // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit } = useForm<playerOptionsFormData>({
        resolver: zodResolver(playerOptionsFormSchema)
    });

    const { refreshUserData } = useContext(UserContext);
    const { shootToast } = useContext(ToastContext);

    const [inGame, setInGame] = useState(false);
    const [cards, setCards] = useState<Card[]>(BASE_CARDS);

    const [remainingGems, setRemainingGems] = useState(20);
    const [turnedCards, setTurnedCards] = useState<Number[]>([]);
    const [amount, setAmount] = useState<Number>();

    async function handleGame({ value }: playerOptionsFormData) {
        setAmount(value);
        
        if (!inGame) {
            console.log("!inGame");
            try {
                setLoading(true);

                const { data } = await api.post("/mines/generate", {
                    amount: value,
                    minesQuantity: 5,
                });
                
                refreshUserData();
                setCards(data.deck);

                setRemainingGems(20);
            } catch (err) {
                if (err instanceof AxiosError && err?.response?.data?.message) {
                    return console.log(err.response.data.message);
                }
            } finally {
                setLoading(false);
            }

            setInGame(true);
            return;
        }

        // finalizou antes de perder/jackpot
        shootToast({
            title: "Encerrado com sucesso",
            description: `${value} adicionado à sua carteira`,
            color: "green"
        });

        setCards(BASE_CARDS);
        setInGame(false);
    }

    function jackpot() {
        // TODO: jackpot logica
        shootToast({
            title: "jackpot",
            description: "...",
            color: "green"
        });

        // refreshUserData();

        // reset game
        setCards(BASE_CARDS);
        setTurnedCards([]);
        setRemainingGems(20);
        setInGame(false);
    }

    function turnCard(id: Number) {
        if (!inGame) {
            shootToast({
                title: "Erro",
                description: "Você não iniciou o jogo",
                color: "red"
            });
        }

        let losed = false;

        let newMockCards = cards.map((item) => {
            const cardId = item.id;

            if (cardId == id) {
                item.turned = true;

                // lose
                if (item.value == "bomb") {
                    losed = true;
                } else {
                    if (!turnedCards.includes(cardId)) {
                        setTurnedCards([...turnedCards, cardId]);
                        setRemainingGems(remainingGems - 1);

                        if (remainingGems == 1) {
                            jackpot();
                        }
                    }
                }
            }

            return item;
        });

        if (losed) {
            sendResult();

            shootToast({
                title: "Não foi dessa vez",
                description: "Infelizmente você perdeu desta vez",
                color: "red"
            });
            
            // reset game
            setCards(BASE_CARDS);
            setInGame(false);

            return;
        }

        setCards(newMockCards);
    }

    async function sendResult() {
        try {
            setLoading(true);

            const { data } = await api.post("/mines/result", {
                remainingGems,
                minesQuantity: 5,
                multiplier: 2, // TODO: alterar
                amount
            });

            refreshUserData();

            console.log("result", data);

            // TODO: reset game
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <h1>Mines </h1>
            <span>ingame {inGame ? "true" : "false"}</span>

            <div className="game-container">
                <form onSubmit={handleSubmit(handleGame)}>
                    <span>Quantia:</span>
                    <input
                        placeholder="R$ 0,00"
                        type="text"
                        style={{ textAlign: "right" }}
                        readOnly={inGame}
                        {...register("value", { valueAsNumber: true })}
                    />

                    {inGame ? (
                        <div className="game-informations">
                            <span>Multiplicador atual</span>
                            <input type="text" value="2x" readOnly />

                            <span>Próximo multiplicador</span>
                            <input type="text" value="2.5x" readOnly />

                            <div className="game-informations-sm">
                                <div>
                                    <span>Minas</span>
                                    <input type="text" value="5" readOnly />
                                </div>
                                <div>
                                    <span>Gemas</span>
                                    <input
                                        type="text"
                                        value={remainingGems}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span>Número de minas:</span>
                            <select placeholder="Selecione">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    )}
                    <button
                        className="start-game-button"
                        disabled={loading}
                    >
                        {inGame ? "Retirar 00,00" : "Começar jogo"}
                    </button>
                </form>

                <div className="grid-cards">
                    {cards?.map((card, index) => {
                        return (
                            <Card key={index} onClick={() => turnCard(card.id)}>
                                {/* {card.turned ? card.value : null} */}

                                {card.value == "bomb" ? (
                                    <span style={{ border: "1px solid red" }}>
                                        {card.value}
                                    </span>
                                ) : (
                                    <span>{card.value}</span>
                                )}
                            </Card>

                        );
                    })}
                </div>
            </div>
        </Container>
    );
}
