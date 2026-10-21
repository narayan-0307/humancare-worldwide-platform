import assert from 'node:assert/strict';
import { test } from 'node:test';

import request from 'supertest';

import { createApp } from '../src/app.js';

test('GET /health returns ok status', async () => {
  const res = await request(createApp()).get('/health');

  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /application\/json/);
  assert.equal(res.body.status, 'ok');
  assert.equal(res.body.service, 'humancare-backend');
  assert.ok(!Number.isNaN(Date.parse(res.body.timestamp)));
});

test('unknown routes return a JSON 404', async () => {
  const res = await request(createApp()).get('/does-not-exist');

  assert.equal(res.status, 404);
  assert.match(res.headers['content-type'], /application\/json/);
  assert.deepEqual(res.body, { error: 'Not Found' });
});

test('malformed JSON returns a safe 400 without internals', async () => {
  const res = await request(createApp())
    .post('/health')
    .set('Content-Type', 'application/json')
    .send('{bad');

  assert.equal(res.status, 400);
  assert.deepEqual(res.body, { error: 'Bad Request' });
});
