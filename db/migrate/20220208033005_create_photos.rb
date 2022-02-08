class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.string     :image,                                comment: "画像"
      t.references :post, foreign_key: true, null: false, comment: "投稿ID"
      t.timestamps
    end
  end
end
