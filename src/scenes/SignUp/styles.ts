import { White } from '@/theme/palette'
import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  background-color: ${White};
  height: 600px;
`

export const Form = styled.form`
  text-align: start;
`

export const Controlls = styled.div`
  display: flex;
  margin: 20px 0 0;
`
