import React from 'react';
import { withFormik, Form, Field, FormikProps } from 'formik';

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
}: FormikProps<LoginValues>): React.ReactElement => {
  return (
    <Form>
      <Field type="name" name="name" placeholder="Name" />
      <Field type="email" name="email" placeholder="Email" />
      <Field type="password" name="password" placeholder="Password" />
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

  handleSubmit(values, { setStatus }): void {},
})(LoginForm);

export default FormikLoginForm;
