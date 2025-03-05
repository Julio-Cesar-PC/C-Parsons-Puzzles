import axios from 'axios'

const api = axios.create({
  baseURL:
    'https://script.google.com/macros/s/AKfycbywGgvJFPnwXUqMjWtUkGqaewTqq7LaPNyMq2EmzEN-e-MoML1crdOTinf7upsxpEhl/exec',
})

const postNovoUsuario = async (payload) => {
  try {
    console.log(payload)
    const response = await api.post('/exec', payload, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const postHistorico = async (payload) => {
  try {
    console.log('payloadPostHistorico: ', payload)
    const response = await api.post('/exec', payload, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export { postNovoUsuario, postHistorico }
