class Reporta03771110b764f44a10710548e38a7b5< PdfReport
  include ActionView::Helpers::NumberHelper
  TABLE_WIDTHS = [100, 200, 60, 60, 60, 60]
  RAILS_ROOT = Rails.root
  PAGE_MARGIN = [30, 30, 30, 30]

  def initialize(document,user)
    super(:page_size => "LETTER",  margin: PAGE_MARGIN, :page_layout => :portrait)
    @document = document
    @user = user
    define_grid(:columns => 2, :rows => 7, :gutter => 15)
    #grid.show_all
    logo
    grid(0,1).bounding_box do
      text document.type + " N# " + document.document_number, :size => 14, :style => :bold
      text "FECHA " + document.date.strftime('%d/%m/%Y'), :size => 10
      text "COND DE PAGO " + document.due, :size => 10
    end 
    company = @user.company
    grid(1,0).bounding_box do
      text ""
      text company.name, :size => 10,:style => :bold
      text company.id_number1, :size => 9
      if company.address != nil
        text company.address.truncate(94,omission: ''), :size => 9
      end
      text company.city, :size => 9
      text company.telephone, :size => 9
    end
    grid(1,1).bounding_box do
      text document.account.name, :size => 10, :style => :bold
      text document.account.id_number1, :size => 9
      if document.account.address != nil
        text document.account.address.truncate(94,omission: ''), :size => 9
	end
      text document.account.city, :size => 9
      text document.account.telephone, :size => 9
    end  
    move_down 10
    display_header_table
    display_lines_table
    move_cursor_to 90
    footer
  end

  private

  def display_header_table
      data = [%w[COD DESCRIPCION UND CANT PRECIO TOTAL]]
      table(data, :row_colors => ["F0F0F0"],column_widths: TABLE_WIDTHS)
  end

  def display_lines_table
    if table_data.empty?
      text "No Lines Found"
    else
      table(table_data,column_widths: TABLE_WIDTHS,:cell_style => {:borders => [], size: 10})
    end
  end

  def table_data
    @table_data ||= @document.document_lines.map { |e| [e.code, e.description, e.product.units, e.in_quantity + e.out_quantity, format_currency(e.price), format_currency(e.total)] }
  end

  def footer
    grid(6,0).bounding_box do
      text "SUB-TOTAL", :align => :right, :style => :bold, :size => 18 
      text "IVA " + " " + @document.tax.to_s + " % ", :align => :right, :style => :bold, :size => 18
      text "RETENCIÓN" + " " + @document.retention.to_s + " % ", :align => :right, :style => :bold, :size => 18 if @document.retention != 0
      text "TOTAL", :align => :right, :style => :bold, :size => 18 
    end
    grid(6,1).bounding_box do
      text format_currency(@document.sub_total).to_s, :align => :right, :size => 18
      text format_currency(@document.tax_total).to_s, :align => :right, :size => 18
      text format_currency(@document.retention_total).to_s, :align => :right, :size => 18 if @document.retention != 0
      text format_currency(@document.total).to_s, :align => :right, :size => 18
    end
  end      
    
  def format_currency(value)
    number_to_currency(value, unit: '', separator: ',' , delimiter: '.', format: "%u %n")  
  end   
    
    
end