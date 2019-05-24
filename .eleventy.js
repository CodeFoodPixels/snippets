const purifycss = require('purify-css');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("site/styles.css");

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addTransform('purifycss', async function (content, outputPath) {
        if (outputPath.endsWith(".html")) {
            return new Promise((resolve) => {
                purifycss(content, ['build/styles.css'], {
                    minify: true
                }, (css) => {
                    resolve(content.replace('<link rel="stylesheet" href="/styles.css">', `<style>${css}</style>`));
                });
            });
        };

        return content;
    });

    return {
        templateFormats: [
            "njk",
            "md",
            "11ty.js"
        ],

        pathPrefix: "/",
        passthroughFileCopy: true,
        dir: {
            input: "site",
            includes: "../includes",
            data: "../data",
            output: "build"
        }
    }
};

