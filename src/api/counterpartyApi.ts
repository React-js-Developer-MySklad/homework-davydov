import axios from "axios";

export type Counterparty = {
    id?: string,
    name: string,
    inn: string,
    address: string,
    kpp: string,
};

const url = 'http://localhost:3000'

export const getCounterparty = async () => {
    return axios.get(url+'/counterparty')
}

export const saveCounterparty = async (val : Counterparty) => {
    return axios.post(url + '/counterparty', val)
}

export const editCounterparty = async (editedVal: Counterparty) => {
    axios.put(url + `/counterparty/${editedVal.id}`, {name: editedVal.name, inn: editedVal.inn, address: editedVal.address, kpp: editedVal.kpp})
};

export const deleteCounterparty = async (id: string) => {
    axios.delete(url + `/counterparty/${id}`)
}

