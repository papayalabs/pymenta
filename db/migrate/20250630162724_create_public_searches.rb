class CreatePublicSearches < ActiveRecord::Migration[7.0]
  def change
    create_table :public_searches, :id => false do |t|
      t.string :id, :limit => 36, :primary => true
      t.string :version
      t.string :domain
      t.date :start_at
      t.date :end_at
      t.string :name
      t.string :status
      t.string :document_type
      t.string :token

      t.timestamps
    end
    add_index :public_searches, :token
  end
end
