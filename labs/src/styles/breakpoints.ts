// Source:
// https://jsramblings.com/how-to-use-media-queries-with-styled-components/

export const breakPoints = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const devices = {
    mobileS: `(max-width: ${breakPoints.mobileS})`,
    mobileM: `(max-width: ${breakPoints.mobileM})`,
    mobileL: `(max-width: ${breakPoints.mobileL})`,
    tablet: `(max-width: ${breakPoints.tablet})`,
    laptop: `(max-width: ${breakPoints.laptop})`,
    laptopL: `(max-width: ${breakPoints.laptopL})`,
    desktop: `(max-width: ${breakPoints.desktop})`,
    desktopL: `(max-width: ${breakPoints.desktop})`
  };

export default devices;