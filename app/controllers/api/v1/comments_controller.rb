class Api::V1::CommentsController < ApplicationController
  
  def create
    comment = Comment.new(user_id: current_user.id, post_id: params[:post_id], text: params[:comment])
    if comment.save
      render json: { comment: comment, user: comment.user }, status: :created
    else
      render json: {}, status: :internal_server_error
    end

  end

  def destroy
  end

end
