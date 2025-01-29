const path = require('path');

module.exports = function override(config, env) {
    config.resolve = {
        ...config.resolve,
        alias: {
            routes: path.resolve(__dirname, 'src/routes/'),
            scenes: path.resolve(__dirname, 'src/scenes/'),
            components: path.resolve(__dirname, 'src/components/'),
            hooks: path.resolve(__dirname, 'src/hooks/'),
            services: path.resolve(__dirname, 'src/services/'),
        },
        extensions: ['.js', '.jsx', '.json'],
    };

    return config;
};