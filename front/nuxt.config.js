module.exports = {
    layoutTransition: {
        name: 'my-layouts',
        mode: 'out-in'
    },
    pageTransition: {
        name: 'page',
        mode: 'out-in',
        beforeEnter (el) {
          console.log('Before enter...');
        }
    },
    head: {
        
            title: 'COMFORDE',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                
          
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
              ],
            script: [
            { src: 'https://cdn.bootpay.co.kr/js/bootpay-3.3.2.min.js', async: true, defer: true }
            ],
        
    },
    components : true,
    modules: [
        '@nuxtjs/axios',
        ['nuxt-viewport', {
            viewport: {
                breakpoints: {
                  desktop: 1024,
                  desktopMedium: 1280,
                  desktopWide: 1600,
            
                  mobile: 320,
                  mobileMedium: 375,
                  mobileWide: 425,
            
                  tablet: 768,
                },
            
                cookieName: 'viewport',
            
                defaultBreakpoints: {
                  desktop: 'desktop',
                  mobile: 'mobile',
                  tablet: 'tablet',
                },
            
                fallbackBreakpoint: 'mobile',
              },
          }
        ]
    ],
    buildModules:[
        '@nuxtjs/vuetify',
        '@nuxtjs/moment',
    ],
    moment:{
        locales: ['ko'],
    },
    build:{
        analyze: false,
        extend(config, { isClient, isServer, isDev}){
            if (isServer && !isDev){
                config.devtool = 'hidden-source-map';
            }
            console.log('webpack', config, isServer, isClient);
        },
    },
    vuetify: {
        breakpoint: {
            mobileBreakpoint: 'xs'
          },
        theme: {
            dark: false,
            default: 'light',
            disable: false,
            options: {
                cspNonce: undefined,
                customProperties: undefined,
                minifyTheme: undefined,
                themeCache: undefined,
            },
            themes: {
                light: {
                primary: '#9C27B0',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
                
                },
            },
            
        },
        customVariables: ['~/assets/variables.scss'],
        treeShake: true
        
    },
    plugins:[

    ],
    axios:{
        browserBaseURL: 'http://localhost:3065',
        baseURL: 'http://localhost:3065',
        https: false,
    },
    server:{
        port: process.env.PORT || 2525,
        host: '0.0.0.0',
    },
    
};