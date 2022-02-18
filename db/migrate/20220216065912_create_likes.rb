class CreateLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :likes do |t|
      t.references :post, foreign_key: true, null: false, comment: "投稿ID"
      t.references :user, foreign_key: true, null: false, comment: "ユーザーID"
      t.timestamps
    end
  end
end
