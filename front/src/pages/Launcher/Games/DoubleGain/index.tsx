import { Controller, useForm } from "react-hook-form";
import { ColorButton, ColorSelect, Container } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../lib/axios";
import { AxiosError } from "axios";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";

const playerOptionsFormSchema = z.object({
    value: z.number(),
    color: z.enum(["yellow", "black"])
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
            await api.post("/doublegain", {
                value,
                color
            });

            refreshUserData();
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
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
                                    <ColorButton value="yellow" color="yellow">
                                        Amarelo
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

                <div className="game"></div>
            </div>
        </Container>
    );
}
