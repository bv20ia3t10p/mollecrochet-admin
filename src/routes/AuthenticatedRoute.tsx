import { useNavigate } from "react-router";
import { IProp } from "../interfaces/IProp";
import { useEffect } from "react";

export const AuthenticatedRoute: React.FC<IProp> = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user') ?? '');
            if (user.user.email !== 'admin@mollecrochet.com') {
                localStorage.clear();
                navigate('/login');
            };
        } catch {
            navigate('/login');
        }
    }, [navigate]);
    return <>
        {children}
    </>
}