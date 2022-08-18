export const EnvConfiguration = () => ({
    environment: process.env.MONGODB || 'dev',
    mongodb: process.env.MONGODB,
    default_limit: process.env.DEFAULT_LIMIT || 7
});