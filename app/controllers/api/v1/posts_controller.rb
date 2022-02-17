class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :destroy]

  def index
    posts = Post.alive_records.includes(:photos, :user, :likes).order('created_at DESC')
    post_datas = posts.map {|post| { post: post, photos: post.photos, user: post.user, likes: post.likes } }
    render json: { posts: post_datas }, status: :ok
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: { post: post }, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  def show
    post = { post: @post, photos: @post.photos, user: @post.user }
    render json: { post: post }, status: :ok
  end

  def destroy
    if @post.update!(deleted: "deleted")
      render json: {}, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

  private
    def post_params
      params.require(:post).permit(:caption, photos_attributes: [:image]).merge(user_id: current_user.id)
    end

    def set_post
      @post = Post.find_by(id: params[:id]) rescue nil
      render json: {}, status: :internal_server_error if @post.nil?
    end
end
