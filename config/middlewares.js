module.exports = ({ env }) => ({
  settings: {
    cors: {
      enabled: true,
      origin: env('CORS_ORIGIN', '*'), // ใช้ env เพื่อกำหนดค่า origin ได้แบบ dynamic
    },
  },
});

module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
