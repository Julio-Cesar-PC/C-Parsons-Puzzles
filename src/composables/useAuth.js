import { ref, watchEffect } from 'vue'
import { decodeCredential } from 'vue3-google-login'
import { postNovoUsuario } from '../api/usuarios'

const userData = ref(null)
const auth = ref(null)

if (sessionStorage.getItem('userData')) {
  userData.value = JSON.parse(sessionStorage.getItem('userData'))
}

if (sessionStorage.getItem('auth')) {
  auth.value = JSON.parse(sessionStorage.getItem('auth'))
}

const handleLogin = async (response) => {
  if (response.credential) {
    const credential = decodeCredential(response.credential)
    await handleNovoUsuario(credential)
  }
}

const logout = () => {
  auth.value = null
  userData.value = null
  sessionStorage.removeItem('userData')
  sessionStorage.removeItem('auth')
}

watchEffect(() => {
  if (userData.value) {
    sessionStorage.setItem('userData', JSON.stringify(userData.value))
  }
})

const handleNovoUsuario = async (credential) => {
  const payloadCadastroUsuario = {
    actionRequest: 'postNovoUsuario',
    payload: {
      email_verified: credential.email_verified,
      email: credential.email,
      sub: credential.sub,
      name: credential.name,
      pic: credential.picture,
    },
  }
  postNovoUsuario(payloadCadastroUsuario).then((response) => {
    console.log(response)
    if (response.status == 'success') {
      auth.value = {
        email_verified: credential.email_verified,
        email: response.data.email,
        sub: response.data.sub,
      }
      userData.value = response.data
      console.log('auth: ', auth.value)
      console.log('Usuário logado:', userData.value)
      sessionStorage.setItem('auth', JSON.stringify(auth.value))
      sessionStorage.setItem('userData', JSON.stringify(userData.value))
    }
  })
}

const updateUserLevel = (userLevelInfo) => {
  userData.value.currentLevel = userLevelInfo.currentLevel
  userData.value.levelProgress = userLevelInfo.levelProgress
  userData.value.nextLevel = userLevelInfo.nextLevel
  sessionStorage.setItem('userData', JSON.stringify(userData.value))
}

export function useAuth() {
  return {
    userData,
    auth,
    handleLogin,
    logout,
    updateUserLevel,
  }
}
