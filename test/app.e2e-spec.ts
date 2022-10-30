import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentModule } from 'src/api/appointment/appointment.module';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
const assert = require('assert');

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AppointmentModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/appointments/1')
      .send({ firstName: 'naeem', lastName: "hassan", scheduleId: 1, email: "naeem@gmail.com", slotTime: new Date() })
      .expect(200)
      .then(response => {
        expect(response.body.success).toEqual(true)
        expect(response.body.message).toBeDefined()
        expect(response.body.data).toBeDefined()
      });

  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/appointments/1')
      .expect(200)
      .then(response => {
        expect(response.body.success).toEqual(true)
        expect(response.body.message).toBeDefined()
        expect(response.body.data).toBeDefined()
      });
  });



});
