require 'prawn/table'
require 'open-uri'

class AccountsReport < PdfReport
  include ActionView::Helpers::NumberHelper
  TABLE_WIDTHS = [100, 200, 200, 200, 200]
  PAGE_MARGIN = [40, 40, 40, 40]
  RAILS_ROOT = Rails.root

  def initialize(accounts=[],user, code, name, city)
    super(:page_size => "LEGAL",  margin: PAGE_MARGIN, :page_layout => :landscape)
    @accounts = accounts
    @user = user
    @code = code
    @name = name
    @city = city
    logo
    move_down 40
    text 'Listado de '+accounts.first.type.to_s,:size => 24, :style => :bold if accounts.first != nil
    move_down 40
    display_header_table
    display_invoice_table
    footer
  end

  private

  def custom_box(title,description,x,width)
    stroke_rectangle [0+x,cursor-20], width, 30
    text_box(title, :at=>[3+x,cursor-22], :width=>width, :height=>30, :size => 10,:style => :bold)
    text_box(description, :at=>[3+x,cursor-40], :width=>width, :height=>30, :size => 10)
  end

  def display_header_table
      data = [['Codigo', 'Nombre', 'RIF','Telefono','Ciudad']]
      table(data, :row_colors => ["F0F0F0"],column_widths: TABLE_WIDTHS, :cell_style => { size: 10 } )
  end

  def display_invoice_table
    if table_data.empty?
      text "Ninguno encontrado"
    else
      table(table_data,column_widths: TABLE_WIDTHS, :cell_style => { size: 10 } )
    end
  end

  def table_data
    @table_data ||= @accounts.map { |e| [e.code, e.name, e.id_number1, e.telephone, e.city] }
  end

end
