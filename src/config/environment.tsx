let baseURL = 'http://localhost:3000'

if(process.env.NODE_ENV === 'production')
  baseURL = ''

export {baseURL};