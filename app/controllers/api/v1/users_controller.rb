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
  
  def index
    users = User.unfollower(current_user).sample(10)
    render json: {users: users}, status: :ok
  end

  def show
    like_posts = Post.includes(:photos).find(Like.where(user_id: @user.id).pluck(:post_id))
    user = {
      user: @user, 
      followings: @user.followings, 
      followers: @user.followers, 
      posts: @user.posts.includes(:photos).alive_records.map{|post|{post: post, photos:post.photos}},
      like_posts: like_posts.map{|like_post|{post: like_post, photos: like_post.photos}}
    }
    render json: { user: user }, status: :ok
  end

  def update
    if @user.update(user_params)
      render json: { user: @user }, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  def search
    users = User.search(params[:keyword])
    if users.present?
      render json: { users: users }, status: :ok
    else
      render json: { users: [] }, status: :no_content
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