export default function({store, redirect}){
    if(!store.state.users.me){
        console.log("hohee-3")
        redirect('/');
        console.log("hohee-4")
    }
}