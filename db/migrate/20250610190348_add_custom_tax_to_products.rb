class AddCustomTaxToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :custom_tax, :decimal
  end
end
