import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";

interface FormProps {
  type: "login" | "register";
}

const schema = z.object({
  email: z.string().nonempty("E-mail obrigatório.").email("E-mail inválido."),
  password: z.string().nonempty("Senha obrigatória."),
});

type FormData = z.infer<typeof schema>;

export default function Form({ type }: FormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignInError, setShowSignInError] = useState(false);

  const { createUser, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleSignIn = async (data: FormData) => {
    try {
      await signIn(data);
    } catch {
      setShowSignInError(true);
    }
  };

  const handleCreateUser = async (data: FormData) => {
    try {
      await createUser(data);
    } catch {
      toast.warning("Erro ao criar usuário.", {
        style: {
          backgroundColor: "#FF5555",
          color: "#FFF",
        },
        position: "top-right",
      });
    }
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form
        onSubmit={
          type === "login"
            ? handleSubmit(handleSignIn)
            : handleSubmit(handleCreateUser)
        }
        className="space-y-2"
      >
        <motion.div
          className="space-y-2"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Label htmlFor="email">Email</Label>
          <div className="space-y-1">
            <Input
              type="email"
              id="email"
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors && (
              <p className="text-red-500/80 text-sm">{errors.email?.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Label htmlFor="password">Senha</Label>
          <div className="relative space-y-1">
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 hover:bg-transparent cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
            {errors && (
              <p className="text-red-500/80 text-sm">{errors.password?.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button className="w-full cursor-pointer" type="submit">
            {type === "login" ? "Entrar" : "Cadastrar"}
          </Button>
        </motion.div>

        {showSignInError && (
          <p className="text-red-500/80 text-sm text-center">
            Email ou senha inválidos.
          </p>
        )}
      </form>
    </motion.div>
  );
}
