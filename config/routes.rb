Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      post    '/signup',      to: 'users#signup'
      post    '/signin',      to: 'sessions#signin'
      delete  '/signout',     to: 'sessions#signout'
      get     '/logged',      to: 'sessions#sign_in?'

      resources :users, only:[:index, :update, :show] do
        resource :relationships, only: [:create, :destroy]
        get '/followers',   to: 'relationships#followers'
        get '/followings', to: 'relationships#followings'
      end

      resources :posts do
        resources :likes, only: [:create, :destroy]
        resources :comments, only: [:create, :destroy]
      end

    end
  end
end
