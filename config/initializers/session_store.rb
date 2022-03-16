if Rails.env === 'production'
  Rails.application.config.session_store :redis_store, {
    servers: ENV['REDIS_URL'], 
    expire_after: 1.day
  }
else
  Rails.application.config.session_store :cookie_store, key: '_auth-app-api'
end