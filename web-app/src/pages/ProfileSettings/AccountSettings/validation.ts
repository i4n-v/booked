import * as yup from "yup";
import Message from "../../../helpers/messages";

const schema = yup.object().shape({
  birth_date: yup
    .date()
    .typeError(Message.DATE_INVALID)
    .max(new Date(), Message.DATE_FUTURE)
    .required(Message.DATE_REQUIRED),
  email: yup
    .string()
    .email(Message.EMAIL_INVALID)
    .required(Message.EMAIL_REQUIRED),
  name: yup
    .string()
    .min(2, Message.NAME_MIN_LENGTH)
    .required(Message.NAME_REQUIRED),
  user_name: yup
    .string()
    .min(2, Message.USERNAME_MIN_LENGTH)
    .required(Message.USERNAME_REQUIRED),
});

export default schema;
