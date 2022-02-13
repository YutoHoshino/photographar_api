Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      post    '/signup',      to: 'users#signup'
      resources :user, only:[:update]

      post    '/signin',      to: 'sessions#signin'
      delete  '/signout',     to: 'sessions#signout'
      get     '/logged',      to: 'sessions#sign_in?'

      resources :posts
    end
  end
end
