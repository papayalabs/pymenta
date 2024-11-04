class DocumentReport < PdfReport
  include ActionView::Helpers::NumberHelper
  TABLE_WIDTHS = [300, 60, 60, 60, 60]
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
      fill_color "8f8f8f"
      text document.type, :size => 18, :style => :bold
      fill_color "000000"
      stroke do
        line_width 3
        stroke_horizontal_rule
      end
      move_down 10
      text "NUMBER # ", :size => 8
      text document.document_number, :size => 12, :style => :bold
      stroke do
        line_width 1
        stroke_horizontal_rule
      end
      move_down 10
      text "ISSUE DATE ", :size => 8
      text document.date.strftime(@user.company.date_format), :size => 12, :style => :bold
      stroke do
        line_width 1
        stroke_horizontal_rule
      end
    end 
    company = @user.company
    grid(1,0).bounding_box do
      text "FROM:", :size => 10
      stroke do
        line_width 3
        stroke_horizontal_rule
      end
      move_down 10
      text company.name, :size => 10,:style => :bold
      text company.id_number1_label.to_s + ': ' + company.id_number1.to_s, :size => 9
      if company.address != nil
        text company.address.truncate(94,omission: ''), :size => 9
      end
      unless company.zip_code.blank?
        text company.city + ", " + company.zip_code, :size => 9
      else
        text company.city, :size => 9
      end
      text company.country_name, :size => 9
      text company.telephone, :size => 9
    end
    grid(1,1).bounding_box do
      text "BILL TO:", :size => 10
      stroke_horizontal_rule
      move_down 10
      text document.account.name, :size => 10, :style => :bold
      text company.id_number1_label.to_s + ': ' + document.account.id_number1.to_s, :size => 9
      if document.account.address != nil
        text document.account.address.truncate(94,omission: ''), :size => 9
      end
      unless document.account.zip_code.blank?
        text document.account.city+ ", " + document.account.zip_code, :size => 9
      else
        text document.account.city, :size => 9
      end
      text document.account.country_name, :size => 9
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
      stroke do
        line_width 3
        stroke_horizontal_rule
      end
      move_down 3
      data = [['Item Description','Quantity','Unit','Price','Total']]
      table(data, :row_colors => ["FFFFFF"],column_widths: TABLE_WIDTHS,:cell_style => { :border_width => 0 })
  end

  def display_lines_table
    if table_data.empty?
      text "No Lines Found"
    else
      table(table_data,column_widths: TABLE_WIDTHS,:cell_style => {:borders => [], size: 10})
    end
  end

  def table_data
    stroke do
      line_width 1
      stroke_horizontal_rule
    end
    @table_data ||= @document.document_lines.map { |e| [e.description+"\n".html_safe+e.notes, e.in_quantity + e.out_quantity, e.product.units, format_currency(e.price), format_currency(e.total)] }
  end

  def footer
    grid(6,1).bounding_box do
      stroke_horizontal_rule
      move_down 5
      text_box "SUB-TOTAL", :align => :left, :size => 12, :at => [0, y - 30]
      text format_currency(@document.sub_total).to_s + " " + @user.company.unit, :align => :right, :style => :bold, :size => 12
      stroke_horizontal_rule if @document.tax != 0
      move_down 5
      text_box "VAT " + "( " + @document.tax.to_s + " % )", :align => :left, :size => 12, :at => [0, y - 30]
      text format_currency(@document.tax_total).to_s + " " + @user.company.unit, :align => :right, :style => :bold,:size => 12
      stroke_horizontal_rule if @document.retention != 0
      move_down 5 if @document.retention != 0
      text_box "RETENTION" + "( " + @document.retention.to_s + " % )", :align => :left, :size => 12, :at => [0, y - 30] if @document.retention != 0
      text format_currency(@document.retention_total).to_s + " " + @user.company.unit, :style => :bold, :align => :right, :size => 12 if @document.retention != 0
      stroke do
        line_width 3
        stroke_horizontal_rule
      end
      move_down 5
      text_box "TOTAL", :align => :left, :style => :bold, :size => 16, :at => [0, y - 30]
      text format_currency(@document.total).to_s + " " + @user.company.unit, :align => :right, :style => :bold, :size => 16
    end
  end      
    
  def format_currency(value)
    number_to_currency(value, unit: '', separator: ',' , delimiter: '.', format: "%u %n")  
  end   
    
    
end