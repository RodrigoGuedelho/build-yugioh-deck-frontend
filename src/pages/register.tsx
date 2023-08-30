
import { useState } from "react";
import Register from "../components/Register";
import RootLayout from "@/app/layout";



export default function RegisterPage() {
  const [teste, setTeste] = useState("Rodrigo");
  return (
      <Register />  
  );
}