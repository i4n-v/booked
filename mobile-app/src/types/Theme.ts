// Theme colors

type IMode = "light" | "dark";

type IColorsKeys = 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type IColorsPattern = {
  [key in IColorsKeys]?: string;
};

interface IColors {
  primary?: IColorsPattern;
  secondary?: IColorsPattern;
  text?: IColorsPattern;
  success?: IColorsPattern;
  error?: IColorsPattern;
  info?: IColorsPattern;
  warning?: IColorsPattern;
}

// Theme Typography

interface ITypography {
  size: {
    body: number;
    caption: number;
    title: number;
    medium: number;
    regular: number;
  };
  fonts: {
    primary: {
      normal?: string;
      medium?: string;
      light?: string;
      semibold?: string;
    };
  };
}

//Theme Shape

interface IShape {
  borderRadius: number;
  padding: number;
  opacity: number;
}

//Theme Shadows

interface IShadowPattern {
  web: string;
  mobile: {
    shadowColor: string;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

type IShadowKeys = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type IShadow = {
  [key in IShadowKeys]: IShadowPattern;
};

// Theme

interface IThemePattern {
  mode: IMode;
  colors: IColors;
  typography: ITypography;
  shape: IShape;
  shadows: IShadow;
}

type ITheme = {
  [key in IMode]: IThemePattern;
};

export {
  IMode,
  IThemePattern,
  ITheme,
  IColorsPattern,
  IColors,
  ITypography,
  IShape,
  IShadow,
  IShadowPattern,
};
