import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as basicAuth from "express-basic-auth";
import { AppModule } from "./app.module";
import { ENV } from "./env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(ENV.API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    })
  );
  app.enableCors({ exposedHeaders: ["Content-Disposition"] });

  app.use(
    ["/docs", "/docs-json"],
    basicAuth({
      challenge: true,
      users: {
        [ENV.SWAGGER_USER]: ENV.SWAGGER_PASSWORD,
      },
    })
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(ENV.API_TITLE)
    .setDescription(ENV.API_DESC)
    .setVersion(ENV.API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      docExpansion: "none",
      tagsSorter: "alpha",
      operationsSorter: "alpha",
      caches: "no-cache",
    },
  });

  await app.listen(3000);
  console.log("Api server on running 🚀");
}
bootstrap();
