class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string     :caption,  null: false,              comment: "キャンプション"
      t.references :user,     null: false,              comment: "ユーザーID"
      t.integer    :deleted,  null: false, default: 0,  comment: "削除フラグ(0=>未削除,1=>削除)"
      t.datetime   :deleted_at,                         comment: "削除日時"
      t.timestamps
    end
  end
end
