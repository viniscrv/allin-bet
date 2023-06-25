import { Container } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const profileSchema = z.object({
    username: z.string().nullable(),
    summary: z.string().nullable(),
    email: z.string().email().nullable(),
    password: z.string().nullable(),
    passwordConfirmation: z.string().nullable()
});
type ProfileFormData = z.infer<typeof profileSchema>;

export function EditProfile() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema)
    });

    const navigate = useNavigate();

    const { refreshUserData } = useContext(UserContext);

    async function submitForm(data: ProfileFormData) {
        const { username, summary, email, password, passwordConfirmation } =
            data;

        if (password !== passwordConfirmation) {
            console.error("As senhas não correspondem.");
            return;
        }

        try {
            await api.put("/edit", {
                username: username ? username : null,
                summary: summary ? summary : null,
                email: email ? email : null,
                password: password ? password : null
            });

            refreshUserData();
            navigate("/launcher/profile");
        } catch (error: any) {
            if (error.response && error.response.data) {
                console.error(
                    "Erro ao registrar usuário:",
                    error.response.data.error
                );
            } else {
                console.error("Erro ao registrar usuário:", error.message);
            }
        }
    }

    // const [selectedFile, setSelectedFile] = useState<string | null>(null);

    // function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     if (event.target.files && event.target.files.length > 0) {
    //         setSelectedFile(URL.createObjectURL(event.target.files[0]));
    //     }
    // }

    return (
        <Container>
            <h1>Editar perfil</h1>

            <main>
                <img src={"https://github.com/vini9457128.png"} />
                {/* <label htmlFor="fileUpload" className="customFileUpload">
                    Selecionar nova foto
                </label>
                <input
                    type="file"
                    id="fileUpload"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                /> */}

                <form onSubmit={handleSubmit(submitForm)}>
                    <label>
                        Nome de usuário
                        <input
                            type="text"
                            placeholder="Seu username"
                            {...register("username")}
                        />
                    </label>
                    <label>
                        Biografia
                        <input
                            type="text"
                            placeholder="Sua biografia"
                            {...register("summary")}
                        />
                    </label>
                    <label>
                        E-mail
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            {...register("email")}
                        />
                    </label>
                    <div className="small-input">
                        <label>
                            Senha
                            <input
                                type="password"
                                placeholder="Senha"
                                {...register("password")}
                            />
                        </label>
                        <label>
                            Confirmação de senha
                            <input
                                type="password"
                                placeholder="Confirme a senha"
                                {...register("passwordConfirmation")}
                            />
                        </label>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Confirmar
                    </button>
                </form>
            </main>
        </Container>
    );
}
