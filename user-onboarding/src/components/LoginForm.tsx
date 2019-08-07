import React, { useEffect } from 'react';
import { withFormik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { User } from '../App';

interface LoginValues {
  name: string;
  email: string;
  password: string;
  role: 'frontend' | 'backend' | 'web' | 'unassigned';
  tos: boolean;
}

interface LoginProps {
  initialName?: string;
  initialEmail?: string;
  initialPassword?: string;
  initialRole?: 'frontend' | 'backend' | 'web' | 'unassigned';
  initialTos?: boolean;
  setUsers: (users: (u: User[]) => User[]) => void;
}

interface OtherProps {
  setUsers: (users: (u: User[]) => User[]) => void;
}

const LoginForm = ({
  values,
  touched,
  errors,
  status,
  setUsers,
}: OtherProps & FormikProps<LoginValues>): React.ReactElement => {
  useEffect((): void => {
    if (status) {
      setUsers((u): User[] => [...u, status]);
    }
  }, [status, setUsers]);

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
      <Field component="select" name="role">
        <option>Select a role</option>
        <option value="web">Web UI Developer</option>
        <option value="frontend">Front End Engineer</option>
        <option value="backend">Back End Engineer</option>
      </Field>
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
    initialRole,
    initialTos,
  }: LoginProps): LoginValues {
    return {
      name: initialName || '',
      email: initialEmail || '',
      password: initialPassword || '',
      role: initialRole || 'unassigned',
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

  async handleSubmit(values, { setStatus }): Promise<void> {
    try {
      const registerUser = await axios.post(
        'https://reqres.in/api/users/',
        values
      );
      setStatus(registerUser.data);
    } catch (err) {
      console.log(err);
    }
  },
})(LoginForm);

export default FormikLoginForm;
