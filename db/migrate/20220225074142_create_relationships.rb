class CreateRelationships < ActiveRecord::Migration[6.0]
  def change
    create_table :relationships do |t|
      t.references :user, foreign_key: true,                    null: false, comment: "ユーザーID"
      t.references :follow, foreign_key: { to_table: :users },  null: false, comment: "フォローID"
      t.timestamps
      t.index [:user_id, :follow_id], unique: true
    end
  end
end
