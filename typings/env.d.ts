declare namespace __WebpackModuleApi {
  interface Process {
    env: {
      NODE_ENV: 'production' | 'test' | 'development'
    }
  }
}

declare const process: __WebpackModuleApi.Process

interface ImportMeta {
  env: {
    API_URL: string
    STAGE: 'production' | 'staging' | 'development'
  }
}
