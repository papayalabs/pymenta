class Stock < ActiveRecord::Base
  set_primary_key "id"
  include UUIDHelper
  attr_accessible :domain, :id, :in_quantity, :out_quantity, :stock, :username, :version

  belongs_to :company, :foreign_key => 'domain'
  belongs_to :product
  belongs_to :warehouse
end
