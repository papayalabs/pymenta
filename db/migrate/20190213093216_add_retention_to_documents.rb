class AddRetentionToDocuments < ActiveRecord::Migration[5.0]
  def change
    add_column :documents, :retention, :decimal, :precision => 10, :scale => 2, default: 0
    add_column :documents, :retention_total, :decimal, :precision => 10, :scale => 2, default: 0
  end
end
