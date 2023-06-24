import { Controller, useForm } from "react-hook-form";
import { ColorButton, ColorSelect, Container, Roullete } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../lib/axios";
import { AxiosError } from "axios";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";

const playerOptionsFormSchema = z.object({
    value: z.number(),
    color: z.enum(["red", "black"])
});

type playerOptionsFormData = z.infer<typeof playerOptionsFormSchema>;

export function DoubleGain() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        control
    } = useForm<playerOptionsFormData>({
        resolver: zodResolver(playerOptionsFormSchema)
    });

    function startGame({ value, color }: playerOptionsFormData) {
        sendGameOptions(value, color);
    }

    const { refreshUserData } = useContext(UserContext);

    async function sendGameOptions(value: number, color: string) {
        try {
            const { data } = await api.post("/doublegain", {
                value,
                color
            });

            console.log(data);
            setOutcome(data.number);
            spinWheel();

            setTimeout(() => {
                refreshUserData();
            }, 6 * 1000);
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
        }
    }

    const [outcome, setOutcome] = useState<number>(0);

    const wheelRef = useRef<HTMLDivElement | null>(null);

    const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
    const rows = 12;
    const card = 75 + 3 * 2;

    const cards = new Array(rows).fill(null).map((_, rowIdx) => (
        <div className="row" key={rowIdx}>
            {order.map((number, index) => (
                <div
                    key={index}
                    className={`card ${
                        number === 0
                            ? "red"
                            : index % 2 === 0
                            ? "red"
                            : "black"
                    }`}
                >
                    {number}
                </div>
            ))}
        </div>
    ));

    function spinWheel() {
        const position = order.indexOf(outcome);
        let landingPosition = rows * 15 * card + position * card;
        let randomize = Math.floor(Math.random() * 75) - 75 / 2;
        landingPosition = landingPosition + randomize;

        const randomFactor = {
            x: Math.floor(Math.random() * 50) / 100,
            y: Math.floor(Math.random() * 20) / 100
        };

        if (wheelRef.current) {
            wheelRef.current.style.transitionTimingFunction = `cubic-bezier(0,${randomFactor.x},${randomFactor.y},1)`;
            wheelRef.current.style.transitionDuration = "6s";
            wheelRef.current.style.transform = `translate3d(-${landingPosition}px, 0px, 0px)`;

            setTimeout(() => {
                if (wheelRef.current) {
                    wheelRef.current.style.transitionTimingFunction = "";
                    wheelRef.current.style.transitionDuration = "";
                    const resetTo = -(position * card + randomize);
                    wheelRef.current.style.transform = `translate3d(${resetTo}px, 0px, 0px)`;
                }
            }, 6 * 1000);
        }
    }

    return (
        <Container>
            <h1>Double Gain</h1>

            <div className="game-container">
                <form onSubmit={handleSubmit(startGame)}>
                    <span>Quantia:</span>
                    <input
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
                                        Vermelho
                                    </ColorButton>
                                    <ColorButton value="black" color="black">
                                        Preto
                                    </ColorButton>
                                </ColorSelect>
                            );
                        }}
                    />

                    <button
                        className="start-game-button"
                        disabled={isSubmitting}
                    >
                        Começar jogo
                    </button>
                </form>

                <Roullete>
                    <div className="roulette-wrapper">
                        <div className="selector"></div>
                        <div className="wheel" ref={wheelRef}>
                            {new Array(29).fill(cards)}
                        </div>
                    </div>
                </Roullete>
            </div>
        </Container>
    );
}
