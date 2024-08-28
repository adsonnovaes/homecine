import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";

const customTheme: ThemeDefinition = {
  dark: false,
  colors: {
    "primary-50": "hsla(246, 91.3%, 95.5%, 1)",
    "primary-100": "hsla(245, 89.5%, 92.5%, 1)",
    "primary-200": "hsla(246, 89.5%, 85.1%, 1)",
    "primary-300": "hsla(246, 87.9%, 77.3%, 1)",
    "primary-400": "hsla(246, 88.3%, 69.8%, 1)",
    "primary-500": "hsla(246, 88.5%, 62.4%, 1)",
    "primary-500-10": "hsla(246, 88.5%, 62.4%, 0.1)",
    "primary-600": "hsla(246, 53.5%, 49.8%, 1)",
    "primary-700": "hsla(246, 53.7%, 37.3%, 1)",
    "primary-800": "hsla(246, 53.1%, 25.1%, 1)",
    "primary-900": "hsla(245, 53.1%, 12.5%, 1)",

    "secondary-50": "hsla(204, 100%, 94.7%, 1)",
    "secondary-100": "hsla(205, 95.7%, 91%, 1)",
    "secondary-200": "hsla(204, 97.8%, 82.2%, 1)",
    "secondary-300": "hsla(204, 97.1%, 73.1%, 1)",
    "secondary-400": "hsla(204, 97.8%, 64.3%, 1)",
    "secondary-500": "hsla(204, 97.4%, 55.3%, 1)",
    "secondary-600": "hsla(204, 78.8%, 44.3%, 1)",
    "secondary-700": "hsla(204, 78.7%, 33.1%, 1)",
    "secondary-800": "hsla(204, 78.8%, 22.2%, 1)",
    "secondary-900": "hsla(205, 78.6%, 11%, 1)",

    "tertary-50": "hsla(270, 100%, 96.5%, 1)",
    "tertary-100": "hsla(269, 100%, 94.3%, 1)",
    "tertary-200": "hsla(270, 100%, 88.6%, 1)",
    "tertary-300": "hsla(270, 100%, 82.7%, 1)",
    "tertary-400": "hsla(270, 100%, 77.1%, 1)",
    "tertary-500": "hsla(270, 100%, 71.4%, 1)",
    "tertary-600": "hsla(270, 53.4%, 57.1%, 1)",
    "tertary-700": "hsla(270, 40.4%, 42.7%, 1)",
    "tertary-800": "hsla(270, 39.7%, 28.6%, 1)",
    "tertary-900": "hsla(269, 39.7%, 14.3%, 1)",

    "success-50": "hsla(162, 66.7%, 92.9%, 1)",
    "success-100": "hsla(162, 66.7%, 88.2%, 1)",
    "success-200": "hsla(162, 66.7%, 76.5%, 1)",
    "success-300": "hsla(162, 67.6%, 64.9%, 1)",
    "success-400": "hsla(162, 67.4%, 53.1%, 1)",
    "success-500": "hsla(162, 95.3%, 41.4%, 1)",
    "success-600": "hsla(162, 95.3%, 33.1%, 1)",
    "success-700": "hsla(162, 95.3%, 24.9%, 1)",
    "success-800": "hsla(162, 95.2%, 16.5%, 1)",
    "success-900": "hsla(162, 95.2%, 8.2%, 1)",

    "error-50": "hsla(0, 100%, 96.3%, 1)",
    "error-100": "hsla(0, 100%, 93.7%, 1)",
    "error-200": "hsla(0, 100%, 87.6%, 1)",
    "error-300": "hsla(0, 100%, 81.4%, 1)",
    "error-400": "hsla(0, 100%, 75.3%, 1)",
    "error-500": "hsla(0, 100%, 69%, 1)",
    "error-600": "hsla(0, 55.3%, 55.3%, 1)",
    "error-700": "hsla(0, 45%, 41.4%, 1)",
    "error-800": "hsla(0, 44.7%, 27.6%, 1)",
    "error-900": "hsla(0, 45.7%, 13.7%, 1)",

    "warning-50": "hsla(33, 100%, 95.7%, 1)",
    "warning-100": "hsla(33, 100%, 92.9%, 1)",
    "warning-200": "hsla(33, 100%, 85.7%, 1)",
    "warning-300": "hsla(33, 100%, 78.6%, 1)",
    "warning-400": "hsla(33, 100%, 71.4%, 1)",
    "warning-500": "hsla(33, 100%, 64.3%, 1)",
    "warning-600": "hsla(33, 58.9%, 51.4%, 1)",
    "warning-700": "hsla(33, 55.3%, 38.6%, 1)",
    "warning-800": "hsla(33, 55.7%, 25.7%, 1)",
    "warning-900": "hsla(33, 54.5%, 12.9%, 1)",

    "grey-50": "hsla(222, 33.3%, 94.1%, 1)",
    "grey-100": "hsla(222, 16.5%, 79.8%, 1)",
    "grey-200": "hsla(224, 15.2%, 70.4%, 1)",
    "grey-300": "hsla(224, 13.6%, 61%, 1)",
    "grey-400": "hsla(224, 12.3%, 52.2%, 1)",
    "grey-500": "hsla(224, 13.4%, 43.9%, 1)",
    "grey-600": "hsla(224, 19.3%, 34.5%, 1)",
    "grey-700": "hsla(224, 25.4%, 26.3%, 1)",
    "grey-800": "hsla(224, 31.9%, 18.4%, 1)",
    "grey-800-05": "hsla(224, 31.9%, 18.4%, 0.05)",
    "grey-800-80": "hsla(224, 31.9%, 18.4%, 0.8)",
    "grey-800-98": "hsla(224, 31.9%, 18.4%, 0.98)",
    "grey-900": "hsla(224, 39%, 11.6%, 1)",
    "grey-900-20": "hsla(224, 39%, 11.6%, 0.2)",
    "grey-900-40": "hsla(224, 39%, 11.6%, 0.4)",
    "grey-900-80": "hsla(224, 39%, 11.6%, 0.8)",
    "grey-900-98": "hsla(224, 39%, 11.6%, 0.98)",

    "transparent": "hsla(0, 0%, 0%, 0)",
    "black-10": "hsla(0, 0%, 0%, 0.1)",
    "black-20": "hsla(0, 0%, 0%, 0.2)",
    "black-30": "hsla(0, 0%, 0%, 0.3)",
    "black-40": "hsla(0, 0%, 0%, 0.4)",
    "black-50": "hsla(0, 0%, 0%, 0.5)",
    "black-65": "hsla(0, 0%, 0%, 0.65)",
    "black-75": "hsla(0, 0%, 0%, 0.75)",
    "black-100": "hsla(0, 0%, 0%, 1)",
    "white-10": "hsla(0, 0%, 100%, 0.1)",
    "white-20": "hsla(0, 0%, 100%, 0.2)",
    "white-30": "hsla(0, 0%, 100%, 0.3)",
    "white-40": "hsla(0, 0%, 100%, 0.4)",
    "white-50": "hsla(0, 0%, 100%, 0.5)",
    "white-65": "hsla(0, 0%, 100%, 0.65)",
    "white-75": "hsla(0, 0%, 100%, 0.75)",
    "white-100": "hsla(0, 0%, 100%, 1)",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: "customTheme",
      themes: {
        customTheme,
      },
    },
  });
  app.vueApp.use(vuetify);
});
