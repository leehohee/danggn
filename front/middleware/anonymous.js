export default function({store, redirect}){
    if(store.state.users.me){
        console.log("hohee-1")
        redirect('/');
        console.log("hohee-2")
    }
}