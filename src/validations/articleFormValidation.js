import * as yup from "yup";

const articleFormValid = yup.object().shape({
  title: yup.string().required().min(5),
  description: yup.string().required(),
  text: yup.string().required(),
});

export default articleFormValid;
