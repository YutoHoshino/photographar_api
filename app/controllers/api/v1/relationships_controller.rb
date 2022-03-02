class Api::V1::RelationshipsController < ApplicationController
  before_action :set_user, only: [:follower, :followings]

  def followers
    render json: {followers: @user.follower}, status: :ok
  end

  def followings
    render json: {followings: @user.followings}, status: :ok
  end

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

  private
    def set_user
      @user = User.find_by(id: params[:user_id])
    end
end
