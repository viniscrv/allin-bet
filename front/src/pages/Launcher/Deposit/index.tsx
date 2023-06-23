import { PlusCircle } from "@phosphor-icons/react";
import { CardInfo, Container, PurchaseInfo } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { api } from "../../../lib/axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { UserContext } from "../../../contexts/UserContext";

const cardInfoFormSchema = z.object({
    fullName: z.string(),
    cardNumber: z.string(),
    expirationDate: z.string()
    // securityCode: z.number().min(3).max(3)
});

type CardInfoFormData = z.infer<typeof cardInfoFormSchema>;

export function Deposit() {
    const [value, setValue] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<CardInfoFormData>({
        resolver: zodResolver(cardInfoFormSchema)
    });

    function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(Number(event.target.value));
    }

    function submitLogin(data: CardInfoFormData) {
        const { cardNumber } = data;

        confirmPayment(cardNumber, value);
    }

    const navigate = useNavigate();

    const { refreshUserData } = useContext(UserContext);

    async function confirmPayment(cardNumber: string, value: number) {
        try {
            await api.patch("/deposit", {
                cardNumber,
                value
            });

            refreshUserData();
            navigate("/launcher/profile");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <Container>
            <h1>Adicionar saldo</h1>

            <section>
                <PurchaseInfo>
                    <label className="payment-method">
                        Cartão de crédito
                        <input type="radio" disabled={true} />
                    </label>

                    <div>
                        <h3>Selecione a quantia que deseja adicionar:</h3>
                        <input
                            type="text"
                            placeholder="00,00"
                            value={value}
                            onChange={handleChangeValue}
                        />
                        <span>
                            <PlusCircle size={18} color="#8B8B8B" />
                            Informações adicionais
                        </span>
                        <p>
                            Todos as transações de dinheiro são falsasTodos as
                            transações de dinheiro são falsasTodos as transações
                            de dinheiro são falsasTodos as transações de
                            dinheiro são falsas
                        </p>
                    </div>
                </PurchaseInfo>

                <CardInfo>
                    <h2>Dados para pagamento</h2>
                    <span>Consulte a documentaçãoConsulte a documentação</span>

                    <form onSubmit={handleSubmit(submitLogin)}>
                        <label>
                            Nome completo:
                            <input
                                type="text"
                                placeholder="Jhon Doe"
                                {...register("fullName")}
                            />
                        </label>
                        <label>
                            Número do cartão:
                            <input
                                type="text"
                                placeholder="0000.0000.0000.0000"
                                {...register("cardNumber")}
                            />
                        </label>
                        <div className="small-input">
                            <label>
                                Data de validade:
                                <input
                                    type="text"
                                    placeholder="01/30"
                                    {...register("expirationDate")}
                                />
                            </label>
                            {/* <label>
                                Código de segurança:
                                <input {...register("securityCode")} />
                            </label> */}
                        </div>

                        <button disabled={isSubmitting}>
                            Finalizar compra
                        </button>
                    </form>
                </CardInfo>
            </section>
        </Container>
    );
}
