import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    mainPosts:[],
    main2Posts:[],
    main3Posts:[],
    hasMorePost: true,
    imagePaths:[],
    image2Paths:[],
    mainItems:[],
    searchItems:[],
    chatList:[],
    order:[],
    likeItems:[],
    
});

const limit = 10;
const totalPosts = 51;

export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload);
        state.imagePaths = [];
    },
    addItem(state, payload) {
        
        state.imagePaths = [];
        state.image2Paths = [];
    },
    chatSend(state, payload) {
        state.chatList.push(payload);
        console.log(state.chatList);
    },
    makeOrder(state, payload) {
        state.order=payload;
        console.log(state.order);
    },
    chatGet(state, payload) {
        
        state.chatList = payload;
        console.log(state.chatList);
    },
    add2MainPost(state, payload) {
        console.log(payload);
        state.main2Posts.unshift(payload);
        state.imagePaths = [];
    },
    addAuctionPost(state, payload) {
        state.mainPosts.unshift(payload);
        state.imagePaths = [];
    },
    selecthouse(state, payload) {
        state.main3Posts.unshift(payload);
        //state.imagePaths = [];
    },
    removeMainPost(state, payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts.splice(index, 1);
    },
    removeMainItem(state, payload){
        const index = state.mainItems.findIndex(v => v.id === payload.itemId);
        state.mainItems.splice(index, 1);
    },
    loadComments(state,payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        Vue.set(state.mainPosts[index],'Comments', payload.data);
    },
    loadLikeItems(state,payload){
        state.likeItems = payload.data;
    },
    addComment(state, payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadPost(state, payload) {
        state.mainItems = [payload];
        
    },
    loadItem(state, payload) {
        state.mainItems = [payload];
        
    },
    loadPosts(state, payload){
        if (payload.reset) {
            state.mainPosts = payload.data;
        } else {
            state.mainPosts = state.mainPosts.concat(payload.data);
        }
        
        state.hasMorePost = payload.length === 10;
    },
    loadItems(state, payload){
        console.log('loadItems');
        if (payload.reset) {
            state.mainItems = payload.data;
        } else {
            state.mainItems = state.mainItems.concat(payload.data);
        }
        
        //state.hasMorePost = payload.length === 10;
    },
    searchItems(state, payload){
        if (payload.reset) {
            state.searchItems = payload.data;
            console.log(state.searchItems);
        } else {
            state.searchItems = state.searchItems.concat(payload.data);
        }
        
        //state.hasMorePost = payload.length === 10;
    },
    concatImagePaths(state,payload){
        state.imagePaths = state.imagePaths.concat(payload); //????????? ????????? ??????????????? ????????? ??????
    },
    removeImagePath(state, payload){
        state.imagePaths.splice(payload, 1);
    },
    concatImage2Paths(state,payload){
        state.image2Paths = state.image2Paths.concat(payload); //????????? ????????? ??????????????? ????????? ??????
    },
    removeImage2Path(state, payload){
        state.image2Paths.splice(payload, 1);
    },
    unlikePost( state, payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        const userIndex = state.mainPosts[index].Likers.findIndex(v => v.id === payload.userId);
        state.mainPosts[index].Likers.splice(userIndex, 1);
    },
    likePost(state, payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Likers.push({
            id : payload.userId,
        });
    },
    unlikeItem( state, payload){
        const index = state.mainItems.findIndex(v => v.id === payload.itemId);
        const userIndex = state.mainItems[index].Itemlikers.findIndex(v => v.id === payload.userId);
        state.mainItems[index].Itemlikers.splice(userIndex, 1);
    },
    likeItem(state, payload){
        const index = state.mainItems.findIndex(v => v.id === payload.itemId);
        state.mainItems[index].Itemlikers.push({
            id : payload.userId,
        });
    },
};

