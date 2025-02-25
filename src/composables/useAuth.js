import { ref, watchEffect } from 'vue';
import { decodeCredential } from "vue3-google-login";

const userData = ref(null);

if (localStorage.getItem('userData')) {
    userData.value = JSON.parse(localStorage.getItem('userData'));
}

const handleLogin = (response) => {
    if (response.credential) {
        const credential = decodeCredential(response.credential);
        userData.value = credential;
        localStorage.setItem('userData', JSON.stringify(credential));
        console.log('Usuário logado:', userData.value);
    }
};

const logout = () => {
    userData.value = null;
    localStorage.removeItem('userData');
};

watchEffect(() => {
    if (userData.value) {
        localStorage.setItem('userData', JSON.stringify(userData.value));
    }
});

export function useAuth() {
    return {
        userData,
        handleLogin,
        logout
    };
}
