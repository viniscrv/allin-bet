import { Container } from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const registerFormSchema = z
    .object({
        username: z.string(),
        email: z.string().email(),
        summary: z.string(),
        password: z.string(),
        passwordConfirmation: z
            .string()
            .refine((val) => val.length > 0, "Required field")
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Senhas não coincidem",
        path: ["passwordConfirmation"]
    });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    });

    function submitRegister({
        username,
        summary,
        email,
        password
    }: RegisterFormData) {
        handleRegister(username, summary, email, password);
    }

    async function handleRegister(
        username: string,
        summary: string,
        email: string,
        password: string
    ) {
        try {
            await api.post("/register", {
                username,
                summary,
                email,
                password
            });

            alert("Conta criada com sucesso!");
            navigate("/login");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <Container>
            <h1>Criar Conta</h1>
            <span>Bem-vindo(a)! Crie sua conta.</span>

            <form onSubmit={handleSubmit(submitRegister)}>
                <input
                    type="text"
                    placeholder="Nome"
                    {...register("username")}
                />
                {errors.passwordConfirmation && (
                    <span className="invalid">
                        {errors.passwordConfirmation.message}
                    </span>
                )}
                <input
                    type="text"
                    placeholder="Biografia"
                    {...register("summary")}
                />
                {errors.passwordConfirmation && (
                    <span className="invalid">
                        {errors.passwordConfirmation.message}
                    </span>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                {errors.passwordConfirmation && (
                    <span className="invalid">
                        {errors.passwordConfirmation.message}
                    </span>
                )}
                <input
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                />
                {errors.passwordConfirmation && (
                    <span className="invalid">
                        {errors.passwordConfirmation.message}
                    </span>
                )}
                <input
                    type="password"
                    placeholder="Confirmação da Senha"
                    {...register("passwordConfirmation")}
                />
                {errors.passwordConfirmation && (
                    <span className="invalid">
                        {errors.passwordConfirmation.message}
                    </span>
                )}

                <button type="submit" disabled={isSubmitting}>
                    Criar Conta
                </button>
            </form>
            <p>
                Já tem uma conta? <NavLink to={"/login"}>Entrar</NavLink>
            </p>
        </Container>
    );
}
