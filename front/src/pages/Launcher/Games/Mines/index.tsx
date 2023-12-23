import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, Container } from "./styles";
import { ToastContext } from "../../../../contexts/ToastContext";
import { api } from "../../../../lib/axios";
import { AxiosError } from "axios";
import { UserContext } from "../../../../contexts/UserContext";
import { priceFormatter } from "../../../../utils/formatter";
import { SketchLogo, SmileyXEyes } from "@phosphor-icons/react";

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

    const [multiplier, setMultiplier] = useState<number>(1);
    const [nextMultiplier, setNextMultiplier] = useState<number>(2.5);
    const [minesQuantity, setMinesQuantity] = useState<number>(5); 
    const [remainingGems, setRemainingGems] = useState<number>(20);
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
                        setMultiplier(1);
                        setNextMultiplier(1.5);
                        break;
                    case 10:
                        setMultiplier(1);
                        setNextMultiplier(2);
                        break;
                    case 15:
                        setMultiplier(1);
                        setNextMultiplier(2.5);
                        break;
                    default: break;
                }

                setRemainingGems(25 - minesQuantity);
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

        sendResult();
    }

    function turnCard(id: number) {
        if (!inGame) {
            shootToast({
                title: "Erro",
                description: "Você não iniciou o jogo",
                color: "red"
            });

            return;
        }

        if (loading) {
            return;
        }

        let losed = false;

        let newMockCards = cards.map((item) => {
            const cardId = item.id;

            if (cardId == id) {
                item.turned = true;

                // lose
                if (item.value == "diamond") {
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
                } else {
                    shootToast({
                        title: "Não foi dessa vez",
                        description: "Infelizmente você perdeu desta vez",
                        color: "red"
                    });

                    setMinesQuantity(state => state - 1);

                    losed = true;
                    sendResult({losed, jackpot: false});
                }
            }

            return item;
        });

        setCards(newMockCards);

        return;
    }

    function jackpot() {
        // TODO: não está enviando o ultimo multiplicador
        shootToast({
            title: "JACKPOT",
            description: `${priceFormatter.format(amount*multiplier)} adicionado à sua carteira`,
            color: "green"
        });

        let params = {
            losed: false,
            jackpot: true,
        }

        sendResult(params);
    }

    function resetGame() {

        setCards(BASE_CARDS);
        setTurnedCards([]);
        setMultiplier(1);
        setNextMultiplier(1.5);
        setRemainingGems(20);
        setMinesQuantity(5);
        setInGame(false);
    }

    interface ResultParams {
        losed?: boolean;
        jackpot?: boolean;
    }

    async function sendResult(params: ResultParams = {}) {
        const { losed=false, jackpot=false } = params;

        try {
            setLoading(true);

            await api.post("/mines/result", {
                remainingGems,
                minesQuantity: losed ? 4 : 5, //gambi
                multiplier: jackpot ? nextMultiplier : multiplier, //gambi
                amount
            });

            refreshUserData();

            if (losed) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            resetGame();

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
                                    <input type="text" value={minesQuantity.toString()} readOnly />
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
                    {cards?.map((card: Card, index) => {
                        return (
                            <Card key={index} onClick={() => turnCard(card.id)}>
                                {card.turned ? (
                                    card.value == "diamond" ? (
                                        <SketchLogo size={42} weight="thin" color="#E52151"/>
                                        ) : (
                                        <SmileyXEyes size={42} weight="duotone" color="#E52151"/>
                                    )
                                ) : null}
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}
