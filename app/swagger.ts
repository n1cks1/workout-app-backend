import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Workout API',
            version: '1.0.0',
        },
    },
    apis: ['./app/**/*.routes.ts'] // где лежат JSDoc аннотации
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };