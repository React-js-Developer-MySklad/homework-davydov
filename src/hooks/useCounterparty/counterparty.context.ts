import { createContext} from "react";
import { CounterpartyState } from "./counterparty.type";

export const CounterpartyContext = createContext<CounterpartyState>(null)