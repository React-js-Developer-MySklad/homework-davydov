
export type Counterparty = {
    id?: string,
    name: string,
    inn: string,
    address: string,
    kpp: string,
};

const data = [
    createData('1', 'John', '12314141', 'afsfafaf', 'fasfsafaf'),
    createData('2', 'John', '12314141', 'afsfafaf', '41241441'),
] as Counterparty[];

function createData(
    id: string,
    name: string,
    inn: string,
    address: string,
    kpp: string,
) {
    return { id, name, inn, address, kpp} as Counterparty;
}

export const getCounterparty = () => {
    let counterparty = JSON.parse(localStorage.getItem('counterparty'));

    if (counterparty === null || counterparty.length === 0) {
        counterparty = data;
        localStorage.setItem('counterparty', JSON.stringify(counterparty));
    }

    return counterparty;
}

export const saveCounterparty = (val : Counterparty) => {
    let counterparty = JSON.parse(localStorage.getItem('counterparty'));
    val.id = crypto.randomUUID();
    counterparty.push(val);

    localStorage.setItem('counterparty', JSON.stringify(counterparty));
}

export const editCounterParty = (editedVal: Counterparty) => {
    let counterparty: Counterparty[] = JSON.parse(localStorage.getItem('counterparty'));
    console.log(counterparty)
    counterparty.forEach((v, i) => {
        if (v.id === editedVal.id) {
            counterparty[i] = editedVal;
            return;
        }
    });
    
    localStorage.setItem('counterparty', JSON.stringify(counterparty));
};

