import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Pippin, PrimaryBlue, RoofTerracotta, TitanWhite } from '@/theme/palette'

export const StyledToastContainer = styled(ToastContainer)`
  &.Toastify__toast-container {
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    border-radius: 10px;
    padding: 8px 16px;

    & .Toastify__toast--info {
      color: ${PrimaryBlue};
      background-color: ${TitanWhite};
    }

    & .Toastify__toast--error {
      color: ${RoofTerracotta};
      background-color: ${Pippin};
    }
  }
`
