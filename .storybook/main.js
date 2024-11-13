import govukStorybook from "storybook-addon-govuk-fixtures";

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  addons: [
    govukStorybook({
      fixtures: [
        {
          storyNamespace: "components/govuk",
          searchPath: "node_modules/govuk-frontend/dist",
          nunjucksPrefix: 'govuk'
        },
        {
          storyNamespace: "components/govuk",
          searchPath: "src/govuk",
          nunjucksPrefix: 'govuk',
          type: "yaml",
          resolveTemplate: name => `node_modules/govuk-frontend/dist/govuk/components/${name}/template.njk`
        },
        {
          storyNamespace: "components/lbcamden",
          searchPath: "src/lbcamden",
          type: "yaml",
          nunjucksPrefix: 'LBCamden'
        },
      ],
      standaloneExamples: [
        {
          searchPath: "examples/patterns",
          storyNamespace: 'patterns',
        },
        {
          searchPath: "examples/full-page-examples",
          storyNamespace: 'full-page-examples',
        }
      ],
      additionalTemplatePaths: ["examples"],
    }),
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: [
    {
      to: "/assets",
      from: "../src/lbcamden/assets"
    },
    {
      to: "/example-assets",
      from: "../src/lbcamden/example-assets"
    },
  ]
};
export default config;
