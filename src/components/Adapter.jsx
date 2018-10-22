let API_URL = 'put hostname here'
const hostname = window && window.location && window.location.hostname;
if (hostname === 'localhost') {API_URL = 'http://localhost:3000/api/v1'}

class Adapter {
    // Users Frunctions
    static isLoggedIn() {
        return !!localStorage.getItem('token')
    }

    static signUp(firstName, lastName, userName, password, companyName, passwordConfirmation) {
        return fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({user: {first_name: firstName, last_name: lastName, username: userName, password, company_name: companyName, password_confirmation: passwordConfirmation}  })
        });
    }

    static logout() {
        localStorage.removeItem('token');
    }

    static logIn(userName, password) {
        return fetch(`${API_URL}/sessions/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({userName, password })
            });
    }

    static getUser () {
        return fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        })
    }
 

}

export default Adapter;
