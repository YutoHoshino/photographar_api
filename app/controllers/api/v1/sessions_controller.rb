class Api::V1::SessionsController < ApplicationController
  skip_before_action :current_user, only: [:signin]
  
  def signin
    user = User.find_by(email: session_params[:email])
    if user && user.authenticate(session_params[:password])
      login(user)
      render json: { user: @current_user }, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  def signout
    reset_session
    render json: {}, status: :ok
  end

  def sign_in?
    if @current_user
      render json: { user: current_user.as_json(include: [:followings, :followers]) }, status: :ok
    else
      render json: {}, status: :no_content
    end
  end

  private
    def session_params
      params.require(:user).permit(:email, :password)
    end
end
