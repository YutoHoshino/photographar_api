class Room < ApplicationRecord
  has_many :user_rooms
  has_many :users, through: :user_rooms
  has_many :chats

  def last_chat_content
    if chats.blank?
      "メッセージがありません"
    else
      chats.last.message
    end
  end

  def updated_time
    if chats.blank?
      self.updated_at
    else
      chats.last.updated_at
    end
  end

end
