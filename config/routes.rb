Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      post    '/signup',      to: 'users#signup'
      resources :users, only:[:update, :show]

      post    '/signin',      to: 'sessions#signin'
      delete  '/signout',     to: 'sessions#signout'
      get     '/logged',      to: 'sessions#sign_in?'

      resources :posts do
        
        resources :likes, only: [:create, :destroy]
        resources :comments, only: [:create, :destroy]
      end

    end
  end
end
