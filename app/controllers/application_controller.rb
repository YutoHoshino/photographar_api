class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  before_action :current_user

  def login(user)
    remember_token = User.new_remember_token
    session[:user_remember_token] = remember_token
    p "loginここにsessionを表示"
    p session[:user_remember_token]
    user.update!(remember_token: User.encrypt(remember_token))
    @current_user = user
  end

  def current_user
    p "ここにsessionを表示"
    p session[:user_remember_token]
    remember_token = User.encrypt(session[:user_remember_token])
    @current_user ||= User.find_by(remember_token: remember_token)
  end

  def time_wait
    sleep 1
  end

end
