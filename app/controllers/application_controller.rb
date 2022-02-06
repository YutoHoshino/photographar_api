class ApplicationController < ActionController::API
  before_action :current_user

  # ログイン確認
  def current_user
    remember_token = User.encrypt(cookies[:user_remember_token]) rescue nil
    @current_user ||= User.find_by(remember_token: remember_token)
  end

  # サインイン
  def sign_in(user)
    binding.pry
    remember_token = User.new_remember_token
    cookies.permanent[:user_remember_token] = remember_token
    user.update!(remember_token: User.encrypt(remember_token))
    @current_user = user
  end

  # サインアウト
  def sign_out
    @current_user = nil
    cookies.delete(:user_remember_token)
  end

end
