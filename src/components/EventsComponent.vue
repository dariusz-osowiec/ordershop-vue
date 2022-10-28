<template>
    <div style="background-color: #ddfacf">
        <div>
            <h1>
                Najbliższe wydarzenia
            </h1>
            <div class="row" style="overflow: scroll; width: 95%; margin-left: auto; margin-right: auto; margin-bottom: 15px; margin-top: 10px;">
                <div class="col" :key="party.id" v-for="party in parties">
                    <div class="card">
                        <div>

                        </div>
                        <div class="card-body">

                        </div>
                    </div>
                </div>
            </div>
            <button class="button-ok" style="width: 40%; height: 50px;"><b>Sprawdź więcej wydarzeń</b></button>
        </div>
        <div style="margin-top: 15px; margin-bottom: 15px;">
            <h3><b>Po za tym gramy w każdą środę, piątek i sobotę od godziny 20!</b></h3>
        </div>
        <hr style="color: transparent"/>
    </div>
</template>

<script>
export default {
    name: 'EventsComponent',
    created() {

    },
    data() {
        return {

        }
    },
    props: {
        serverAddress: String
    },
    methods: {
        getEvents() {
            return [
                {
                    id: 1,
                    name: 'Andrzejki',
                    date: 26-11-22,
                    description: 'Zabawa andrzejkowa w klubie',
                    price: 40.0,
                },
                {
                    id: 2,
                    name: 'Andrzejki',
                    date: 26-11-22,
                    description: 'Zabawa andrzejkowa w klubie',
                    price: 40.0,
                },
                {
                    id: 3,
                    name: 'Andrzejki',
                    date: 26-11-22,
                    description: 'Zabawa andrzejkowa w klubie',
                    price: 40.0,
                },
                {
                    id: 4,
                    name: 'Andrzejki',
                    date: 26-11-22,
                    description: 'Zabawa andrzejkowa w klubie',
                    price: 40.0,
                },
                {
                    id: 5,
                    name: 'Andrzejki',
                    date: 26-11-22,
                    description: 'Zabawa andrzejkowa w klubie',
                    price: 40.0,
                },
                {
                    id: 6,
                    name: 'Andrzejki',
                    date: 26-11-22,
                    description: 'Zabawa andrzejkowa w klubie',
                    price: 40.0,
                },
            ]
        }
    }
}
</script>