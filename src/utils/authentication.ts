import mitt from 'mitt'

export const SessionEmitter = mitt<{ signOut: undefined }>()
