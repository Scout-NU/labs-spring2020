import 'styled-components'

declare module 'styled-components' {
    export interface BaseTheme {
        typography: {
            fontFamily: string,
            
            h1: {
                fontSize: string,
                fontWeight: string,
            },
            h2: {
                fontSize: string,
                fontWeight: string,
            },
            h3: {
                fontSize: string,
                fontWeight: string,
            },
            h4: {
                fontSize: string,
                fontWeight: string,
            },
            h5: {
                fontSize: string,
                fontWeight: string,
            },
            p: {
                fontSize: string,
                fontWeight: string,
                lineHeight: string,
            },
        },

        components: {
            button: {
                border: string,
                borderRadius: string,
                boxShadow: string,
            }
        }
    }
}
