// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../SupabaseClient";
import Loader from "../ui/Loader";

export default function ProtectedRoute({ children }) {
    const [checking, setChecking] = useState(true);
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) navigate("/login");
            else {
                setSession(data.session);
                setChecking(false);
            }
        });
    }, [navigate]);

    if (checking) return <Loader />;

    return children;
}
