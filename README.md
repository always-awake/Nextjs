## NestJs로 REST API 만들기

### Nest Js

> https://www.npmjs.com/package/@nestjs/core

- nodes.js 프레임워크 (node.js에 백엔드를 구성할 수 있도록 함)
- Express/Fastify 위에서 동작
- 다른 Node.js 의 프레임워크에는 없는 구조/기능을 갖고 있다.
  - spring, django 프레임워크처럼 해당 프레임워크를 사용한다면 따라야하는 규칙과 구조(controller, views 등등)를 갖고 있다.
    - (규칙/구조 학습 비용은 필요하지만) 백엔드 구성 시간을 단축
    - 규모가 크고 안정적인 서버 구축(for production)이 필요할 때 사용될 수 있음
  - 객체지향 프로그래밍, 함수형 프로그램, 함수 반응형 프로그래밍도 가능
- 타입스크립트 기반 프레임워크

### main.ts

- NestJs 어플리케이션은 `main.ts`에서 시작한다.
- NestJs에는 main.ts가 항상 존재해야한다.
  - 파일을 삭제하거나, 이름을 수정하면 안됨

```js
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### 모듈 (module)

- 특정 모듈들의 루트 모듈
- NestJs 어플리케이션의 일부
  - django의 경우 `apps`과 같은 개념
  - 예) 인스타그램 어플리케이션 - photos 모듈, videos 모듈...

### 컨트롤러 (controller)

- express.js의 `controller/router`와 같은 개념
- 데코레이터 사용하면, 라우터를 직접 세팅하지 않아도 된다.
  - @Post, @Get 등

### 서비스 (service)

- 비즈니스 로직을 실행하는 역할
