class Document < ApplicationRecord
  self.primary_key = 'id'  
  self.inheritance_column = nil

  belongs_to :company, :foreign_key => 'domain'
  belongs_to :document_type
  belongs_to :account
  belongs_to :warehouse
  belongs_to :payments_document, optional: true

  has_many :document_lines, :foreign_key => 'header_id'
  
  # Add Paperclip attachment
  has_attached_file :attach, 
                    styles: { medium: "300x300>", thumb: "100x100>" },
                    default_url: "/images/:style/missing.png"
  validates_attachment_content_type :attach, content_type: [
    "image/jpeg", 
    "image/gif", 
    "image/png", 
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ]

  before_validation :ensure_counter_is_not_greater_than_limit, :on => :create
  before_create :increment_counter, :default_values 
  before_save :save_type_description, :save_child_type 
  
  def default_values
      self.status ||= 'NOT_PAID'
  end

  def save_type_description
    self.type = self.document_type.description
  end

  def save_child_type
    Document.transaction do
      document_lines.each do |child|
        child.type = self.type 
        child.save
      end
    end
  end

  def full_name
    "#{type} ------ #{document_number} ------- #{account.name} -------- #{date} ---------- #{sub_total}---------- #{tax_total}---------- #{total}"
  end
  
  private
    def ensure_counter_is_not_greater_than_limit
      if self.company.counter >= self.company.limit
        errors[:base] << "Ha alcanzado el limite de su plan. Por favor actualice su plan para seguir usando la aplicacion"
      end
    end

    def increment_counter
      self.company.counter = self.company.counter + 1
      self.company.save
    end
end
