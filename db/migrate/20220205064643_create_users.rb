class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name,             null: false, comment: "名前"
      t.string :email,            null: false, comment: "メールアドレス"
      t.string :password_digest,  null: false, comment: "パスワード"
      t.string :remember_token,                comment: "トークン"
      t.string :image,                         comment: "プロフィール画像"
      t.timestamps
    end
  end
end
