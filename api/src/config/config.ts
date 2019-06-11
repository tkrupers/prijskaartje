export default {
    jwtSecret:
        process.env.NODE_ENV !== 'production'
            ? 'super-geheim-token'
            : process.env.JWT_SECRET,
};
