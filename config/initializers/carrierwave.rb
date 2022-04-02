CarrierWave.configure do |config|
  if Rails.env === 'production'
    config.asset_host = "http://localhost:3001"
  else
    config.asset_host = "https://photographar-api.herokuapp.com"
  end
  config.storage = :file
  config.cache_storage = :file
end