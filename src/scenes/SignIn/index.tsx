import { type ReactElement } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { TextField } from 'final-form-material-ui'
import { Field, Form as FinalForm } from 'react-final-form'
import { Button, Container, Grid, Stack } from '@mui/material'
import { composeValidators, validators } from '@/utils/final-form'
import { showToast } from '@/utils/toast'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useSignInMutation } from '@/api/hooks/sign-in'
import { getDefaultErrorMessage } from '@/api/api-errors'
import { Controlls, Form } from './styles'

type FormValues = {
  email: string
  password: string
}

export default function SignIn(): ReactElement {
  const { currentUser, refetch } = useCurrentUser()
  const navigate = useNavigate()
  const [signIn] = useSignInMutation()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const { email, password } = values

    try {
      await signIn({
        variables: {
          input: { email, password }
        }
      })
      refetch()
      navigate('/home')
    } catch (e) {
      showToast(getDefaultErrorMessage(e), { autoClose: false, type: 'error' })
    }
  }

  if (currentUser != null) return <Navigate to="/home" />

  return (
    <Container sx={{ disply: 'flex', alignItems: 'center', justifyContent: 'center', width: '400px', height: '600px', flexDirection: 'column' }}>
      <FinalForm
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, submitError, pristine, hasValidationErrors, hasSubmitErrors, dirtySinceLastSubmit }) => (
          <Stack direction="column" spacing={4}>
            <h1>Sign in</h1>
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
                  Sign in
                </Button>
              </Controlls>
            </Form>
          </Stack>
        )}
      />
    </Container>
  )
}
