import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const { updateUserLevel } = useAuth()

const api = axios.create({
  baseURL:
    'https://script.google.com/macros/s/AKfycbywGgvJFPnwXUqMjWtUkGqaewTqq7LaPNyMq2EmzEN-e-MoML1crdOTinf7upsxpEhl/exec',
})

export const getExercicioAleatorio = async (auth) => {
  try {
    let response
    // console.log('auth getExercicio: ', auth)
    if (auth != null) {
      response = await api.get('/exec?actionRequest=getExercicioAleatorio', {
        params: {
          dificuldade: 'userDefault',
          userId: auth.id,
        },
      })
      updateUserLevel(response.data.userLevelInfo)
    } else {
      response = await api.get('/exec?actionRequest=getExercicioAleatorio', {
        params: {
          dificuldade: '0',
        },
      })
    }
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createExercicio = async (exercicio) => {
  console.log('createExercicio: ', exercicio)
  try {
    const response = await api.post('', exercicio, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
    console.log('createExercicio response: ', response)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getExercicioById = async (id) => {
  try {
    const response = await api.get('/exec?actionRequest=getExercicioById', {
      params: {
        id: id,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateExercicio = async (exercicio) => {
  try {
    const response = await api.post('', exercicio, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteExercicio = async (payload) => {
  try {
    const response = await api.post('', payload, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getExercicioFiltrado = async (params) => {
  try {
    const response = await api.get('/exec?actionRequest=getExercicioFiltrado', {
      params: params,
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
