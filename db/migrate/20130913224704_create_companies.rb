class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies, :id => false do |t|
      t.string :id, :limit => 36, :primary => true
      t.string :name
      t.string :address
      t.string :id_number1
      t.string :id_number2
      t.string :city
      t.string :state
      t.string :country
      t.string :zip_code
      t.string :telephone
      t.string :fax
      t.string :email
      t.string :web
      t.string :contact

      t.date :initial_cycle
      t.date :final_cycle
      t.string :plan
      t.integer :counter
      t.integer :limit
      t.string :note

      t.string :date_format
      t.string :unit
      t.string :separator
      t.string :delimiter
      
      t.string :id_number1_label

      #Logo attachment
      t.string :logo_file_name
      t.string :logo_content_type
      t.integer :logo_file_size
      t.datetime :logo_updated_at

      t.timestamps
    end
  end
end
