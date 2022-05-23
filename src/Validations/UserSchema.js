import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/,
      "Please enter a valid email"
    )
    .required(),
  firstName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please provide only alphabet letters")
    .min(3, "must be at least 3 characters")
    .required(),
  lastName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please provide only alphabet letters")
    .min(3, "must be at least 3 characters")
    .required(),
  phoneNumber: yup
    .number().test('len', 'Must have exactly 10 digits', val => val.toString().length === 10).required("Please provide a Number"),
});

export default schema;
