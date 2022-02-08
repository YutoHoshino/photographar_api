Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      post    '/signup',      to: 'users#signup'
      post    '/signin',      to: 'sessions#signin'
      delete  '/signout',     to: 'sessions#signout'
      get     '/logged',      to: 'sessions#sign_in?'

      get     '/posts',       to: 'posts#index'
      post    '/post',        to: 'posts#create'


    end
  end
end
