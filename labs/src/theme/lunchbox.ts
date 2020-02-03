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
            fontSize: '64px',
            fontWeight: 'bolder',
        },
        h2: {
            fontSize: '54px',
            fontWeight: 'bolder'
        },
        h3: {
            fontSize: '40px',
            fontWeight: 'bolder'
        },
        h4: {
            fontSize: '36px',
            fontWeight: 'normal'
        },
        h5: {
            fontSize: '10px',
            fontWeight: 'lighter'
        },
        p: {
            fontSize: '18px',
            fontWeight: 'normal',
            lineHeight: '30px',
        },
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
