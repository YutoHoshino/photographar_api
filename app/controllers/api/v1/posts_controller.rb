class Api::V1::PostsController < ApplicationController

  def index
    posts = Post.alive_records.includes(:photos, :user).order('created_at DESC')
    post_datas = posts.map {|post| { post: post, photos: post.photos, user: post.user} }
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

  
  private
    def post_params
      params.require(:post).permit(:caption, photos_attributes: [:image]).merge(user_id: current_user.id)
    end
end
