class AccountReport < PdfReport
  TABLE_WIDTHS = [60, 210, 60, 70, 70, 70]
  RAILS_ROOT = Rails.root

  def initialize(account,user)
    super()
    @account = account
    @user = user
    logo
    company = @user.company
    #text ""
    #text company.id, :style => :bold
    #text company.name, :size => 10
    text account.type.upcase, :style => :bold
    move_down 10
    text "NOMBRE: " + account.name, :style => :bold
    move_down 10
    text "RIF: " + account.id_number1, :size => 10
    move_down 10
    text "DIRECCION: " + (account.address.nil? ? '' : account.address) + ", " + (account.city.nil? ? '' : account.city) + ", " + (account.state.nil? ? '' : account.state) + ", " + (account.country.nil? ? '' : account.country), :size => 10
    move_down 10
    text "TELEFONO: " + (account.telephone.nil? ? '' : account.telephone), :size => 10
    move_down 10
    text "EMAIL: " + (account.email.nil? ? '' : account.email), :size => 10
    move_down 10
    text "CONTACTO: " + (account.contact.nil? ? '' : account.contact), :style => :bold
  end  
end