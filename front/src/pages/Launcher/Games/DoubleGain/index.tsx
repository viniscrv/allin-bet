import { Controller, useForm } from "react-hook-form";
import { ColorButton, ColorSelect, Container, Roullete } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../lib/axios";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { ToastContext } from "../../../../contexts/ToastContext";
import Confetti from "react-confetti";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

const playerOptionsFormSchema = z.object({
    value: z.number(),
    color: z.enum(["red", "white", "black"])
});

type playerOptionsFormData = z.infer<typeof playerOptionsFormSchema>;

export function DoubleGain() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shootConfetti, setShootConfetti] = useState<boolean>(false);

    const { register, handleSubmit, control } = useForm<playerOptionsFormData>({
        resolver: zodResolver(playerOptionsFormSchema)
    });

    function startGame({ value, color }: playerOptionsFormData) {
        setLoading(true);
        setShootConfetti(false);
        sendGameOptions(value, color);
    }

    const { refreshUserData } = useContext(UserContext);
    const { shootToast } = useContext(ToastContext);

    async function sendGameOptions(value: number, color: string) {
        try {
            const { data } = await api.post("/doublegain", {
                amount: value,
                color
            });

            spinWheel(data.number);
            setIsButtonDisabled(true);

            setTimeout(() => {
                setIsButtonDisabled(false);
                refreshUserData();
                
                if (data.is_jackpot) {
                    setShootConfetti(true);
                }

                if (Object.keys(data).includes("gains")) {
                    return shootToast({
                        title: "Vitória!",
                        description:
                            "Parabéns, você venceu e seu saldo foi atualizado",
                        color: "green"
                    });
                }

                shootToast({
                    title: "Não foi dessa vez",
                    description: "Infelizmente você perdeu desta vez",
                    color: "red"
                });
            }, 6 * 1000);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];

    const [position, setPosition] = useState(0);
    const [transform, setTransform] = useState("");
    const [rotate, setRotate] = useState(false);

    function spinWheel(roll: number) {
        const index = order.indexOf(roll);
        const rows = 12;
        const card = 75 + 3 * 2;
        let landingPosition = rows * 15 * card + index * card;
        const randomize = Math.floor(Math.random() * 75) - 75 / 2;
        landingPosition = landingPosition + randomize;
        setTransform(`translate3d(-${landingPosition}px, 0px, 0px)`);
        setPosition(index);
        setRotate(true);
    }

    useEffect(() => {
        if (rotate) {
            setTimeout(() => {
                const card = 75 + 3 * 2;
                const randomize = Math.floor(Math.random() * 75) - 75 / 2;
                const resetTo = -(position * card + randomize);
                setTransform(`translate3d(${resetTo}px, 0px, 0px)`);
                setRotate(false);
            }, 6 * 1000);
        }
    }, [rotate, position]);

    const cards = [
        { value: 1, class: "red" },
        { value: 14, class: "black" },
        { value: 2, class: "red" },
        { value: 13, class: "black" },
        { value: 3, class: "red" },
        { value: 12, class: "black" },
        { value: 4, class: "red" },
        { value: 0, class: "white" },
        { value: 11, class: "black" },
        { value: 5, class: "red" },
        { value: 10, class: "black" },
        { value: 6, class: "red" },
        { value: 9, class: "black" },
        { value: 7, class: "red" },
        { value: 8, class: "black" }
    ];

    const { width, height } = useWindowDimensions();

    return (
        <Container>
            <Confetti
                width={width}
                height={height}
                colors={["#E52151", "#BE123C"]}
                recycle={false}
                run={shootConfetti}
                gravity={.3}
            />

            <h1>Double Gain</h1>

            <div className="game-container">
                <form onSubmit={handleSubmit(startGame)}>
                    <span>Quantia:</span>
                    <input
                        placeholder="R$ 0,00"
                        type="text"
                        style={{ textAlign: "right" }}
                        {...register("value", { valueAsNumber: true })}
                    />

                    <span>Selecione uma cor:</span>
                    <Controller
                        control={control}
                        name="color"
                        render={({ field }) => {
                            return (
                                <ColorSelect
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <ColorButton value="red" color="red">
                                        2x
                                    </ColorButton>
                                    <ColorButton value="white" color="white">
                                        14x
                                    </ColorButton>
                                    <ColorButton value="black" color="black">
                                        2x
                                    </ColorButton>
                                </ColorSelect>
                            );
                        }}
                    />

                    <button
                        className="start-game-button"
                        disabled={isButtonDisabled || loading}
                    >
                        Começar jogo
                    </button>
                </form>

                <Roullete>
                    <div className="roulette-wrapper">
                        <div
                            className="wheel"
                            style={{
                                transform: transform,
                                transition: rotate ? "6s" : "0s"
                            }}
                        >
                            {[...Array(29)].map((_, i) => (
                                <div className="row" key={i}>
                                    {cards.map((card, j) => (
                                        <div
                                            className={`card ${card.class}`}
                                            key={j}
                                        >
                                            {card.value}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="selector"></div>
                    </div>
                </Roullete>
            </div>
        </Container>
    );
}

// <div className="selector"></div>
