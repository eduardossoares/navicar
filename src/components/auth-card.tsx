"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logoBlack from "../../public/logo.svg";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

import { toast } from "sonner";

const socialIcons = [
  { icon: Facebook, delay: 0 },
  { icon: Linkedin, delay: 0.1 },
  { icon: Twitter, delay: 0.2 },
  { icon: Instagram, delay: 0.3 },
];

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-full max-w-[560px] flex items-center justify-center flex-col py-16 px-4 sm:px-16
      gap-y-4 rounded-xl shadow"
    >
      <div className="flex flex-col items-center gap-y-2">
        <Image src={logoBlack} alt="logo" width={160} height={160} />
        <p className="text-sm font-light">Encontre seu carro com facilidade</p>
      </div>

      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-zinc-100 p-1 rounded-sm mb-4">
          <TabsTrigger
            className={`cursor-pointer rounded-sm opacity-40 text-sm p-2 font-semibold ${
              activeTab === "login" && "bg-black text-white opacity-100"
            }`}
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className={`cursor-pointer rounded-sm opacity-40 text-sm p-2 font-semibold ${
              activeTab === "register" && "bg-black text-white opacity-100"
            }`}
            value="register"
          >
            Registrar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>

      <div className="flex w-full items-center justify-center gap-x-2">
        <hr className="w-full" />
        <span className="bg-white px-2 text-gray-500 w-full text-center text-sm">
          ou continue com
        </span>
        <hr className="w-full" />
      </div>

      <div className="flex gap-x-1.5">
        {socialIcons.map((social, index) => {
          return (
            <motion.div
              onClick={() => {
                toast(`Autenticação via redes sociais está desativada!`, {
                  position: "top-center",
                  closeButton: true,
                });
              }}
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5 + social.delay,
              }}
            >
              <Button
                variant="outline"
                size="icon"
                className="transition-transform hover:scale-110 duration-200 cursor-pointer"
              >
                <social.icon size={24} />
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
