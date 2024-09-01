import { ChangeEvent, FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Counterparty, editCounterParty, getCounterparty, saveCounterparty } from './../../api/counterpartyApi';


type ModalProps = {
  selected?: Counterparty;
  setSelected: (val?: Counterparty) => void;
  setCounterparty: (val: Counterparty[]) => void;
}

export const Modal: FC<ModalProps> = (props: ModalProps) => {
  const [open, setOpen] = useState(false);

  const [val, setVal] = useState<Counterparty>({name: '', inn: '', address: '', kpp: ''})

  useEffect(() => {
    if (props.selected) {
      setVal(props.selected)
    }
  }, [props.selected])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setSelected(undefined);
    setVal({name: '', inn: '', address: '', kpp: ''})
    props.setCounterparty(getCounterparty())
  };

  return (
    <div style={{marginBottom: '1rem'}}>
      <Button variant="contained" onClick={handleClickOpen}>
        Добавить
      </Button>
      <Dialog
        open={open || props.selected !== undefined}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            
            if (props.selected) {
              editCounterParty({id: props.selected.id, name: val.name, inn: val.inn, address: val.address, kpp: val.kpp})
            } else {
              saveCounterparty({id: undefined, name: val.name, inn: val.inn, address: val.address, kpp: val.kpp})
            }
            
            handleClose();
          },
        }}
      >
        <DialogTitle>Добавить новую запись</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Имя"
            type="text"
            fullWidth
            value={val.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setVal({...val, name: e.target.value})
            }}
            variant="standard"
          />
        <TextField
            autoFocus
            required
            margin="dense"
            id="inn"
            name="inn"
            label="ИНН"
            type="text"
            fullWidth
            value={val.inn}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setVal({...val, inn: e.target.value})
            }}
            variant="standard"
          />
       <TextField
            autoFocus
            required
            margin="dense"
            id="kpp"
            name="kpp"
            label="КПП"
            type="text"
            fullWidth
            value={val.kpp}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setVal({...val, kpp: e.target.value})
            }}
            variant="standard"
          />
       <TextField
            autoFocus
            required
            margin="dense"
            id="address"
            name="address"
            label="Адрес"
            type="text"
            fullWidth
            multiline
            value={val.address}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setVal({...val, address: e.target.value})
            }}

            variant="standard"
          />
        </DialogContent>
        <DialogActions>
        <Button type="submit">{props.selected ? 'Изменить' : 'Создать'}</Button>
          <Button onClick={handleClose}>Отменить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}