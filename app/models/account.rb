class Account < ApplicationRecord
  self.primary_key = 'id'
  validates :code, presence: true
  validates :name, presence: true
  validates :city, presence: true 
  
  belongs_to :company, :foreign_key => 'domain'
  
  has_many :documents
  
  def country_name
    #puts 'Country = '+self.country.to_s
    #country = ISO3166::Country[self.country]
    #country.translations[I18n.locale.to_s] || country.name
  end
end
