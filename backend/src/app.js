import express from 'express';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'humancare-backend',
      timestamp: new Date().toISOString(),
    });
  });

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  // Express identifies error handlers by their four-argument signature.
  app.use((err, _req, res, _next) => {
    const status = err.status >= 400 && err.status < 500 ? err.status : 500;
    res.status(status).json({
      error: status === 500 ? 'Internal Server Error' : 'Bad Request',
    });
  });

  return app;
}

export default createApp();
