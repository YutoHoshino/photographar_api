class Api::V1::UsersController < ApplicationController
  skip_before_action :current_user, only: [:signup]
  before_action :set_user, only: [:show, :update]

  def signup
    user = User.new(user_params)
    if user.save
      login(user)
      render json: { user: @current_user }, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  def show
    user = {user: @user, posts: @user.posts.alive_records.map{|post|{post: post, photos:post.photos}}}
    render json: { user: user }, status: :ok
  end

  def update
    if @user.update(user_params)
      render json: {}, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end



  private
    def user_params
      params.require(:user).permit(:name, :email, :image, :password, :password_confirmation)
    end

    def set_user
      @user = User.find_by(name: params[:id]) rescue nil
      render json: {}, status: :internal_server_error if @user.nil?
    end

end