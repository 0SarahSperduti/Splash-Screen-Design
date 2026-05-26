import { createBrowserRouter } from "react-router";
import Splash from "./components/Splash";
import Form from "./components/Form";
import LeadGate from "./components/LeadGate";
import Cadastro from "./components/Cadastro";
import Resultado from "./components/Resultado";
import Contato from "./components/Contato";

export const router = createBrowserRouter([
  { path: "/", Component: Splash },
  { path: "/form", Component: Form },
  { path: "/gate", Component: LeadGate },
  { path: "/cadastro", Component: Cadastro },
  { path: "/resultado", Component: Resultado },
  { path: "/contato", Component: Contato },
]);
