import { NavLink } from "react-router-dom";
import { Container } from "./styles";

export function Home() {
    return (
        <Container>
            <section>
                <h2>All In Bet</h2>

                <p>
                    A All in Bet é uma plataforma de apostas que permite que
                    você desfrute de jogos emocionantes sem a preocupação de
                    perder dinheiro real. Com a All in Bet, você pode usar seu
                    saldo virtual para fazer apostas e aproveitar a experiência
                    de apostas sem nenhum risco financeiro.
                </p>
                <p>
                    Além disso, a All in Bet está comprometida em fornecer um
                    ambiente justo para todos os jogadores. Nossos jogos são
                    desenvolvidos com <span>algoritmos confiáveis</span> que
                    garantem resultados aleatórios e imparciais.
                </p>
            </section>

            <section>
                <h2>Pagamento</h2>
                <p>
                    Não queremos oferecer risco real nenhum para os jogadores,
                    por isso, todas as transações envolvendo dinheiro são
                    falsas.
                </p>
                <p>
                    Para depositar o saldo que quiser, você poderá acessar a{" "}
                    <NavLink to={"/launcher/deposit"}>
                        página de pagamento
                    </NavLink>{" "}
                    e escolher o saldo que deseja. Sim, pode adicionar o quanto
                    quiser ;)
                </p>
                <p>
                    Você deverá usar o cartão de número{" "}
                    <span>4242.4242.4242.4242</span> para finalizar sua compra,
                    qualquer outro cartão será automaticamente inválidado pelo
                    sistema.
                </p>
            </section>
        </Container>
    );
}
