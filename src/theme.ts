import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  base: { borderRadius: "full", fontWeight: "semibold" },
});

const customConfig = defineConfig({
  globalCss: {
    html: { colorPalette: "brand" },

    body: {
      backgroundColor: "black",
      color: "white",
    },
  },

  theme: {
    textStyles: {},
    layerStyles: {},

    tokens: {
      colors: {
        brand: {
          50: { value: "#0ACBFF", description: "Loureo Blue" },
          100: { value: "#00C1F4", description: "Loureo Blue" },
          200: { value: "#00A1CB", description: "Loureo Blue" },
          300: { value: "#0080A3", description: "Loureo Blue" },
          400: { value: "#00607A", description: "Loureo Blue" },
          500: { value: "#004051", description: "Loureo Blue" },
          600: { value: "#003442", description: "Loureo Blue" },
          700: { value: "#002832", description: "Loureo Blue" },
          800: { value: "#001C23", description: "Loureo Blue" },
          900: { value: "#001014", description: "Loureo Blue" },
          950: { value: "#000A0C", description: "Loureo Blue" },
        },

        blacky: {
          50: { value: "#5C5C5C" },
          100: { value: "#575757" },
          200: { value: "#4D4D4D" },
          300: { value: "#424242" },
          400: { value: "#383838" },
          500: { value: "#2E2E2E" },
          600: { value: "#242424" },
          700: { value: "#1A1A1A" },
          800: { value: "#0F0F0F" },
          900: { value: "#050505" },
          950: { value: "#000000" },
        },

        gray: {
          50: { value: "#FCFCFC" },
          100: { value: "#EEEEEE" },
          200: { value: "#D2D2D2" },
          300: { value: "#B6B6B6" },
          400: { value: "#9A9A9A" },
          500: { value: "#7E7E7E" },
          600: { value: "#626262" },
          700: { value: "#464646" },
          800: { value: "#2A2A2A" },
          900: { value: "#0E0E0E" },
          950: { value: "#000000" },
        },

        blackAlpha: {
          50: { value: "rgba(0, 0, 0, 0.04)" },
          100: { value: "rgba(0, 0, 0, 0.06)" },
          200: { value: "rgba(0, 0, 0, 0.08)" },
          300: { value: "rgba(0, 0, 0, 0.16)" },
          400: { value: "rgba(0, 0, 0, 0.24)" },
          500: { value: "rgba(0, 0, 0, 0.36)" },
          600: { value: "rgba(0, 0, 0, 0.48)" },
          700: { value: "rgba(0, 0, 0, 0.64)" },
          800: { value: "rgba(0, 0, 0, 0.80)" },
          900: { value: "rgba(0, 0, 0, 0.92)" },
        },

        whiteAlpha: {
          50: { value: "rgba(255, 255, 255, 0.04)" },
          100: { value: "rgba(255, 255, 255, 0.06)" },
          200: { value: "rgba(255, 255, 255, 0.08)" },
          300: { value: "rgba(255, 255, 255, 0.16)" },
          400: { value: "rgba(255, 255, 255, 0.24)" },
          500: { value: "rgba(255, 255, 255, 0.36)" },
          600: { value: "rgba(255, 255, 255, 0.48)" },
          700: { value: "rgba(255, 255, 255, 0.64)" },
          800: { value: "rgba(255, 255, 255, 0.80)" },
          900: { value: "rgba(255, 255, 255, 0.92)" },
        },
      },
    },

    recipes: {
      button: buttonRecipe,
    },

    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.brand.100}" },
          fg: { value: "{colors.brand.500}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },

        blacky: {
          solid: { value: "{colors.blacky.950}" },
          contrast: { value: "white" },
          fg: { value: "{colors.blacky.500}" },
          muted: { value: "{colors.blacky.100}" },
          subtle: { value: "{colors.blacky.200}" },
          emphasized: { value: "{colors.blacky.300}" },
          focusRing: { value: "{colors.blacky.500}" },
        },

        white: {
          solid: { value: "white" },
          contrast: { value: "black" },
          fg: { value: "{colors.gray.500}" },
          muted: { value: "{colors.gray.100}" },
          subtle: { value: "{colors.gray.200}" },
          emphasized: { value: "{colors.gray.300}" },
          focusRing: { value: "{colors.gray.500}" },
        },

        gray: {
          solid: { value: "{colors.gray.500}" },
          contrast: { value: "{colors.gray.100}" },
          fg: { value: "{colors.gray.500}" },
          muted: { value: "{colors.gray.100}" },
          subtle: { value: "{colors.gray.200}" },
          emphasized: { value: "{colors.gray.300}" },
          focusRing: { value: "{colors.gray.500}" },
        },

        blackAlpha: {
          solid: { value: "{colors.blackAlpha.500}" },
          contrast: { value: "{colors.blackAlpha.100}" },
          fg: { value: "{colors.blackAlpha.500}" },
          muted: { value: "{colors.blackAlpha.100}" },
          subtle: { value: "{colors.blackAlpha.200}" },
          emphasized: { value: "{colors.blackAlpha.300}" },
          focusRing: { value: "{colors.blackAlpha.500}" },
        },

        whiteAlpha: {
          solid: { value: "{colors.whiteAlpha.500}" },
          contrast: { value: "{colors.whiteAlpha.100}" },
          fg: { value: "{colors.whiteAlpha.500}" },
          muted: { value: "{colors.whiteAlpha.100}" },
          subtle: { value: "{colors.whiteAlpha.200}" },
          emphasized: { value: "{colors.whiteAlpha.300}" },
          focusRing: { value: "{colors.whiteAlpha.500}" },
        },
      },

      shadows: {
        subtle: { value: "0px 0px 20px 0px rgb(0 0 0 / 25%)" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
