import app from './index';
import supertest from 'supertest';
const request = supertest(app);

describe('General endpoint', () => {
  it('should return the index.html file', async () => {
    // const response = await request.get('/');
    // print(response);
    // expect(response.status).toBe(200);
    // expect(response.type).toBe('text/html');
    // expect(response.text).toContain('index.html');
  });
});

describe('API endpoint', () => {
  it('should return the index.html file', async () => {
    // const response = await request.get('/api');
    // expect(response.status).toBe(200);
    // expect(response.type).toBe('text/html');
    // expect(response.text).toContain('index.html');
  });
});