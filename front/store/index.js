export const state = () => ({
   
});

export const mutations = {
   
};

export const actions = {
    nuxtServerInit({commit, dispatch, state}, {req}){ //예약된 이름 대소문자도 맞춰줘야한다.
        return dispatch('users/loadUser');
    },
};