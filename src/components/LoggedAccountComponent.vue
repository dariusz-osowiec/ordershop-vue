<template>
    <div>
        <div style="width: 60%; margin-left: auto; margin-right: auto;">
                <h4>Zalogowano jako:</h4>
            <div style="border-style: solid; border-width: 3px; border-color: green; margin: 2%">
                <h3 style="margin-top: 1%"><b>Jan Kowalski</b></h3>
                <h4>jan.kowalski@mail.com</h4>
                <div style="margin-bottom: 1%">
                </div>
            </div>
        </div>
        <div class="row" style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 20px;">
            <button class="button-ok col" style="height: 40px;" @click="switchAccount">Zmień konto</button>
            <div class="col-sm-1" style="margin-left: 5px;; margin-right: 5px;"></div>
            <button class="button-ok col" style="height: 40px;" @click="goToUsersPage">Zmień dane</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoggedAccountComponent',
    methods: {
        switchAccount() {
            this.$emit('openLoginPopup');
        },
        goToUsersPage() {
            this.$router.push('/account')
        }
    }
}
</script>