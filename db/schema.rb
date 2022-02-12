# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_08_033005) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "photos", force: :cascade do |t|
    t.string "image", null: false, comment: "画像"
    t.bigint "post_id", null: false, comment: "投稿ID"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_photos_on_post_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "caption", comment: "キャンプション"
    t.bigint "user_id", null: false, comment: "ユーザーID"
    t.integer "deleted", default: 0, null: false, comment: "削除フラグ(0=>未削除,1=>削除)"
    t.datetime "deleted_at", comment: "削除日時"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false, comment: "名前"
    t.string "email", null: false, comment: "メールアドレス"
    t.string "password_digest", null: false, comment: "パスワード"
    t.string "remember_token", comment: "トークン"
    t.string "image", comment: "プロフィール画像"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "photos", "posts"
end
