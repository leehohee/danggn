<template>
    <v-container>
        <v-row class="mb-6">

        </v-row>
        <v-row>
            <LoginForm />
        </v-row>
        <v-row>
            <v-container>
            <v-card elevation="0">
                <v-row>
                <v-col cols="9"><nuxt-link to="/signup"><span class="blue--text font-weight-bold text--darken-4">아직 회원이 아니신가요?</span></nuxt-link></v-col>
                <v-col class="d-flex justify-center align-center" cols="3"><v-icon large>mdi-chevron-right</v-icon></v-col>
                </v-row>
            </v-card>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from '~/components/LoginForm';
export default {
    layout:'logindefault',
    components: {
        
        LoginForm,
    },
}
</script>

<style>

</style>