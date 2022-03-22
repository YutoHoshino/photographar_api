class ApplicationController < ActionController::API
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
    p "ここにsessionのオプションを表示"
    p session.options
    p "ここにsessionを表示"
    p session[:user_remember_token]
    p "ここにクラスを表示"
    p session.class
    p "ここにkeysを表示"
    p session.keys
    remember_token = User.encrypt(session[:user_remember_token])
    @current_user ||= User.find_by(remember_token: remember_token)
  end

  def time_wait
    sleep 1
  end

end
