class User < ApplicationRecord

  has_secure_password validations: true
  
  mount_uploader :image, ImageUploader

  has_many :posts, dependent: :destroy
  has_many :likes
  has_many :comments

  has_many :relationships
  has_many :followings, through: :relationships, source: :follow
  has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id'
  has_many :followers, through: :reverse_of_relationships, source: :user

  # メールアドレスのフォーマット
  EMAIL_FORMAT= /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name,  presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: EMAIL_FORMAT }

  class << self

    # ランダムな値を作成する
    def new_remember_token
      SecureRandom.urlsafe_base64
    end

    # 暗号化するメソット
    def encrypt(token)
      Digest::SHA256.hexdigest(token.to_s)
    end

    # カレントユーザー以外のユーザー
    def other_target_users(user_id)
      where.not(id: user_id)
    end

    # フォローしていないユーザー
    def unfollower(user)
      where.not(id: user.followings.ids).where.not(id: user.id)
    end

    # 検索
    def search(keyword)
      where('name LIKE ?', '%' + keyword + '%')
    end

  end

end
