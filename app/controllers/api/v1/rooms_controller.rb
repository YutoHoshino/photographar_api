class Api::V1::RoomsController < ApplicationController

  def index
    rooms = current_user.rooms.map do |room|
      {
        room: {id: room.id, created_at: room.created_at, updated_at: room.updated_time },
        other_user: room.users.other_target_users(current_user)[0],
        last_message: room.last_chat_content
      }
    end
    
    render json: { rooms: rooms.sort_by{|room|room[:room][:updated_at]}.reverse }, status: :ok
  end

  def create
    target_room_id = UserRoom.target_room_id(current_user.id, params[:UserId].to_i)
    if target_room_id.nil?
      room = Room.create
      UserRoom.create(user_id: params[:UserId].to_i, room_id: room.id)
      UserRoom.create(user_id: current_user.id, room_id: room.id)
    else
      room = Room.find_by(id: target_room_id)
    end

    partner = room.user_rooms.where.not(user_id:current_user.id).first.user

    render json: { chats: room.chats.as_json(include: [:user]), partner: partner}
  end

end
