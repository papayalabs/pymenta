class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments, :id => false do |t|
      t.string :id, :limit => 36, :primary => true
      t.string :version
      t.string :domain
      t.string :username
      t.string :payment_type_id
      t.string :payments_document_id
      t.string :notes
      t.date :date
      t.decimal :amount, :precision => 10, :scale => 2, default: 0

      t.timestamps
    end
  end
end
