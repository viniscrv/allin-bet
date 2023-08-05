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
    fullName: z
        .string()
        .regex(/^[a-zA-ZÀ-ú\s]{5,}$/, { message: "Nome inválido" }),
    cardNumber: z
        .string()
        .regex(/^\d{4}\.\d{4}\.\d{4}\.\d{4}$/, { message: "Formato inválido" }),
    expirationDate: z
        .string()
        .regex(/^\d{2}\/\d{2}$/, { message: "Data inválida" }),
    securityCode: z.number().positive().int()
});

type CardInfoFormData = z.infer<typeof cardInfoFormSchema>;

export function Deposit() {
    const [value, setValue] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<CardInfoFormData>({
        resolver: zodResolver(cardInfoFormSchema)
    });

    function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(Number(event.target.value));
    }

    function submitLogin(data: CardInfoFormData) {
        const { cardNumber } = data;
        
        if (!value) {
            alert("Adicione um saldo");
            return;
        }

        setLoading(true);
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
        } finally {
            setLoading(false);
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
                            placeholder="R$ 0,00"
                            value={value || ""}
                            onChange={handleChangeValue}
                        />
                        <span>
                            <PlusCircle size={18} color="#8B8B8B" />
                            Informações adicionais
                        </span>
                        <p>
                            Todas as transações são falsas e não envolvem nenhum
                            risco real.
                        </p>
                        <p>
                            Por isso, sinta-se livre para adicionar quanto saldo
                            quiser ;)
                        </p>
                    </div>
                </PurchaseInfo>

                <CardInfo>
                    <h2>Dados para pagamento</h2>
                    <span>Preencha os dados para finalizar sua compra</span>

                    <form onSubmit={handleSubmit(submitLogin)}>
                        <label>
                            Nome completo:
                            <input
                                type="text"
                                placeholder="Jhon Doe"
                                {...register("fullName")}
                            />
                            {errors.fullName && (
                                <span className="invalid">
                                    {errors.fullName.message}
                                </span>
                            )}
                        </label>
                        <label>
                            Número do cartão:
                            <input
                                type="text"
                                placeholder="0000.0000.0000.0000"
                                {...register("cardNumber")}
                            />
                            {errors.cardNumber && (
                                <span className="invalid">
                                    {errors.cardNumber.message}
                                </span>
                            )}
                        </label>
                        <div className="small-input">
                            <label>
                                Data de validade:
                                <input
                                    maxLength={5}
                                    minLength={5}
                                    type="text"
                                    placeholder="01/30"
                                    {...register("expirationDate")}
                                />
                                {errors.expirationDate && (
                                    <span className="invalid">
                                        {errors.expirationDate.message}
                                    </span>
                                )}
                            </label>
                            <label>
                                Código de segurança:
                                <input
                                    maxLength={3}
                                    minLength={3}
                                    type="text"
                                    placeholder="000"
                                    {...register("securityCode", {
                                        valueAsNumber: true
                                    })}
                                />
                                {errors.securityCode && (
                                    <span className="invalid">
                                        Código inválido
                                    </span>
                                )}
                            </label>
                        </div>

                        <button disabled={isSubmitting || loading}>
                            Finalizar compra
                        </button>
                    </form>
                </CardInfo>
            </section>
        </Container>
    );
}
