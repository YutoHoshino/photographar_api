class Api::V1::ChatsController < ApplicationController

  def create
    chat = Chat.new(user_id: current_user.id, room_id: params[:room_id], message: params[:message])
    if chat.save
      render json: {}, status: :created
    else
      render json: {}, status: :internal_server_error
    end

  end
end
