import { ref, watchEffect } from 'vue'
import { decodeCredential } from 'vue3-google-login'
import { postNovoUsuario } from '../api/usuarios'

const userData = ref(null)
const auth = ref(null)

if (sessionStorage.getItem('userData')) {
  userData.value = JSON.parse(sessionStorage.getItem('userData'))
}

const handleLogin = (response) => {
  if (response.credential) {
    const credential = decodeCredential(response.credential)
    handleNovoUsuario(credential)
    userData.value = credential
    sessionStorage.setItem('userData', JSON.stringify(credential))
    console.log('Usuário logado:', userData.value)
  }
}

const logout = () => {
  userData.value = null
  sessionStorage.removeItem('userData')
}

watchEffect(() => {
  if (userData.value) {
    sessionStorage.setItem('userData', JSON.stringify(userData.value))
  }
})

const handleNovoUsuario = (credential) => {
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
      console.log('auth: ', auth.value)
      sessionStorage.setItem('auth', JSON.stringify(auth.value))
    }
  })
}

export function useAuth() {
  return {
    userData,
    auth,
    handleLogin,
    logout,
  }
}
