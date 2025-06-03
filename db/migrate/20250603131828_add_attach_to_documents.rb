class AddAttachToDocuments < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :attach_file_name, :string
    add_column :documents, :attach_content_type, :string
    add_column :documents, :attach_file_size, :integer
    add_column :documents, :attach_updated_at, :datetime
  end
end
