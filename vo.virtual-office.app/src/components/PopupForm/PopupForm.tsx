import { Grid } from '@mui/material'
import FormComponent from '../FormComponent'
import { Title, Line, Input, Button } from '../UI/UiComponents'
import style from './popupForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setStatus } from '../../redux/helperSlice'
import { Serializer } from '../../utils/helpers'
import saveData from '../../services/api/saveData'
export default function PopupForm({ title }: { title: string }) {
    const status = useSelector((state: any) => state.statusForm.value)
    const dispatch = useDispatch()
    const handelEvent = () => {
        dispatch(setStatus())
    }


    const inputChangeHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
         const data = Serializer(event)
         saveData(data)

    }
    return (
        <div className={`${style.popupForm} ${status ? style.active : style.inactive} `}>
            <div className={style.container}>
                <FormComponent className={style.formContainer} eventListener={inputChangeHandler}>
                    <div className={style.form}>
                        <div>
                            <Title fontsize='1.5em'>{title}</Title>
                            <Line />
                        </div>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Input label="First Name" type="text" name='firstname' required />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input label="Last Name" type="text" name='lastname' required />
                                </Grid>
                                <Grid item xs={12}>
                                    <Input label="Email" type="text" name='email' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Input label="Contact No." type="text" name='contactNo' required />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input label="Password" type="password" name='password' required />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input label="Confirm Password" type="password" name='confirm_password' required />
                                </Grid>
                            </Grid>
                        </div>
                        <Line />
                        <div className={style.buttons}>
                            <Button btnType="cancel" onClick={handelEvent}>Cancel</Button>
                            <Button type="submit" >Submit</Button>
                        </div>
                    </div>
                </FormComponent>

            </div>
        </div>
    )
}

