import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

const swaggerCustomCss = `
.swagger-ui .topbar .download-url-wrapper {
  display: none
}

@font-face {
  font-family: Vazir;
  src: url(https://cdn.rawgit.com/rastikerdar/vazir-font/v21.2.1/dist/Vazir.eot);
  src: url(https://cdn.rawgit.com/rastikerdar/vazir-font/v21.2.1/dist/Vazir.eot?#iefix) format("embedded-opentype"), url(https://cdn.rawgit.com/rastikerdar/vazir-font/v21.2.1/dist/Vazir.woff2) format("woff2"), url(https://cdn.rawgit.com/rastikerdar/vazir-font/v21.2.1/dist/Vazir.woff) format("woff"), url(https://cdn.rawgit.com/rastikerdar/vazir-font/v21.2.1/dist/Vazir.ttf) format("truetype");
  font-weight: 400;
}

h1,
h2,
h3,
h4,
h5,
h6,
pre,
div,
p,
a,
span,
input,
select,
option {
  font-family: Vazir !important;
}

.swagger-ui .opblock .opblock-summary-description {
  text-align: right;
}

h2.title,
div.description,
select {
  direction: rtl;
}

p {
  margin: 0 !important;
}

.swagger-ui .info .title small {
  margin: 0 5px 0 0 !important;
}
`;
const description = `
<div style='font-size: 20px'>
توسعه توسط تیم
    <a href='http://moshavernet.com' target='_blank' style="font-weight: bold;font-size: 20px;text-decoration: none">
        مشاورنت
    </a>  
</div>
`;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  // app.use(helmet());
  app.enableCors();
  app.enable('trust proxy');
  // app.use(express.static(join(__dirname, '..', 'public')));
  app.use(/^(?!\/?api).+$/g, (req, res) => {
    res.sendFile(join(__dirname, '..', '/public/index.html'));
  });


  const options = new DocumentBuilder()
    .setTitle('راهنمای وب سرویس کوتاه کننده لینک')
    .setVersion('نسخه توسعه')
    .setDescription(description)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'راهنمای وب سرویس کوتاه کننده لینک',
    customCss: swaggerCustomCss,
    swaggerOptions: {
      docExpansion: 'none',
      layout: 'BaseLayout',
      tagsSorter: 'alpha',
      operationsSorter: (a, b) => {
        const sortArray = ['get', 'post', 'put', 'patch', 'delete'];
        const aMethod = a._root.entries.find(e => e[0] === 'method')[1];
        const bMethod = b._root.entries.find(e => e[0] === 'method')[1];
        return sortArray.indexOf(aMethod) <= sortArray.indexOf(bMethod) ? -1 : 1;
      },
    },
  });


  await app.listen(process.env.PORT || 3000);
}

bootstrap();
