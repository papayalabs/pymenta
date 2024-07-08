# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2019_02_13_093216) do
  create_table "accounts", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "code"
    t.string "name"
    t.string "type"
    t.boolean "debit_credit"
    t.decimal "balance", precision: 10, scale: 2, default: "0.0"
    t.decimal "balance_b", precision: 10, scale: 2, default: "0.0"
    t.string "id_number1"
    t.string "id_number2"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "country"
    t.string "zip_code"
    t.string "telephone"
    t.string "fax"
    t.string "email"
    t.string "web"
    t.string "contact"
    t.string "observations"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "active_admin_comments", charset: "utf8mb3", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_id", null: false
    t.string "resource_type", null: false
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "brands", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "code"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "code"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "name"
    t.string "address"
    t.string "id_number1"
    t.string "id_number2"
    t.string "city"
    t.string "state"
    t.string "country"
    t.string "zip_code"
    t.string "telephone"
    t.string "fax"
    t.string "email"
    t.string "web"
    t.string "contact"
    t.date "initial_cycle"
    t.date "final_cycle"
    t.string "plan"
    t.integer "counter"
    t.integer "limit"
    t.string "note"
    t.string "date_format"
    t.string "unit"
    t.string "separator"
    t.string "delimiter"
    t.string "id_number1_label"
    t.string "logo_file_name"
    t.string "logo_content_type"
    t.integer "logo_file_size"
    t.datetime "logo_updated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "document_lines", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "code"
    t.string "document_number"
    t.string "type"
    t.string "description"
    t.date "date"
    t.decimal "in_quantity", precision: 10, scale: 2, default: "0.0"
    t.decimal "out_quantity", precision: 10, scale: 2, default: "0.0"
    t.decimal "price", precision: 10, scale: 2, default: "0.0"
    t.decimal "total", precision: 10, scale: 2, default: "0.0"
    t.integer "year"
    t.integer "month"
    t.string "header_id"
    t.string "product_id"
    t.string "warehouse_id"
    t.string "stock_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "document_types", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "description"
    t.string "account_type"
    t.string "stock_type"
    t.boolean "stock"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documents", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "code"
    t.string "document_number"
    t.string "type"
    t.string "due"
    t.string "status"
    t.string "details"
    t.date "date"
    t.date "expire_date"
    t.decimal "discount_percentage", precision: 10, scale: 2, default: "0.0"
    t.decimal "discount_total", precision: 10, scale: 2, default: "0.0"
    t.decimal "sub_total", precision: 10, scale: 2, default: "0.0"
    t.decimal "tax", precision: 10, scale: 2, default: "0.0"
    t.decimal "tax_total", precision: 10, scale: 2, default: "0.0"
    t.decimal "total", precision: 10, scale: 2, default: "0.0"
    t.decimal "paid_left", precision: 10, scale: 2, default: "0.0"
    t.decimal "paid", precision: 10, scale: 2, default: "0.0"
    t.integer "year"
    t.integer "month"
    t.string "document_type_id"
    t.string "account_id"
    t.string "warehouse_id"
    t.string "payments_document_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "retention", precision: 10, scale: 2, default: "0.0"
    t.decimal "retention_total", precision: 10, scale: 2, default: "0.0"
  end

  create_table "payment_types", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "code"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payments", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "payment_type_id"
    t.string "payments_document_id"
    t.string "notes"
    t.date "date"
    t.decimal "amount", precision: 10, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payments_documents", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "type"
    t.string "number"
    t.string "name"
    t.string "status"
    t.date "date"
    t.decimal "percentage", precision: 10
    t.decimal "total", precision: 10, scale: 2, default: "0.0"
    t.decimal "paid", precision: 10, scale: 2, default: "0.0"
    t.decimal "paid_left", precision: 10, scale: 2, default: "0.0"
    t.integer "year"
    t.integer "month"
    t.string "document_type_id"
    t.string "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.string "code"
    t.string "description"
    t.string "units"
    t.string "barcode"
    t.string "brand_id"
    t.string "category_id"
    t.decimal "cost", precision: 10, scale: 2, default: "0.0"
    t.decimal "price", precision: 10, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", charset: "utf8mb3", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "service_payments", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "amount"
    t.string "description"
    t.string "payment_id"
    t.string "state"
    t.string "period"
    t.string "method"
    t.string "domain"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stocks", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "version"
    t.string "domain"
    t.string "username"
    t.decimal "in_quantity", precision: 10
    t.decimal "out_quantity", precision: 10
    t.decimal "stock", precision: 10
    t.string "product_id"
    t.string "warehouse_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "id", limit: 36
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "username", default: "", null: false
    t.string "company_name", default: "", null: false
    t.string "domain", default: "", null: false
    t.string "name", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_roles", id: false, charset: "utf8mb3", force: :cascade do |t|
    t.string "user_id"
    t.integer "role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
  end

end
