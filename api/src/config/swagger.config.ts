import { Express } from 'express';
import path from 'path';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import customSwagger from './swaggerStyles.config';

const options: Options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booked API',
      summary: 'A virtual library to your books!',
      description:
        // eslint-disable-next-line quotes
        "***Booked*** a virtual library to read and publish your books. This documentation contains all Booked's api's routes and examples about how to use it. <br><br> ***Some links:*** <br><br> - [Booked repository](https://github.com/i4n-v/booked)",
      termsOfService: '/',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        access_token: {
          type: 'apiKey',
          name: 'x-access-token',
          description: 'Header used for sending the authentication token.',
          in: 'header',
          schema: {
            type: 'string',
          },
        },
      },
      schemas: {
        Message: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
        Image: {
          type: 'string',
          contentType: 'image/png, image/jpeg, image/pjpeg, image/webp',
          format: 'binary',
        },
        File: {
          type: 'string',
          contentType: 'application/pdf',
          format: 'binary',
        },
      },
      parameters: {
        access_token: {
          name: 'x-access-token',
          description: 'Header used for sending the authentication token.',
          in: 'header',
          schema: {
            type: 'string',
          },
        },
        page: {
          name: 'page',
          description: 'page of paginated route.',
          in: 'query',
          schema: {
            type: 'integer',
          },
        },
        limit: {
          name: 'limit',
          description: 'limit of paginated route.',
          in: 'query',
          schema: {
            type: 'integer',
          },
        },
      },
      responses: {
        success: {
          description: 'A message object with the success format',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Message',
              },
            },
          },
        },
        error: {
          description: 'A message object with the error cause',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Message',
              },
            },
          },
        },
      },
    },
  },
  apis: [path.resolve('src/routes/*.routes.ts')],
  json: true,
};

export default function swagger(app: Express) {
  const swaggerConfig = swaggerJSDoc(options);
  app.use('/api-docs', serve, setup(swaggerConfig, customSwagger));
  app.get('/swagger.json', (req, res) => {
    res.json(swaggerConfig);
  });
}
