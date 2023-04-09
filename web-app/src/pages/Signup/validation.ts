import * as yup from 'yup'
import Message from '../../helpers/messages'

const schema = yup.object().shape({
    name: yup.string().min(2, Message.NAME_MIN_LENGTH).required(Message.NAME_REQUIRED),
    birth_date: yup.date()
    .typeError(Message.DATE_INVALID)
    .max(new Date(),Message.DATE_FUTURE)
    .required(Message.DATE_REQUIRED),
})

export default schema