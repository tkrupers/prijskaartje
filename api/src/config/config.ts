export default {
    jwtSecret:
        process.env.NODE_ENV !== 'production'
            ? 'super-geheim-token'
            : process.env.JWT_SECRET,
    alphavantage: {
        baseUrl: 'https://www.alphavantage.co',
        apiKey: process.env.ALPHA_VANTAGE_KEY,
    },
};
