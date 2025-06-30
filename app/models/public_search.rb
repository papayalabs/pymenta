class PublicSearch < ApplicationRecord
  self.primary_key = 'id'  
  belongs_to :company, :foreign_key => 'domain'
end
