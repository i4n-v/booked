import * as yup from "yup";
import Message from "../../../../helpers/messages";

const schema = yup.object().shape({
  previous_password: yup.string().required(Message.PASSWORD_REQUIRED),
  password: yup
    .string()
    .required(Message.PASSWORD_REQUIRED)
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, Message.PASSWORD_SHAPE),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password"), undefined],
      Message.PASSWORD_CONFIRMATION_MATCH
    )
    .required(Message.PASSWORD_CONFIRMATION_REQUIRED),
});

export default schema;
