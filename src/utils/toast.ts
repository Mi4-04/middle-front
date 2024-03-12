import { type ReactNode } from 'react'
import { toast } from 'react-toastify'
import { type ToastOptions } from 'react-toastify/dist/types'

const noticeConfig: ToastOptions = {
  type: 'info',
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  closeButton: false,
  pauseOnHover: true,
  icon: false
}

export const showToast = (message: ReactNode, options?: ToastOptions): void => {
  toast(message, { ...noticeConfig, ...options })
}
