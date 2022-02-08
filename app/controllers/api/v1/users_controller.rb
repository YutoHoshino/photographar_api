class Api::V1::UsersController < ApplicationController
  skip_before_action :current_user, only: [:signup]

  def signup
    user = User.new(user_params)
    if user.save
      login(user)
      render json: { user: @current_user }, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

end