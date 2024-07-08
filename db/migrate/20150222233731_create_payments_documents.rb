class CreatePaymentsDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments_documents, :id => false do |t|
      t.string :id, :limit => 36, :primary => true
      t.string :version
      t.string :domain
      t.string :username
      t.string :type
      t.string :number
      t.string :name
      t.string :status
      t.date :date
      t.decimal :percentage
      t.decimal :total, :precision => 10, :scale => 2, default: 0
      t.decimal :paid, :precision => 10, :scale => 2, default: 0
      t.decimal :paid_left, :precision => 10, :scale => 2, default: 0
      t.integer :year
      t.integer :month
      
      t.string :document_type_id
      t.string :account_id
      
      t.timestamps
    end
  end
end
