"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Scale, UserCheck } from "lucide-react";
import api from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: string;
    user: {
      id: string;
      nombre: string;
      correo: string;
      rol: string;
    };
  };
  errors?: string[];
}

export function UnifiedLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    userType: "Cliente" as "Cliente" | "Abogado" | "Administrador" 
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (value: "Cliente" | "Abogado" | "Administrador") => {
    setForm({ ...form, userType: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>("/auth/login", form);

      if (response.data.success) {
        const { token, refreshToken, user } = response.data.data;
        
        // Almacenar tokens
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        
        // Configurar axios con el token
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Decodificar token para obtener información del usuario
        const decodedToken = jwtDecode<{ rol: string }>(token);
        
        // Redirigir según el rol
        switch (decodedToken.rol || user.rol) {
          case "Administrador":
            router.push("/dashboard");
            break;
          case "Abogado":
            router.push("/area-de-trabajo");
            break;
          case "Cliente":
            router.push("/perfil");
            break;
          default:
            router.push("/");
        }
      } else {
        alert(response.data.message || "Error al iniciar sesión");
      }
    } catch (error: any) {
      console.error("Error de login:", error);
      const errorMessage = error.response?.data?.message || "Credenciales incorrectas";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeIcon = () => {
    switch (form.userType) {
      case "Administrador":
        return <UserCheck className="h-4 w-4" />;
      case "Abogado":
        return <Scale className="h-4 w-4" />;
      case "Cliente":
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getUserTypeDescription = () => {
    switch (form.userType) {
      case "Administrador":
        return "Acceso completo al sistema de administración";
      case "Abogado":
        return "Acceso al área de trabajo y gestión de casos";
      case "Cliente":
        return "Acceso a tu perfil y seguimiento de casos";
      default:
        return "";
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            {getUserTypeIcon()}
            <CardTitle className="ml-2 text-xl">Bienvenido de nuevo</CardTitle>
          </div>
          <CardDescription>
            {getUserTypeDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="userType">Tipo de Usuario</Label>
                <Select value={form.userType} onValueChange={handleUserTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu tipo de usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cliente">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Cliente</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Abogado">
                      <div className="flex items-center space-x-2">
                        <Scale className="h-4 w-4" />
                        <span>Abogado</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Administrador">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4" />
                        <span>Administrador</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Ingresando..." : "Ingresar"}
              </Button>
              
              {form.userType === "Cliente" && (
                <div className="text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/auth/cliente/register"
                    className="underline underline-offset-4"
                  >
                    Regístrate
                  </Link>
                </div>
              )}

              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground underline underline-offset-4"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
