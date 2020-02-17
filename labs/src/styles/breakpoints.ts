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

export const device = {
    mobileS: `(min-width: ${breakPoints.mobileS})`,
    mobileM: `(min-width: ${breakPoints.mobileM})`,
    mobileL: `(min-width: ${breakPoints.mobileL})`,
    tablet: `(min-width: ${breakPoints.tablet})`,
    laptop: `(min-width: ${breakPoints.laptop})`,
    laptopL: `(min-width: ${breakPoints.laptopL})`,
    desktop: `(min-width: ${breakPoints.desktop})`,
    desktopL: `(min-width: ${breakPoints.desktop})`
  };

export default device;