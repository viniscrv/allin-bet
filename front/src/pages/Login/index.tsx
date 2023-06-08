import { Container } from "./styles";

export function Login() {
    return (
        <Container>
            <h1>Entrar</h1>
            <span>Bom te ver de volta ;)</span>

            <form>
                <input type="text" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />

                <button>Entrar</button>
            </form>
            <p>Ainda não tem uma conta? <a href="#">Criar conta</a></p>
            <a href="#">Esqueceu sua senha?</a>
        </Container>
    );
}
