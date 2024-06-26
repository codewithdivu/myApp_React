/* eslint-disable consistent-return */
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { PATH_AUTH } from '../../../routes/paths';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Config
  const RegisterSchema = Yup.object()
    .shape({
      name: Yup.string().required('Name  required').trim('Enter valid  name'),
      username: Yup.string().required('Username  required').trim('Enter valid  Username'),
      email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required')
        .trim('Enter valid email address'),
      password: Yup.string().required('Password is required').trim('Enter valid password'),
    })
    .strict(true);

  const defaultValues = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  // States
  const [showPassword, setShowPassword] = useState(false);

  // Hooks
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  // Constants
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'selectedSeries',
  });

  // Constants
  const selectedRole = watch('designation');

  // Handlers
  const onSubmit = async (formData) => {
    try {
      await register(formData.email, formData.password, formData.name, formData.username);
      enqueueSnackbar('User Registered successfully.');
      navigate(PATH_AUTH.login);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
      enqueueSnackbar(error?.msg, {
        variant: 'error',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {!!errors.secretCode && <Alert severity="error">{errors.secretCode.message}</Alert>}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="Name" placeholder="Enter name" />
        </Stack>
        <RHFTextField name="username" label="Username" placeholder="Enter a Username" />
        <RHFTextField name="email" label="Email address" placeholder="Enter your email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
