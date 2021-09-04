class RegistrationsController < Devise::RegistrationsController
  before_action :authenticate_user!, :only => :token
  def new
    super
  end
  
  def create
      Company.transaction do
        @company = Company.new(:name => params[:user][:company_name])
        @company.plan = "GRATIS"
        @company.initial_cycle = Time.new
        @company.final_cycle = Time.now.months_since(1)
        @company.counter = 0
        @company.limit = Rails.application.config.limit
        @company.unit = "Bs."
        @company.separator = ","
        @company.delimiter = "."
        @company.date_format = "%d/%m/%Y"
        @company.id_number1_label = "ID"
      User.transaction do
        @user = User.new(user_params)
  #    if Guest.exists?(:email => params[:user][:email]) # Guest list stage
         if @company.save
           @user.domain = @company.id
           if @user.save
           # Notifier.welcome_email(@user).deliver
             @user.add_role :admin
             sign_in(resource_name, resource)
             defaults @company,@user   
             flash[:notice] = t("devise.sessions.signed_in")
             redirect_to documents_url
           else
             render :action => :new
             @company.delete
           end
         else
           @user.errors[:base] << @company.errors.full_messages
            render :action => :new
         end
  #     else # Guest list stage
  #       @user.errors[:base] << t("devise.registrations.not_in_guest_list") # Guest list stage
  #       render :action => :new # Guest list stage
  #     end # Guest list stage
      end #End of User.transaction
      end #End of Company.transaction
  end #End of create  

  def update
    super
  end
  
  def defaults company,user
    brand = Brand.new(:code => '00', :description => 'NONE/NINGUNO', :domain => company.id, :username => user.username).save
    category = Category.new(:code => '00', :description => 'NONE/NINGUNO', :domain => company.id, :username => user.username).save
    warehouse = Warehouse.new(:code => '01', :name => 'MAIN/PRINCIPAL', :city => 'NONE/NINGUNO', :domain => company.id, :username => user.username).save
    document_type_1 = DocumentType.new(:description => 'INVOICE/FACTURA', :account_type => 'Client', :stock => true, :stock_type => 'debit', :domain => company.id, :username => user.username).save 
    document_type_2 = DocumentType.new(:description => 'ESTIMATE/PRESUPUESTO', :account_type => 'Client', :stock => false, :stock_type => 'debit', :domain => company.id, :username => user.username).save 
    document_type_3 = DocumentType.new(:description => 'IN STOCK/ENTRADA', :account_type => 'Warehouse', :stock => true, :stock_type => 'credit', :domain => company.id, :username => user.username).save     
    payment_type = PaymentType.new(:code => '01', :description => 'CASH/EFECTIVO', :domain => company.id, :username => user.username).save
  end  
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:company_name, :password_confirmation, :username, :name, :email, :password, :domain, :id)
    end
end
           