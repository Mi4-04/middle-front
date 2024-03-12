const emailDomainRegexp = /^[A-Za-z0-9][A-Za-z0-9-]{0,}[A-Za-z0-9]\.[A-Za-z]{1,}$/
const emailNameRegexp = /^(\S){1,}@/
const emailRegexp = new RegExp(emailNameRegexp.source + emailDomainRegexp.source.replace('^', ''))

export const isEmail = (email: string): boolean => emailRegexp.test(email)
