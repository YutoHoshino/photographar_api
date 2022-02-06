class Api::V1::SessionsController < ApplicationController
  
  def login
    @user = User.find_by(email: session_params[:email])
    if @user && @user.authenticate(session_params[:password])
      login!
      render json: { user: @user }, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  def logout
    reset_session
    render json: {}, status: :no_content
  end

  def logged
    if @current_user.blank?
        render json: { user: current_user }, status: :ok
    else
        render json: {}, status: :no_content
    end
  end

  private
    def session_params
      params.require(:user).permit(:email, :password)
    end
end
