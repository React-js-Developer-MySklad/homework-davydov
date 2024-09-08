import { Counterparty } from "src/api/counterpartyApi";

export type CounterpartyState = {
    value: Counterparty[];
    saveCounterparty: (val: Counterparty) => void;
    editCounterparty: (val: Counterparty) => void;
    deleteCounterparty: (id: string) => void;
}