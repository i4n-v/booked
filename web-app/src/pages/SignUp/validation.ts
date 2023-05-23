import * as yup from "yup";
import Message from "../../helpers/messages";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, Message.NAME_MIN_LENGTH)
    .required(Message.NAME_REQUIRED),
  birth_date: yup
    .date()
    .typeError(Message.DATE_INVALID)
    .max(new Date(), Message.DATE_FUTURE)
    .required(Message.DATE_REQUIRED),
  email: yup
    .string()
    .email(Message.EMAIL_INVALID)
    .required(Message.EMAIL_REQUIRED),
  password: yup
    .string()
    .required(Message.PASSWORD_REQUIRED)
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, Message.PASSWORD_SHAPE),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], Message.PASSWORD_SHAPE)
    .required(Message.PASSWORD_CONFIRMATION_REQUIRED),
});

export default schema;
