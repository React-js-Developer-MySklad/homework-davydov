import { FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Counterparty} from './../../api/counterpartyApi';
import { useCounterparty } from '../../hooks/useCounterparty/counterparty.hook';
import { Field, Form } from 'react-final-form';


type ModalProps = {
  selected?: Counterparty;
  setSelected: (val?: Counterparty) => void;
}

export const Modal: FC<ModalProps> = (props: ModalProps) => {

  const context = useCounterparty();

  const [open, setOpen] = useState(false);

  const [values, setValues] = useState<Counterparty>()

  useEffect(() => {
    if (props.selected) {
      setValues(props.selected)
    }
  }, [props.selected])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setSelected(undefined);
    setValues({name: '', inn: '', address: '', kpp: ''})
  };

  const onSubmit = (val: Counterparty) => {
      if (props.selected) {
        context.editCounterparty({id: props.selected.id, name: val.name, inn: val.inn, address: val.address, kpp: val.kpp})
      } else {
        context.saveCounterparty({id: undefined, name: val.name, inn: val.inn, address: val.address, kpp: val.kpp})
      }
      handleClose();
  }


  return (
    <div style={{marginBottom: '1rem'}}>
      <Button variant="contained" onClick={handleClickOpen}>
        Добавить
      </Button>
      <Form onSubmit={onSubmit} initialValues={values}>
        {formProps => (
          <Dialog
            open={open || props.selected !== undefined}
            onClose={handleClose}
            component={'form'}
            onSubmit={formProps.handleSubmit}
          >
            <DialogTitle>{props.selected ? 'Редактировать запись' : 'Добавить новую запись'}</DialogTitle>
            <DialogContent>
              <Field 
                name='name'
                validate={(value: string, allValues: Counterparty, meta) => {
                  if (value && /\d/.test(value)) {
                      return {message: "Имя должно содержать только буквы"}
                  }
                  return undefined;
                }}
              >
              {props => (
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name={props.input.name}
                  label="Имя"
                  type="text"
                  fullWidth
                  value={props.input.value}
                  onChange={props.input.onChange}
                  error={props.meta.error}
                  helperText={props.meta.error?.message}
                  variant="standard"
                />
              )}
              </Field>
              <Field 
                name='inn'
                validate={(value: string, allValues: Counterparty, meta) => {
                  if (value && /[a-zA-Z]/g.test(value)) {
                      return {message: "ИНН должен содержать только цифры"}
                  }
                  if (value && value.length !== 10) {
                    return {message: "ИНН должен содержать 10 цифр"}
                  }
                  return undefined;
                }}
              >
                {props => (
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="inn"
                    name={props.input.name}
                    label="ИНН"
                    type="text"
                    fullWidth
                    value={props.input.value}
                    onChange={props.input.onChange}
                    error={props.meta.error}
                    helperText={props.meta.error?.message}
                    variant="standard"
                  />
                )}
              </Field>
              <Field
                name='kpp'
                validate={(value: string, allValues: Counterparty, meta) => {
                    if (value && /[a-zA-Z]/g.test(value)) {
                        return {message: "КПП должен содержать только цифры"}
                    }
                    if (value && value.length !== 9) {
                      return {message: "КПП должен содержать 9 цифр"}
                    }
                    return undefined;
                }}
              >
                {props => (
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="kpp"
                    name={props.input.name}
                    label="КПП"
                    type="text"
                    fullWidth
                    value={props.input.value}
                    onChange={props.input.onChange}
                    error={props.meta.error}
                    helperText={props.meta.error?.message}
                    variant="standard"
                  />
                )}
              </Field>
              <Field
                name='address'
                validate={(value: string, allValues: Counterparty, meta) => {
                    if (value && value.length === 0) {
                        return {message: "Поле 'Адрес' обязательное"}
                    }
                    if (value && value.length > 128) {
                      return {message: "Превышен лимит поля. Сократите адрес"}
                    }
                    return undefined;
                }}
              >
                {props => (
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="address"
                    name={props.input.name}
                    label="Адрес"
                    type="text"
                    fullWidth
                    value={props.input.value}
                    onChange={props.input.onChange}
                    error={props.meta.error}
                    helperText={props.meta.error?.message}
                    variant="standard"
                    multiline
                  />
                )}
              </Field>
            </DialogContent>
            <DialogActions>
              <Button type="submit">{props.selected ? 'Изменить' : 'Создать'}</Button>
              <Button onClick={handleClose}>Отменить</Button>
            </DialogActions>
          </Dialog>

        )}
      </Form>
    </div>
  );
}