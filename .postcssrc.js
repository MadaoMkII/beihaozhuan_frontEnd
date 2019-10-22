module.exports = {
    'plugins': {
        'autoprefixer': {browsers: 'last 5 version'},
        'postcss-px2rem-exclude': {
            remUnit: 75,
            exclude: /node_modules|admin|missionAward/i
        }
    }
}

