module.exports = {
  apps: [
    {
      script: 'npx',
      args: 'nest start',
      log_date_format: 'YYYY-MM-DD HH:mm',
      env: {
        NODE_ENV: 'prod',
      },
      env_prod: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
