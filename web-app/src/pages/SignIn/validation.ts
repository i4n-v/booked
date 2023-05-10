import * as yup from "yup";
import Message from "../../helpers/messages";

const schema = yup.object().shape({
  user_login: yup.string().required(Message.EMAIL_REQUIRED),
  password: yup.string().required(Message.PASSWORD_REQUIRED),
});

export default schema;
