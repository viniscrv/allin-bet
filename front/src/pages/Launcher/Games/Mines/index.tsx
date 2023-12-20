import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, Container } from "./styles";
import { ToastContext } from "../../../../contexts/ToastContext";
import { api } from "../../../../lib/axios";
import { AxiosError } from "axios";
import { UserContext } from "../../../../contexts/UserContext";
import { priceFormatter } from "../../../../utils/formatter";

const playerOptionsFormSchema = z.object({
    value: z.number()
});

interface Card {
    id: number;
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


    const [multiplier, setMultiplier] = useState<number>(2);
    const [nextMultiplier, setNextMultiplier] = useState<number>(2.5);
    const [minesQuantity, setMinesQuantity] = useState(5); 
    const [remainingGems, setRemainingGems] = useState(20);
    const [turnedCards, setTurnedCards] = useState<number[]>([]);
    const [amount, setAmount] = useState<number>(0);

    async function handleGame({ value }: playerOptionsFormData) {
        setAmount(value);
        
        if (!inGame) {
            setInGame(true);
            try {
                setLoading(true);

                const { data } = await api.post("/mines/generate", {
                    amount: value,
                    minesQuantity,
                });
                
                refreshUserData();
                setTurnedCards([]);
                setCards(data.deck);

                switch(minesQuantity) {
                    case 5:
                        setMultiplier(2);
                        setNextMultiplier(2.5);
                        break;
                    case 10:
                        setMultiplier(2);
                        setNextMultiplier(3);
                        break;
                    case 15:
                        setMultiplier(2);
                        setNextMultiplier(3.5);
                        break;
                    default: break;
                }

                setRemainingGems(20);
            } catch (err) {
                if (err instanceof AxiosError && err?.response?.data?.message) {
                    return console.log(err.response.data.message);
                }
            } finally {
                setLoading(false);
            }
            return;
        }

        // finalizou antes de perder/jackpot
        shootToast({
            title: "Encerrado com sucesso",
            description: `${priceFormatter.format(amount*multiplier)} adicionado à sua carteira`,
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

        refreshUserData();

        // reset game
        setCards(BASE_CARDS);
        setTurnedCards([]);
        setMultiplier(2);
        setNextMultiplier(2.5);
        setRemainingGems(20);
        setInGame(false);
    }

    function turnCard(id: number) {
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

                        switch(minesQuantity) {
                            case 5:
                                setMultiplier(state => state + 0.5);
                                setNextMultiplier(state => state + 0.5);
                                break;
                            case 10:
                                setMultiplier(state => state + 1);
                                setNextMultiplier(state => state + 1);
                                break;
                            case 15:
                                setMultiplier(state => state + 1.5);
                                setNextMultiplier(state => state + 1.5);
                                break;
                            default: break;
                        }

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
            setTurnedCards([]);
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
                minesQuantity,
                multiplier,
                amount
            });

            refreshUserData();
            setTurnedCards([]);

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
                            <input type="text" value={`${multiplier}x`} readOnly />

                            <span>Próximo multiplicador</span>
                            <input type="text" value={`${nextMultiplier}x`} readOnly />

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
                            <span>Número de minas: {minesQuantity}</span>
                            <select placeholder="Selecione" value={minesQuantity.toString()} onChange={(e) => setMinesQuantity(Number(e.target.value))}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    )}
                    <button
                        className="start-game-button"
                        disabled={loading || inGame && turnedCards.length == 0}
                    >
                        {inGame ? `Retirar ${priceFormatter.format(amount*multiplier)}` : "Começar jogo"}
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
