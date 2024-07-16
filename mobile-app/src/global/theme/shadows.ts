import { IShadow } from "@/types/Theme";

const shadowColor = "#000000";

const shadows: IShadow = {
  0: {
    web: "0px 1px 1px rgba(0, 0, 0, 0.18)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
  },
  1: {
    web: "0px 1px 1.41px rgba(0, 0, 0, 0.2)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
  },
  2: {
    web: "0px 1px 2.22px rgba(0, 0, 0, 0.22)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  },
  3: {
    web: "0px 2px 2.62px rgba(0, 0, 0, 0.23)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  },
  4: {
    web: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
  5: {
    web: "0px 3px 4.65px rgba(0, 0, 0, 0.27)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
  },
  6: {
    web: "0px 3px 4.65px rgba(0, 0, 0, 0.29)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
  },
  7: {
    web: "0px 4px 4.65px rgba(0, 0, 0, 0.3)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  8: {
    web: "0px 4px 5.46px rgba(0, 0, 0, 0.32)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
    },
  },
  9: {
    web: "0px 5px 6.27px rgba(0, 0, 0, 0.34)",
    mobile: {
      shadowColor,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
  },
};

export default shadows;
