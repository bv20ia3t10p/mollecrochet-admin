import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { FirebaseApp } from "../utils/FireBase";
import { useNavigate } from "react-router";

export const useAuthService = () => {
    const auth = getAuth(FirebaseApp);
    const { message } = App.useApp();
    const navigate = useNavigate();
    const {
        mutate: login,
        isPending: isLoggingIn,
    } = useMutation<
        void,
        Error,
        { email: string; password: string }
    >({
        mutationFn: async ({ email, password }) => {
            try {
                message.open({
                    key: "login",
                    type: "loading",
                    content: "Logging you in",
                });

                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                if (userCredential.user.email !== "admin@mollecrochet.com") {
                    throw new Error("User not authorized to access this page");
                }

                message.success("Login successfully");
                localStorage.setItem("user", JSON.stringify(userCredential));
                navigate("/manage");
            } catch (error: unknown) {
                message.error("Failed to log you in");
                throw error; // Ensures React Query knows the mutation failed
            }
        },
    });

    return {
        login,
        isLoggingIn,
    };
};
