class DocumentsController < ApplicationController
  layout "public_search", only: [:public_search]
  # GET /documents
  # GET /documents.json
  before_action :authenticate_user!, except: [:public_seach,:document_report,:documents_report]
  def search
   @start_at = params[:start_at].blank? ? DateTime.parse("01/01/1901") : DateTime.parse(params[:start_at])
   @end_at = params[:end_at].blank? ? DateTime.parse("01/01/2901") : DateTime.parse(params[:end_at])
   @name = params[:name]
   @status = params[:status]
   @document_type = params[:type]

   if @status.blank?
     if @document_type.blank?
      @documents = Document.joins(:account).where("documents.domain = ? AND name like ? AND date >= ? AND date <= ? ", current_user.domain,"%#{@name}%","#{@start_at}","#{@end_at}").paginate(:page => params[:page], :per_page => 10).order('date DESC')
     else
      @documents = Document.joins(:account).where("documents.domain = ? AND name like ? AND documents.type = ? AND date >= ? AND date <= ? ", current_user.domain,"%#{@name}%","#{@document_type}","#{@start_at}","#{@end_at}").paginate(:page => params[:page], :per_page => 10).order('date DESC')
     end
   else
     if @document_type.blank?
      @documents = Document.joins(:account).joins("LEFT OUTER JOIN payments_documents ON payments_documents.id = documents.payments_document_id").where("documents.domain = ? AND accounts.name like ? AND documents.date >= ? AND documents.date <= ? AND (payments_documents.status = ? OR (documents.status = ? AND payments_documents.id IS NULL))", current_user.domain,"%#{@name}%","#{@start_at}","#{@end_at}","#{@status}","#{@status}").paginate(:page => params[:page], :per_page => 10).order('date DESC')
     else
      @documents = Document.joins(:account).joins("LEFT OUTER JOIN payments_documents ON payments_documents.id = documents.payments_document_id").where("documents.domain = ? AND accounts.name like ? AND documents.type = ? AND documents.date >= ? AND documents.date <= ? AND (payments_documents.status = ? OR (documents.status = ? AND payments_documents.id IS NULL))", current_user.domain,"%#{@name}%","#{@document_type}","#{@start_at}","#{@end_at}","#{@status}","#{@status}").paginate(:page => params[:page], :per_page => 10).order('date DESC')
     end
   end      
    render :index
  end

 
  def index
    @public_searches = PublicSearch.where(domain: current_user.domain).order(created_at: :desc).limit(10)
    @documents = current_user.company.documents.paginate(:page => params[:page], :per_page => 10).order('date DESC')

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @documents }
      format.js {}
    end
  end

  # GET /documents/1
  # GET /documents/1.json
  def show
    @document = Document.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @document }
    end
  end

  # GET /documents/new
  # GET /documents/new.json
  def new
    @document = Document.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @document }
    end
  end

  # GET /documents/1/edit
  def edit
    @document = Document.find(params[:id])
  end

  # PUT /documents/1
  # PUT /documents/1.json
  def update
    @document = Document.find(params[:id])

    respond_to do |format|
      if @document.update(document_params)
        format.html { redirect_to @document, notice: 'Document was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /documents/1
  # DELETE /documents/1.json
  def destroy
    @document = Document.find(params[:id])
    @document.destroy

    respond_to do |format|
      format.html { redirect_to documents_url }
      format.json { head :no_content }
    end
  end

  def is_document_not_paid
    @document = Document.find(params[:id])
    @document.status == "NOT_PAID"
  end
    
  def remove_document_line
    @document_line = DocumentLine.find(params[:id])
    @document_line.destroy

    respond_to do |format|
        format.html { redirect_to @document_line.document, notice: 'Document was successfully updating.' }
        format.json { render json: @document_line.document, status: :created, location: @document }
        format.js
    end
  end

  def create_document_line
    product = Product.find(params[:autocomplete])
    document = Document.find(params[:header_id])
    quantity = params[:quantity].to_f
    price = params[:price].to_f
    total = quantity*price
    document_line = DocumentLine.new(domain: current_user.domain, username: current_user.username,
      code: product.code, date: DateTime.now, description: product.description, document_number: document.document_number,
	    header_id: document.id, product_id: product.id, warehouse_id: document.warehouse.id, 
	    in_quantity:0, out_quantity: quantity,price: price, total: total, type: document.type, month: DateTime.now.month, year: DateTime.now.year,
      notes: params[:notes])
    if document_line.save!
      flash[:notice]='Your line was created'
    else
      flash[:notice]='Please verify your data'
    end

    respond_to do |format|
      format.html{ redirect_to document }
    end
  end  
  
  def create_document_account
    begin
      account_type = DocumentType.find(params[:document][:document_type_id]).account_type
      puts "esta es " + account_type
      if(account_type=='Client')
          account = Client.find(params[:autocomplete_client])
      elsif(account_type=='Provider')
           account = Provider.find(params[:autocomplete_provider])     
      elsif(account_type=='Warehouse')
           account = Warehouse.find(params[:autocomplete_warehouse])           
      end
    rescue ActiveRecord::RecordNotFound
      account = nil
    end

    if account
      create_document(account) 
    else
      @document = Document.new(document_params) 
      params[:document][:type] = params[:document][:document_type_id]
      @document.errors[:base] << t("helpers.labels.not_provider_present") # Not provider
      render :action => :new # Not provider
    end    
  end




  def create_document(account) 


      params[:document][:version] = ENV["VERSION"]
      params[:document][:domain] = current_user.domain
      params[:document][:username] = current_user.username
      params[:document][:account_id] = account.id
      params[:document][:code] = account.code
      params[:document][:discount_percentage] = 0
      params[:document][:discount_total] = 0
      params[:document][:sub_total] = (params[:document][:sub_total].blank? ? 0 : params[:document][:sub_total])
      params[:document][:tax_total] = ((params[:document][:tax].to_f)*(params[:document][:sub_total].to_f)/100).round(2)
      params[:document][:total] = (params[:document][:sub_total].to_f + params[:document][:tax_total].to_f).round(2)
      params[:document][:paid] = 0
      params[:document][:paid_left] = 0    
      params[:document][:month] = Time.new.month+1
      params[:document][:year] = Time.new.year+1900
      params[:document][:status] = "NOT_PAID"
      
    @document = Document.new(document_params)

    respond_to do |format|
      if @document.save
        format.html { redirect_to @document, notice: 'Document was successfully created.' }
        format.json { render json: @document, status: :created, location: @document }
      else
        params[:document][:type] = params[:document][:document_type_id] 
        format.html { render action: "new" }
        format.json { render json: @document.errors, status: :unprocessable_entity }
      end
    end
  end

 
  def documents_report
    #raise params.inspect
    if current_user != nil
      @user = current_user
    elsif params[:company].present?
      @user = Company.find(params[:company]).users.first
    end
    @start_at = params[:start_at].blank? ? DateTime.parse("01/01/1901") : DateTime.parse(params[:start_at])
    @end_at = params[:end_at].blank? ? DateTime.parse("01/01/2901") : DateTime.parse(params[:end_at])
    @name = params[:name]
    @status = params[:status]
    @type = params[:type]
    if @status.blank?
     if @type.blank?
      @documents = Document.joins(:account).where("documents.domain = ? AND name like ? AND date >= ? AND date <= ? ", @user.domain,"%#{@name}%","#{@start_at}","#{@end_at}")
     else
      @documents = Document.joins(:account).where("documents.domain = ? AND name like ? AND documents.type = ? AND date >= ? AND date <= ? ", @user.domain,"%#{@name}%","#{@type}","#{@start_at}","#{@end_at}")
     end
    else
     if @type.blank?
      @documents = Document.joins(:account).joins("LEFT OUTER JOIN payments_documents ON payments_documents.id = documents.payments_document_id").where("documents.domain = ? AND accounts.name like ? AND documents.date >= ? AND documents.date <= ? AND (payments_documents.status = ? OR (documents.status = ? AND payments_documents.id IS NULL))", @user.domain,"%#{@name}%","#{@start_at}","#{@end_at}","#{@status}","#{@status}")
     else
      @documents = Document.joins(:account).joins("LEFT OUTER JOIN payments_documents ON payments_documents.id = documents.payments_document_id").where("documents.domain = ? AND accounts.name like ? AND documents.type = ? AND documents.date >= ? AND documents.date <= ? AND (payments_documents.status = ? OR (documents.status = ? AND payments_documents.id IS NULL))", @user.domain,"%#{@name}%","#{@type}","#{@start_at}","#{@end_at}","#{@status}","#{@status}")
     end
    end       
    pdf = DocumentsReport.new(@documents, @user, @start_at, @end_at)
    send_data pdf.render, filename:'documents_report.pdf',type: 'application/pdf', disposition: 'inline'
  end
  
  def document_report
      #raise params.inspect
      if current_user != nil
        user = current_user
      elsif params[:company].present?
        user = Company.find(params[:company]).users.first
      end
      @document = Document.find(params[:format])
      pdf = DocumentReport.new(@document, user)
      send_data pdf.render, filename:'document_report.pdf',type: 'application/pdf', disposition: 'inline'
    end


   def personalize_report
      user = current_user
      @document = Document.find(params[:format])
      pdf = Object.const_get("Report"+@document.document_type_id.to_s.tr('-', '')).new(@document, user)
      send_data pdf.render, filename:'personalize_report.pdf',type: 'application/pdf', disposition: 'inline'
   end 
   
   # POST /documents/save_public_search
  skip_before_action :authenticate_user!, only: [:public_search]

  def save_public_search
    public_search = PublicSearch.create(
      domain: current_user.domain,
      start_at: params[:start_at],
      end_at: params[:end_at],
      name: params[:name],
      status: params[:status],
      document_type: params[:document_type]
    )
    if public_search.persisted?
      redirect_to documents_path, notice: t('helpers.links.public_link_created', default: 'Public link created!')
    else
      redirect_to documents_path, alert: t('helpers.links.public_link_error', default: 'Could not create public link.')
    end
  end

  # GET /documents/public_search/:token
  def public_search
    @public_search = PublicSearch.find_by(id: params[:token])
    if @public_search.nil?
      render plain: 'Invalid or expired link', status: :not_found and return
    end
    @start_at = @public_search.start_at || DateTime.parse("01/01/1901")
    @end_at = @public_search.end_at || DateTime.parse("01/01/2901")
    @name = @public_search.name
    @status = @public_search.status
    @document_type = @public_search.document_type
    @documents = Document.joins(:account)
    if @status.blank?
      if @document_type.blank?
        @documents = @documents.where("name like ? AND date >= ? AND date <= ? ", "%#{@name}%", "#{@start_at}", "#{@end_at}")
      else
        @documents = @documents.where("name like ? AND documents.type = ? AND date >= ? AND date <= ? ", "%#{@name}%", "#{@document_type}", "#{@start_at}", "#{@end_at}")
      end
    else
      if @document_type.blank?
        @documents = @documents.joins("LEFT OUTER JOIN payments_documents ON payments_documents.id = documents.payments_document_id").where("accounts.name like ? AND documents.date >= ? AND documents.date <= ? AND (payments_documents.status = ? OR (documents.status = ? AND payments_documents.id IS NULL))", "%#{@name}%", "#{@start_at}", "#{@end_at}", "#{@status}", "#{@status}")
      else
        @documents = @documents.joins("LEFT OUTER JOIN payments_documents ON payments_documents.id = documents.payments_document_id").where("accounts.name like ? AND documents.type = ? AND documents.date >= ? AND documents.date <= ? AND (payments_documents.status = ? OR (documents.status = ? AND payments_documents.id IS NULL))", "%#{@name}%", "#{@document_type}", "#{@start_at}", "#{@end_at}", "#{@status}", "#{@status}")
      end
    end
    @documents = @documents.order('date DESC')
    render :public_search
  end
   
   private
     # Use callbacks to share common setup or constraints between actions.
     def set_document
       @document = Document.find(params[:id])
     end

     # Never trust parameters from the scary internet, only allow the white list through.
     def document_params
       params.require(:document).permit(:code, :date, :discount_percentage, :discount_total, :document_number, :domain, :due, :expire_date, :id, :month, :paid, :paid_left,
        :status, :sub_total, :tax, :tax_total, :total, :type, :username, :version, :year, :account_id, :warehouse_id, :document_type_id, :details, :control_number, :retention, :retention_total, :attach)
     end
end
