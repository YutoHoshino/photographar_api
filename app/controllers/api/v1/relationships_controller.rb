class Api::V1::RelationshipsController < ApplicationController

  def create
    relationship = Relationship.new(follow_id: params[:user_id], user_id: current_user.id)
    if relationship.save
        render json: {}, status: :created
    else
        render json: {}, status: :no_content
    end
  end

  def destroy
    relationship = Relationship.find_by(follow_id: params[:user_id], user_id: current_user.id)
    if relationship.destroy
        render json: {}, status: :ok
    else
        render json: {}, status: :no_content
    end
  end
end
