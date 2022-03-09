class UserRoom < ApplicationRecord
  belongs_to :user
  belongs_to :room
  

  class << self

    def target_room_id(current_user_id, other_user_id)
      self.where(user_id: [current_user_id, other_user_id]).group_by(&:room_id).filter{|id, v| v.count > 1}.keys[0] rescue nil
    end

  end
end
