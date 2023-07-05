import * as yup from "yup";

const schema = yup.object().shape({
  categories: yup.array().min(1).required(),
  description: yup.string().required(),
  file: yup
    .mixed()
    .test("fileType", "Invalid file type", (value) => {
      return value instanceof File;
    })
    .required(),
  free: yup.boolean().required(),
  name: yup.string().required(),
  price: yup
    .number()
    .when("free", (free, schema) =>
      !free[0] ? yup.number().required() : schema
    )
    .nullable(),
});

export default schema;
