class Api::V1::SessionsController < ApplicationController
  skip_before_action :current_user, only: [:login]
  before_action :set_user, only: [:create]

  def login
    if @user.authenticate(session_params[:password])
      sign_in(@user)
      render json: { user: @current_user}, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end


  def logout
    sign_out
    render json: {}, status: :no_content
  end


  def logged
    if @current_user
        render json: { user: @current_user }, status: :ok
    else
        render json: {}, status: :no_content
    end
  end


  private

    def set_user
      @user = User.find_by!(email: session_params[:email])
    rescue 
      render json: {}, status: :not_acceptable
    end

    # 許可するパラメータ
    def session_params
      params.require(:session).permit(:email, :password)
    end
end
