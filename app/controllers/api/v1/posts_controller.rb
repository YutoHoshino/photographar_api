class Api::V1::PostsController < ApplicationController

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
