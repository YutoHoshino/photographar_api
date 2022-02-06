class User < ApplicationRecord

  has_secure_password validations: true
  
  mount_uploader :image, ImageUploader

  # メールアドレスのフォーマット
  EMAIL_FORMAT= /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name,  presence: true
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

  end

end
