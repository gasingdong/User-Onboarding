import React from 'react';
import { withFormik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';

interface LoginValues {
  name: string;
  email: string;
  password: string;
  tos: boolean;
}

interface LoginProps {
  initialName?: string;
  initialEmail?: string;
  initialPassword?: string;
  initialTos?: boolean;
}

const LoginForm = ({
  values,
  touched,
  errors,
}: FormikProps<LoginValues>): React.ReactElement => {
  return (
    <Form>
      {touched.name && errors.name && <p className="error">{errors.name}</p>}
      <Field type="name" name="name" placeholder="Name" />
      {touched.email && errors.email && <p className="error">{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />
      {touched.password && errors.password && (
        <p className="error">{errors.password}</p>
      )}
      <Field type="password" name="password" placeholder="Password" />
      {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
      <label className="checkbox-container">
        Accept Terms of Service
        <Field type="checkbox" name="tos" checked={values.tos} />
      </label>
      <button type="submit">Submit</button>
    </Form>
  );
};

const FormikLoginForm = withFormik<LoginProps, LoginValues>({
  mapPropsToValues({
    initialName,
    initialEmail,
    initialPassword,
    initialTos,
  }: LoginProps): LoginValues {
    return {
      name: initialName || '',
      email: initialEmail || '',
      password: initialPassword || '',
      tos: initialTos || false,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter a email address'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required(),
    tos: Yup.boolean()
      .oneOf([true], 'Please accept the Terms of Service')
      .required(),
  }),

  handleSubmit(values, { setStatus }): void {
    console.log(values);
  },
})(LoginForm);

export default FormikLoginForm;
