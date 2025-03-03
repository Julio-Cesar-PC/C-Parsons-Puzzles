import { ref, watchEffect } from 'vue'
import { decodeCredential } from 'vue3-google-login'
import { postNovoUsuario } from '../api/usuarios'

const userData = ref(null)

if (localStorage.getItem('userData')) {
  userData.value = JSON.parse(localStorage.getItem('userData'))
}

const handleLogin = (response) => {
  if (response.credential) {
    const credential = decodeCredential(response.credential)
    handleNovoUsuario(credential)
    userData.value = credential
    localStorage.setItem('userData', JSON.stringify(credential))
    console.log('Usuário logado:', userData.value)
  }
}

const logout = () => {
  userData.value = null
  localStorage.removeItem('userData')
}

watchEffect(() => {
  if (userData.value) {
    localStorage.setItem('userData', JSON.stringify(userData.value))
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
  const response = postNovoUsuario(payloadCadastroUsuario)
  console.log(response)
}

export function useAuth() {
  return {
    userData,
    handleLogin,
    logout,
  }
}
