class Post < ApplicationRecord
  enum deleted: { alive: 0, deleted: 1 }

  belongs_to :user
  has_many   :photos, dependent: :destroy
  has_many   :likes, -> { order(created_at: :desc) }, dependent: :destroy
  has_many   :comments, dependent: :destroy

  accepts_nested_attributes_for :photos

  class << self

    def alive_records
      where(deleted: "alive")
    end
  
    def deleted_records
      where(deleted: "deleted")
    end
    
  end
end
