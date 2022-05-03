const request = require('supertest');

let server;
jest.setTimeout(20000);

describe('/api/v1/records', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../src/index');
  });
  afterEach(() => {
    server.close();
  });

  describe('POST /', () => {
    it('should return 200 if no body parameter is passed', async () => {
      const res = await request(server).post('/api/v1/records');

      expect(res.status).toBe(200);
      expect(res.body.code).toBe(0);
    });

    it('should return 200 if all body parameters are passed ', async () => {
      const startDate = '2016-01-26';
      const endDate = '2018-02-02';
      const minCount = 2700;
      const maxCount = 3000;
      const body = {
        startDate, endDate, minCount, maxCount,
      };

      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(200);
      expect(res.body.code).toBe(0);
    });

    it('should return 200 if `startDate` is missing', async () => {
      const endDate = '2018-02-02';
      const minCount = 2700;
      const maxCount = 3000;
      const body = { endDate, minCount, maxCount };

      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(200);
      expect(res.body.code).toBe(0);
    });

    it('should return 400 if `startDate`format is wrong', async () => {
      const startDate = 'test';
      const endDate = '2018-02-02';
      const minCount = 2700;
      const maxCount = 3000;
      const body = {
        startDate, endDate, minCount, maxCount,
      };

      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(400);
      expect(res.body.code).toBe(400);
      expect(res.body).toHaveProperty('msg');
    });

    it('should return 200 if `endDate` is missing', async () => {
      const startDate = '2016-01-26';
      const minCount = 2700;
      const maxCount = 3000;
      const body = { startDate, minCount, maxCount };

      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(200);
    });
    it('should return 400 if `endDate` format is wrong', async () => {
      const startDate = '2016-01-26';
      const endDate = 'test';
      const minCount = 2700;
      const maxCount = 3000;
      const body = {
        startDate, endDate, minCount, maxCount,
      };

      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(400);
      expect(res.body.code).toBe(400);
      expect(res.body).toHaveProperty('msg');
    });
    it('should return 200 if `minCount` is missing', async () => {
      const startDate = '2016-01-26';
      const endDate = '2018-02-02';
      const maxCount = 3000;
      const body = { startDate, endDate, maxCount };

      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(200);
      expect(res.body.code).toBe(0);
    });
    it('should return 400 if `minCount` format is wrong', async () => {
      const startDate = '2016-01-26';
      const endDate = '2018-02-02';
      const minCount = 'test';
      const maxCount = 3000;
      const body = {
        startDate, endDate, minCount, maxCount,
      };

      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(400);
      expect(res.body.code).toBe(400);
      expect(res.body).toHaveProperty('msg');
    });

    it('should return 200 if `maxCount` is missing', async () => {
      const startDate = '2016-01-26';
      const endDate = '2018-02-02';
      const minCount = 2700;
      const body = { startDate, endDate, minCount };

      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(200);
      expect(res.body.code).toBe(0);
    });

    it('should return 400 if `maxCount` format is wrong', async () => {
      const startDate = '2016-01-26';
      const endDate = '2018-02-02';
      const minCount = 2700;
      const maxCount = 'test';

      const body = {
        startDate, endDate, minCount, maxCount,
      };
      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(400);
    });

    it('should return an empty records array if the `startDate` is greater than the `endDate`', async () => {
      const endDate = '2016-01-26';
      const startDate = '2018-02-02';
      const minCount = 2700;
      const maxCount = 3000;

      const body = {
        startDate, endDate, minCount, maxCount,
      };
      const res = await request(server).post('/api/v1/records').send(body);

      expect(res.status).toBe(200);
      expect(res.body.code).toBe(0);
      expect(res.body).toHaveProperty('records');
      expect(res.body.records.length).toBe(0);
    });
  });
});
