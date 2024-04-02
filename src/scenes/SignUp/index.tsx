import { Button, Container, Grid, Stack } from '@mui/material'
import { type ReactElement } from 'react'
import { Field, Form as FinalForm } from 'react-final-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { TextField } from 'final-form-material-ui'
import { showToast } from '@/utils/toast'
import { composeValidators, validators } from '@/utils/final-form'
import useAuth from '@/hooks/useAuth'
import { useSignUpMutation } from '@/api/hooks/sign-up'
import { getDefaultErrorMessage } from '@/api/api-errors'
import { Controlls, Form } from './styles'

type FormValues = {
  email: string
  password: string
}

export default function SignUp(): ReactElement {
  const { accessToken, auth } = useAuth()
  const [signUp] = useSignUpMutation()

  const navigate = useNavigate()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const { email, password } = values

    try {
      const { data } = await signUp({
        variables: {
          input: {
            email,
            password
          }
        }
      })

      const token = data?.signUp.token ?? ''

      showToast('Account created successfully!')
      auth(token)
      navigate('/home')
    } catch (e) {
      showToast(getDefaultErrorMessage(e), { type: 'error', autoClose: false })
    }
  }

  if (accessToken != null) return <Navigate to="/home" />

  return (
    <Container sx={{ disply: 'flex', alignItems: 'center', justifyContent: 'center', width: '400px', height: '600px', flexDirection: 'column' }}>
      <FinalForm
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, submitError, pristine, hasValidationErrors, hasSubmitErrors, dirtySinceLastSubmit }) => (
          <Stack direction="column" spacing={4}>
            <h1>Sign up</h1>
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid>
                  <Field
                    required
                    name="email"
                    component={TextField}
                    type="text"
                    label={'Email'}
                    validate={composeValidators(
                      validators.email(`Incorrect email address`),
                      validators.maxLength(128, `Email length can't be greater then 128 characters`)
                    )}
                  />
                </Grid>
                <Grid sx={{ mt: 2 }}>
                  <Field
                    required
                    name="password"
                    component={TextField}
                    type="password"
                    label={'Password'}
                    validate={composeValidators(
                      validators.minLength(8, `Password length must be greater then 8 characters`),
                      validators.maxLength(128, `Password length must can't be be greater then 128 characters`)
                    )}
                  />
                </Grid>

                {submitError && <div className="error">{submitError}</div>}
              </Grid>
              <Controlls>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={pristine || hasValidationErrors || (hasSubmitErrors && !dirtySinceLastSubmit) || submitting}
                >
                  Sign up
                </Button>
              </Controlls>
            </Form>
          </Stack>
        )}
      />
    </Container>
  )
}
