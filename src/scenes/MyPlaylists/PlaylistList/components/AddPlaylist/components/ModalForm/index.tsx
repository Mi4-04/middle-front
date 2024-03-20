import { ReactElement } from 'react'
import { Field, Form as FinalForm } from 'react-final-form'
import { Button, Grid, Paper, Stack } from '@mui/material'
import { Controlls, Header } from './styles'
import { TextField } from 'final-form-material-ui'
import { showToast } from '@/utils/toast'
import { getDefaultErrorMessage } from '@/api/api-errors'
import { useCreatePlaylistMutation } from '@/api/hooks/create-playlist'

type ModalFormProps = {
  onRefreshList: () => Promise<void>
}

type FormValues = {
  name: string
}

export default function ModalForm(props: ModalFormProps): ReactElement {
  const { onRefreshList } = props
  const [createPlaylist] = useCreatePlaylistMutation()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const { name } = values
    try {
      await createPlaylist({
        variables: {
          input: {
            name
          }
        }
      })
      await onRefreshList()
    } catch (e) {
      showToast(getDefaultErrorMessage(e), { type: 'error', autoClose: false })
    }
  }

  return (
    <Paper sx={{ dispaly: 'flex', justifyContent: 'center', textAlign: 'center', p: 1 }}>
      <FinalForm
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, pristine, hasValidationErrors, hasSubmitErrors, dirtySinceLastSubmit }) => (
          <Stack direction="column" spacing={5}>
            <Header>Add playlist</Header>
            <form onSubmit={handleSubmit}>
              <Grid>
                <Field required name="name" component={TextField} type="text" label="Name" />
              </Grid>
              <Controlls>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={pristine || hasValidationErrors || (hasSubmitErrors && !dirtySinceLastSubmit) || submitting}
                >
                  Create
                </Button>
              </Controlls>
            </form>
          </Stack>
        )}
      />
    </Paper>
  )
}
