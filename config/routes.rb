Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      post    '/signup',      to: 'users#signup'
      post    '/login',       to: 'sessions#login'
      delete  '/logout',      to: 'sessions#logout'
      get     '/logged',  to: 'sessions#logged'


    end
  end
end