export const actions = {
    add({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        this.$axios.post('/post',{
            content: payload.content,
            image: state.imagePaths,
        },{
            withCredentials: true,
        })
            .then((res)=>{
                commit('addMainPost', res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    addItem({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        this.$axios.post('/post/item',{
            content: payload.content,
            title:payload.title,
            modify:payload.modify,
            image: state.imagePaths,
            image2: state.image2Paths,
            cost:payload.cost,
            category:payload.category,
        },{
            withCredentials: true,
        })
            .then((res)=>{
                commit('addItem', res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    add2({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        this.$axios.post('/post/house',{
            content: payload.content,
            tree:payload.tree,
            py:payload.py,
            solo:payload.solo,
            image: state.imagePaths,
        },{
            withCredentials: true,
        })
            .then((res)=>{
                commit('add2MainPost', res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    makeChatroom({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        
        this.$axios.post('/user/chatroom',{

            
            receiverId:payload.receiverId,
            senderId:payload.senderId,


        },{
            withCredentials: true,
        })
            .then((res)=>{
                console.log('chatroom created!');
                console.log(res.data);
              
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    chatSend({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        
        this.$axios.post('/post/chat',{

            content: payload.content,
            receiverId:payload.receiverId,
            senderId:payload.senderId,


        },{
            withCredentials: true,
        })
            .then((res)=>{
                commit('chatSend', res.data);
              
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    chatGet({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        console.log(payload);
        this.$axios.post(`/post/${payload}/chat`,{
            
        },{
            withCredentials: true,
        })
            .then((res)=>{
                commit('chatGet', res.data);
                console.log(res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    makeOrder({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        
        this.$axios.post('/post/makeorder',{

            
            itemId : payload.itemId,
            cost:payload.cost,


        },{
            withCredentials: true,
        })
            .then((res)=>{
                console.log('order created!');
                console.log(res.data);
                commit('makeOrder', res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    orderItem({ commit, state }, payload){
        


        BootPay.request({
            price: '5000', //?????? ???????????? ??????
            application_id: "619e506ce38c30001ed2bbeb",
            name: '??????????????????', //??????????????? ????????? ??????
            
           
            show_agree_window: 0, // ???????????? ?????? ?????? ??? ????????? ??????
            items: [
                {
                    item_name: '??????????????????', //?????????
                    qty: 1, //??????
                    unique: '1', //?????? ????????? ???????????? primary key
                    price: 5000, //?????? ??????
                    cat1: '??????', // ?????? ????????? ???????????? ???, 50?????? ??????
                    
                }
            ],
            user_info: {
                username: '?????????',
                email: 'leehohee@gmail.com',
                
            },
            order_id: '1234', //?????? ???????????????, ???????????? ?????? ??????????????? ?????????.
            
        }).error(function (data) {
            //?????? ????????? ????????? ???????????? ???????????????.
            console.log(data);
        }).cancel(function (data) {
            //????????? ???????????? ???????????????.
            console.log(data);
        }).ready(function (data) {
            // ???????????? ?????? ??????????????? ???????????? ???????????? ???????????????.
            console.log(data);
        }).confirm(function (data) {
            //????????? ???????????? ?????? ????????????, ?????? ????????? ???????????? ????????? ???????????????.
            //?????? - ?????? ??????????????? ?????? ??? ????????? ???????????? ????????????.
            console.log(data);
            var enable = true; // ?????? ?????? ?????? ?????? ?????? ?????? ??????
            if (enable) {
                BootPay.transactionConfirm(data); // ????????? ????????? ?????? ????????? ??????.
            } else {
                BootPay.removePaymentWindow(); // ????????? ?????? ????????? ?????? ?????? ?????? ????????? ???????????? ?????????.
            }
        }).close(function (data) {
            // ???????????? ????????? ???????????????. (??????,??????,????????? ???????????? ?????? ?????????)
            console.log(data);
        }).done(function (data) {
            //????????? ??????????????? ???????????? ???????????????
            //???????????? ????????? ???????????? ?????? ?????? ????????? ????????? ????????? ???????????????.
            console.log(data);
        });
        
    },
    
    selecthouse({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        this.$axios.post('/post/selecthouse',{
            
            tree:payload.tree,
            py:payload.py,
            solo:payload.solo,
            
        },{
            withCredentials: true,
        })
            .then((res)=>{
                commit('selecthouse', res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    selectImage({ commit, state }, payload){
        //????????? ????????? ?????? ?????? ??????
        this.$axios.post('/post/selectimage',{
            id:payload.id,
            
            
        },{
            withCredentials: true,
        })
            .then((res)=>{
                commit('addAuctionPost', res.data);
            })
            .catch((err)=>{
                console.error(err);
            })
        
    },
    remove({ commit }, payload){
        this.$axios.delete(`/post/${payload.postId}`,{
            withCredentials: true,
        })
        .then(()=>{
            commit('removeMainPost', payload)
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    removeItem({ commit }, payload){
        this.$axios.delete(`/post/${payload.itemId}/item`,{
            withCredentials: true,
        })
        .then(()=>{
            commit('removeMainItem', payload)
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    addComment({commit}, payload){
        this.$axios.post(`/post/${payload.postId}/comment`, {
            content: payload.content,
        }, {
            withCredentials: true,
        }).then((res)=>{
            commit('addComment', res.data);
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    loadComments({commit}, payload){
        this.$axios.get(`/post/${payload.postId}/comments`)
            .then((res)=>{
                commit('loadComments', {
                    postId: payload.postId,
                    data: res.data,
                });
            })
            .catch((err)=>{
                console.error(err);
            });
    },
    loadLikeItems({commit, state}, payload){
        
        this.$axios.get(`/post/${payload.userId}/userlikeitem`)
            .then((res)=>{
                console.log(res.data);
                commit('loadLikeItems', {
                    userId: payload.userId,
                    data: res.data,
                });
            })
            .catch((err)=>{
                console.error(err);
            });
    },
    async loadPost({ commit, state }, payload) {
        try {
            const res = await this.$axios.get(`/post/${payload}`);
            commit('loadPost', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async loadItem({ commit, state }, payload) {
        try {
            const res = await this.$axios.get(`/post/${payload}/item`);
            commit('loadItem', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    loadPosts : throttle(async function({ commit, state },payload){
        console.log('loadPosts');
        try {
        if (payload && payload.reset) {
            const res = await this.$axios.get(`/posts?limit=10`);
            commit('loadPosts', {
            data: res.data,
            reset: true,
            });
            return;
        }
        if (state.hasMorePost) {
            const lastPost = state.mainPosts[state.mainPosts.length - 1];
            const res = await this.$axios.get(`/posts?lastId=${lastPost && lastPost.id}&limit=10`);
            commit('loadPosts', {
            data: res.data,
            });
            return;
        }
        } catch (err) {
        console.error(err);
        }
    }, 2000),
    loadItems : throttle(async function({ commit, state },payload){
        
        try {
        
            const res = await this.$axios.get(`/posts/items?limit=10`);
            commit('loadItems', {
            data: res.data,
            reset: true,
            });
            return;
        
        
        } catch (err) {
            console.error(err);
        }
    }, 2000),
    searchItems : throttle(async function({ commit, state },payload){
        console.log('actionsearchItems');
        try {
        
            const res = await this.$axios.post(`/posts/searchitems?limit=10`, {
               search : payload.search,
            }, {
                withCredentials: true,
            });
            commit('searchItems', {
            data: res.data,
            reset: true,
            });
            return;
        
        
        } catch (err) {
            console.error(err);
        }
    }, 2000),
    loadUserPosts : throttle(async function({ commit, state },payload){
        if (payload && payload.reset) {
            const res = await this.$axios.get(`/user/${payload.userId}/posts?limit=10`);
            commit('loadPosts', {
              data: res.data,
              reset: true,
            });
            return;
        }
        if(state.hasMorePost){
            try {
            const lastPost = state.mainPosts[state.mainPosts.length - 1];
            const res = this.$axios.get(`user/${payload.userId}/posts?lasId=${lastPost && lastPost.id}&limit=10`);
            commit('loadPosts', {
                data: res.data,
            });
            return ;
            } catch(err){
                console.error(err);
            }
        }
    }, 2000),
    loadCategoryItems : throttle(async function({ commit, state },payload){
        if (payload && payload.reset) {
            const res = await this.$axios.get(`/user/${payload.CategoryId}/category?limit=10`);
            commit('loadItems', {
              data: res.data,
              reset: true,
            });
            return;
        }
        if(state.hasMorePost){
            try {
            const lastPost = state.mainItems[state.mainItems.length - 1];
            const res = this.$axios.get(`user/${payload.CategoryId}/category?lasId=${lastPost && lastPost.id}&limit=10`);
            commit('loadItems', {
                data: res.data,
            });
            return ;
            } catch(err){
                console.error(err);
            }
        }
    }, 2000),
    loadHashtagPosts: throttle(async function({ commit, state }, payload) {
        try {
            if (payload && payload.reset) {
            const res = await this.$axios.get(`/hashtag/${payload.hashtag}?limit=10`);
            commit('loadPosts', {
                data: res.data,
                reset: true,
            });
            return;
            }
            if (state.hasMorePost) {
            const lastPost = state.mainPosts[state.mainPosts.length - 1];
            const res = await this.$axios.get(`/hashtag/${payload.hashtag}?lastId=${lastPost && lastPost.id}&limit=10`);
            commit('loadPosts', {
                data: res.data,
            });
            return;
            }
        } catch (err) {
            
        }
    }, 2000),
    uploadImages({commit}, payload){
        this.$axios.post('/post/images', payload,{
            withCredentials: true,
        })
            .then((res)=>{
                commit('concatImagePaths', res.data);
            })
            .catch((err)=>{
                console.error(err);
            });
    },
    uploadImage2s({commit}, payload){
        this.$axios.post('/post/image2s', payload,{
            withCredentials: true,
        })
            .then((res)=>{
                commit('concatImage2Paths', res.data);
            })
            .catch((err)=>{
                console.error(err);
            });
    },
    retweet({commit}, payload){
        this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
            withCredentials:true,
        })
        .then((res)=>{
            commit('addMainPost', res.data);
        })
        .catch((err)=>{
            console.error(err);
            alert(err.response.data);
        });
    },
    likePost({commit},payload){
        this.$axios.post(`/post/${payload.postId}/like`, {}, {
            withCredentials:true,
        })
        .then((res)=>{
            commit('likePost', {
                userId: res.data.userId,
                postId: payload.postId,
            });
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    unlikePost({commit},payload){
        this.$axios.delete(`/post/${payload.postId}/like`, {  //delete????????? ???????????? ??????????????? ???????????? ??????
            withCredentials:true,
        })
        .then((res)=>{
            commit('unlikePost', {
                userId: res.data.userId,
                postId: payload.postId,
            });
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    likeItem({commit},payload){
        this.$axios.post(`/post/${payload.itemId}/itemlike`, {}, {
            withCredentials:true,
        })
        .then((res)=>{
            commit('likeItem', {
                userId: res.data.userId,
                itemId: payload.itemId,
            });
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    unlikeItem({commit},payload){
        this.$axios.delete(`/post/${payload.itemId}/itemlike`, {  //delete????????? ???????????? ??????????????? ???????????? ??????
            withCredentials:true,
        })
        .then((res)=>{
            commit('unlikeItem', {
                userId: res.data.userId,
                itemId: payload.itemId,
            });
        })
        .catch((err)=>{
            console.error(err);
        });
    },
};