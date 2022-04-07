class Api::V1::SearchsController < ApplicationController

  def search
    users = User.search(params[:keyword]).where.not(id: current_user.id)
    if users.present?
      render json: { users: users }, status: :ok
    else
      render json: { users: [] }, status: :no_content
    end
  end

end
