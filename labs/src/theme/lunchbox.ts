import { BaseTheme } from "styled-components";

export const lunchboxColors = {
    tangerine: '#FF9B21',
    gusher: '#1F28CF',
    jello: '#FC433C',
    icepack: '#E7FCFF',
    soymilk: '#FFFFFF',
    carton: '#F5F5F5',
    gogurt: '#C2DEE2',
    salad: '#0ACF83',
    egg: '#FFED90',
    poptart: '#DFC6FF'
}


// Lunchbox Theme
export const lunchbox: BaseTheme = {
    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontMax: '64px',
            fontMin: '42px',
            fontWeight: 'bolder',
        },
        h2: {
            fontMax: '54px',
            fontMin: '32px',
            fontWeight: 'bolder'
        },
        h3: {
            fontMax: '40px',
            fontMin: '32px',
            fontWeight: 'bolder'
        },
        h4: {
            fontMax: '36px',
            fontMin: '16px',
            fontWeight: 'normal'
        },
        h5: {
            fontMax: '10px',
            fontMin: '10px',
            fontWeight: 'lighter'
        },
        p: {
            fontMax: '18px',
            fontMin: '14px',
            fontWeight: 'normal',
            lineHeightMax: '30px',
            lineHeightMin: '24px'
        },
        navLink: {
            fontMax: '26px',
            fontMin: '14px',
            fontWeight: 'bolder'
        }
    },

    components: {
        button: {
            border: 'none',
            borderRadius: '7px',
            boxShadow: 'none',
        }
    }
}

export default lunchbox;
