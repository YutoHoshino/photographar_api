if Rails.env === 'production'
  Rails.application.config.session_store :redis_store, {
    servers: ENV['REDIS_TLS_URL'],
    expire_after: 90.minutes # 保存期間
  }
else
  Rails.application.config.session_store :cookie_store, key: '_auth-app-api'
end