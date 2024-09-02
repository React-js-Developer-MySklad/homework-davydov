
import React, { PropsWithChildren, useEffect} from 'react'
import {CounterpartyContext} from './counterparty.context'
import { Counterparty, deleteCounterparty, editCounterparty, getCounterparty, saveCounterparty } from '../../api/counterpartyApi';

export const CounterpartyProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [state, setState] = React.useState<Counterparty[]>([]);
  
  useEffect(() => {
    getCounterparty().then(r => {
      setState(r.data)
    })
  }, [state])

  const context = {
    value: state,
    saveCounterparty: (val: Counterparty) => {
      saveCounterparty(val).then(r => {
        state.push(r.data)
        setState([...state])
      })
    },
    editCounterparty: (val: Counterparty) => {
      editCounterparty(val).then(r => {
        state.forEach((v, i) => {
          if (v == val) {
            state[i] = val;
            return;
          }
        })
        setState([...state])
      })
    },
    deleteCounterparty: (id: string) => {
      deleteCounterparty(id).then(r => {
        const filteredState = state.filter(v => v.id !== id);
        setState(filteredState)
      })
    }
  }

  return (
    <CounterpartyContext.Provider value={context}>
        {children}
    </CounterpartyContext.Provider>
  )  
}