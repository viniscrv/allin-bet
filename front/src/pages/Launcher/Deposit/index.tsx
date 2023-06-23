import { PlusCircle } from "@phosphor-icons/react";
import { CardInfo, Container, PurchaseInfo } from "./styles";

export function Deposit() {
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
                        <input type="text" placeholder="00,00" />
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

                    <form>
                        <label>
                            Nome completo:
                            <input type="text" />
                        </label>
                        <label>
                            Número do cartão:
                            <input type="text" />
                        </label>
                        <div className="small-input">
                            <label>
                                Data de validade:
                                <input type="text" />
                            </label>
                            <label>
                                Código de segurança:
                                <input type="text" />
                            </label>
                        </div>

                        <button>Finalizar compra</button>
                    </form>
                </CardInfo>
            </section>
        </Container>
    );
}
