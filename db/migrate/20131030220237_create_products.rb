class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products, :id => false do |t|
      t.string :id, :limit => 36, :primary => true
      t.string :version
      t.string :domain
      t.string :username
      t.string :code
      t.string :description
      t.string :units
      t.string :barcode
      t.string :brand_id
      t.string :category_id
      t.decimal :cost, :precision => 10, :scale => 2, default: 0
      t.decimal :price, :precision => 10, :scale => 2, default: 0

      t.timestamps
    end
  end
end
