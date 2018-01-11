module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'website',
      script: 'src/index.js',
      env: {
        NODE_ENV: 'development',
        BABEL_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }/*,

    // Second application
    {
      name      : 'api',
      script    : 'api/index.js'
    }*/
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'node',
      host: 'localhost',
      ref: 'origin/master',
      repo: 'git://github.com/ryanabragg/VanguardLARP.git',
      path: '~/vanguard-larp',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
