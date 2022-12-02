const dev = {
    API_ENDPOINT_URL: process.env.DEV_API_ENDPOINT_URL,
};

const prod = {
    API_ENDPOINT_URL: process.env.PROD_API_ENDPOINT_URL,
};

const getEnv = () => {
    switch (process.env.NODE_ENV) {
        case "development":
            return dev;
            break;
        case "production":
            return prod;
            break;
        default:
            break;
    }
};

export const env = getEnv();
