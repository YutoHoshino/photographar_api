class CreateLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :likes do |t|
      t.integer "user_id", null: false, comment: "ユーザーID"
      t.integer "post_id", null: false, comment: "投稿ID"
      t.timestamps
    end
  end
end
