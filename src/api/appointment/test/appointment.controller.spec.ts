import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from '../appointment.controller';
import moment = require("moment");

describe('Comments Controller', () => {
  let controller: AppointmentsController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("Errors", function () {
    it("should't create an appointment in the past", async () => {
      const { success, message, data } = await controller.create({ firstName: 'naeem', lastName: "hassan", scheduleId: 1, email: "naeem@gmail.com", slotTime: new Date('2022-10-20T17:38:52.316Z') });

      expect(success).toEqual(false);
      expect(message).toEqual(`Invalid startDate. Appointment can't created in the past`);
      expect(data).toEqual(null);

    });

    it(`should book the appointments in 7 days from now `, async () => {
      const dateInPast = moment().add(8, 'day');

      const { success, message, data } = await controller.create({ firstName: 'naeem', lastName: "hassan", scheduleId: 1, email: "naeem@gmail.com", slotTime: new Date(dateInPast.format("LLL")) });

      expect(success).toEqual(false);
      expect(message).toEqual(`Appointments can be scheduled within 7 days from now.`);
      expect(data).toEqual(null);

    });

    it('should not create booking in closing hours ', async () => {

      const time = moment().set('hour', 23).format("LLL");

      const { success, data } = await controller.create({ firstName: 'naeem', lastName: "hassan", scheduleId: 1, email: "naeem@gmail.com", slotTime: new Date(time) });

      expect(success).toEqual(false);
      expect(data).toEqual(null);
    });

    it('should not create booking in already booked slots ', async () => {
      await controller.create({ firstName: 'naeem', lastName: "hassan", scheduleId: 1, email: "naeem@gmail.com", slotTime: new Date() });

      const { success, data } = await controller.create({ firstName: 'naeem', lastName: "hassan", scheduleId: 1, email: "naeem@gmail.com", slotTime: new Date() });

      expect(success).toEqual(false);
      expect(data).toEqual(null);
    });

    it('The slot must be in opening hours of schedule. ', async () => {
      const time = moment().set('hour', 23).format("LLL");

      const { success, data } = await controller.create({ firstName: 'naeem', lastName: "hassan", scheduleId: 1, email: "naeem@gmail.com", slotTime: new Date(time) });

      expect(success).toEqual(false);
      expect(data).toEqual(null);
    });



  })


  it('should create an appointment', async () => {
    const { success, message, data } = await controller.create({ firstName: 'naeem', lastName: "hassan", scheduleId: 1, email: "naeem@gmail.com", slotTime: new Date() });

    expect(data).toBeDefined;
    expect(message).toEqual('Appointment created successfully.',)
    expect(success).toEqual(true)

  });

  it('should fetch all details ', async () => {
    const { data, success } = await controller.get(1);
    expect(data).toBeDefined;
    expect(success).toEqual(true)

  });

});
