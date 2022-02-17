class Api::V1::LikesController < ApplicationController

  def create
    line = Like.new(user_id: current_user.id, post_id: params[:post_id])
    if line.save
      render json: {}, status: :created
    else
      render json: {}, status: :internal_server_error
    end
  end

  def destroy
    line = Like.find_by(user_id: current_user.id, post_id: params[:post_id])
    if line.destroy
      render json: {}, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

end
