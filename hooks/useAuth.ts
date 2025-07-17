import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

interface DecodedToken {
  [key: string]: any;
  exp: number;
  rol?: string;
}

export function useAuth() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const rol = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (decoded.exp * 1000 > Date.now()) {
          setUser({ ...decoded, rol });
        } else {
          refreshAccessToken();
        }
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const res = await api.post("/api/auth/refresh", { refreshToken });

      const { token: newToken, refreshToken: newRefreshToken } = res.data;

      localStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      const decoded: DecodedToken = jwtDecode(newToken);
      const rol = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      setUser({ ...decoded, rol });
    } catch (error) {
      console.error("Error al renovar token:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    router.push("/");
  };

  return { user, loading, logout, refreshAccessToken };
}
