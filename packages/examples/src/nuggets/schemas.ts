import colors from '../colors';

export const action = {
  surface: {
    color: colors.marine,
    border: {
      color: colors.marineDark,
    },
    hover: {
      color: colors.marineLight,
    },
    press: {
      color: colors.marine,
    },
  },
  words: {
    text: {
      color: colors.marineLighter,
    },
    hover: {
      text: {
        color: colors.white,
      },
    },
  },
};

export const danger = {
  surface: {
    color: colors.danger,
    border: {
      color: colors.dangerDark,
    },
    hover: {
      color: colors.dangerLight,
    },
    press: {
      color: colors.danger,
    },
  },
  words: {
    text: {
      color: colors.dangerLighter,
    },
    hover: {
      text: {
        color: colors.white,
      },
    },
  },
};

export const dark = {
  surface: {
    color: colors.night,
    border: {
      color: colors.nightDark,
    },
    hover: {
      color: colors.nightLight,
    },
    press: {
      color: colors.night,
    },
  },
  words: {
    text: {
      color: colors.white,
    },
  },
};
