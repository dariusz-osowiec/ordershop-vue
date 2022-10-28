<template>
    <!--
      Popup logowania/rejestracji, który wyświetlany zostanie wyświetlany za pomocą teleportu.
    -->
    <div>
        <header>
        </header>
        <div>
            <div class="row text-center">
                <!--

                    Logowanie.

                -->
                <div class="col">
                    <h2>Masz konto?</h2>
                    <div class="div-line widen-lines" style="width: 100%"></div>
                    <div class="medium-divider"></div>
                    <form class="form-login text-center">
                        <input class="login-item" type="email" placeholder="Login" />
                        <input class="login-item" type="password" placeholder="Hasło" />
                        <div class="medium-divider"></div>
                        <button class="button-ok" style="height: 50px; width: 60%" @click="login"><b>Zaloguj
                                się</b></button>
                    </form>
                </div>
                <!--

                    Rejestracja.

                -->
                <div class="col">
                    <h2 style="white-space: nowrap">Nie masz konta?</h2>
                    <div class="div-line widen-lines" style="width: 100%"></div>
                    <div class="medium-divider"></div>
                    <form class="form-login text-center">
                        <input class="login-item" type="text" placeholder="Imię" required
                            style="margin-left: auto; margin-right: auto" v-model="name" />
                        <input class="login-item" type="text" placeholder="Nazwisko" required
                            style="margin-left: auto; margin-right: auto" v-model="surname" />
                        <input class="login-item" type="text" inputmode="email" placeholder="Adres e-mail"
                            style="margin-left: auto; margin-right: auto" v-model="mail" />
                        <input class="login-item" type="text" inputmode="email" placeholder="Telefon" required
                            style="margin-left: auto; margin-right: auto" v-model="phone" />
                        <input class="login-item" type="text" inputmode="email" placeholder="Ulica i nr domu" required
                            style="margin-left: auto; margin-right: auto" v-model="address" />
                        <input class="login-item" type="text" inputmode="email" placeholder="Kod pocztowy" required
                            style="margin-left: auto; margin-right: auto" v-model="postCode" />
                        <input class="login-item" type="text" inputmode="email" placeholder="Miasto" required
                            style="margin-left: auto; margin-right: auto" v-model="city" />
                        <input class="login-item" type="password" inputmode="email" placeholder="Hasło" required
                            style="margin-left: auto; margin-right: auto" v-model="city" />
                        <input class="login-item" type="password" inputmode="email" placeholder="Powtórz hasło" required
                            style="margin-left: auto; margin-right: auto" v-model="city" />
                        <label>
                            <input type="checkbox" />
                            Zgadzam się na warunki regulaminu strony.
                        </label>
                        <div class="small-divider"></div>
                        <label>
                            <input type="checkbox" />
                            Zgadzam się na warunki regulaminu polityki prywatności
                        </label>
                        <div class="medium-divider"></div>
                        <button class="button-ok" style="height: 50px; width: 60%" @click="register"><b>Zarejestruj
                                się</b></button>
                    </form>
                </div>
            </div>
        </div>
        <div class="divider"></div>
    </div>
</template>

<script>

export default {
    name: 'LoginDataComponent',
    data() {
        return {
            loginObject: {},
            registerObject: {},
            name: '',
            surname: '',
            mail: '',
            phone: '',
            address: '',
            postCode: '',
            city: '',
            password: '',
            repeatedPassword: '',
            loginMail: '',
            loginPassword: ''
        }
    },
    methods: {
        register() {
            if(!this.validateRegistration) {
                return;
            }
            this.$emit('register', this.registerObject);
        },
        login() {
            if(!this.validateLogin) {
                return;
            }
            this.$emit('login', this.loginObject);
        },
        //Walidacja rejestracji.
        validateRegistration() {
            if (this.name.trim().length === 0) {
                alert("Brak wpisanego imienia.");
                return false;
            }
            if (this.surname.trim().length === 0) {
                alert("Brak wpisanego nazwiska.");
                return false;
            }
            if (this.mail.trim().length === 0) {
                alert("Brak wpisanego adresu e-mail.");
                return false;
            }
            if (this.phone.trim().length === 0) {
                alert("Brak wpisanego numeru telefonu.");
                return false;
            }
            if (this.address.trim().length === 0) {
                alert("Brak wpisanej ulicy i numeru domu.");
                return false;
            }
            if (this.postCode.trim().length === 0) {
                alert("Brak wpisanego kodu pocztowego.");
                return false;
            }
            if (this.city.trim().length === 0) {
                alert("Brak wpisanej miejscowości.");
                return false;
            }
            if (this.password.trim().length === 0) {
                alert("Brak wpisanego hasła.");
                return false;
            }
            if (this.repeatedPassword.trim().length === 0) {
                alert("Brak powtórzonego hasła.");
                return false;
            }
            if (this.password === this.repeatedPassword) {
                alert("Hasła są niezgodne.");
                return false;
            }
            return true;
        },
        //Walidacja logowania.
        validateLogin() {
            if (this.loginMail.trim().length === 0) {
                alert("Brak wpisanego loginu.");
                return false;
            }
            if (this.loginPassword.trim().length === 0) {
                alert("Brak wpisanego hasła.");
                return false;
            }
            return true;
        }
    }
}

</script>