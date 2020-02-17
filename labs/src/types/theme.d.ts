import 'styled-components'

declare module 'styled-components' {
    export interface BaseTheme {
        typography: {
            fontFamily: string,
            
            h1: {
                fontMax: string,
                fontMin: string,
                fontWeight: string,
            },
            h2: {
                fontMax: string,
                fontMin: string,
                fontWeight: string,
            },
            h3: {
                fontMax: string,
                fontMin: string,
                fontWeight: string,
            },
            h4: {
                fontMax: string,
                fontMin: string,
                fontWeight: string,
            },
            h5: {
                fontMax: string,
                fontMin: string,
                fontWeight: string,
            },
            p: {
                fontMax: string,
                fontMin: string,
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
