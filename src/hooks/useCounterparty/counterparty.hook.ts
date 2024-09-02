import {useContext} from "react";
import { CounterpartyContext} from "./counterparty.context";

export const useCounterparty = () => {
    const context = useContext(CounterpartyContext);
    if (context === null) {
        throw Error('useCounterparty hook outside CounterpartyProvider')
    }

    return context;
}
