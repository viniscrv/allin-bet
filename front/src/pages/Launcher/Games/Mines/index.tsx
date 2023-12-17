import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container } from "./styles";

const playerOptionsFormSchema = z.object({
    value: z.number(),
});

type playerOptionsFormData = z.infer<typeof playerOptionsFormSchema>;

export function Mines() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, control } = useForm<playerOptionsFormData>({
        resolver: zodResolver(playerOptionsFormSchema)
    });

    function startGame({ value }: playerOptionsFormData) {
        // setLoading(true);
        // sendGameOptions(value, color);
    }

    return (
        <Container>
            <h1>Mines</h1>

            <div className="game-container">
                <form onSubmit={handleSubmit(startGame)}>
                    <span>Quantia:</span>
                    <input
                        placeholder="R$ 0,00"
                        type="text"
                        style={{ textAlign: "right" }}
                        {...register("value", { valueAsNumber: true })}
                    />
                    <span>
                        oi
                    </span>

                    <button
                        className="start-game-button"
                        disabled={isButtonDisabled || loading}
                    >
                        Começar jogo
                    </button>
                </form>
            </div>
        </Container>
    );
}