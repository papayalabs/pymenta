require 'prawn/table'
require 'open-uri'

class DocumentsReport < PdfReport
  include ActionView::Helpers::NumberHelper
  TABLE_WIDTHS = [50, 70, 70, 100, 90, 80, 80, 40, 80, 40, 80, 80]
  PAGE_MARGIN = [40, 40, 40, 40]
  RAILS_ROOT = Rails.root

  def initialize(documents=[],user, start_at, end_at)
    super(:page_size => "LEGAL",  margin: PAGE_MARGIN, :page_layout => :landscape)
    @invoices = documents
    @user = user
    logo
    move_down 40
    if I18n.locale == :es
      text 'Listado de Documentos desde ' + start_at.strftime(user.company.date_format) + ' hasta ' + end_at.strftime(user.company.date_format),:size => 24, :style => :bold
    elsif I18n.locale == :en
      text 'List of Documents from ' + start_at.strftime(user.company.date_format) + ' to ' + end_at.strftime(user.company.date_format),:size => 24, :style => :bold
    end
      move_down 40
    display_header_table
    display_invoice_table
    display_total_table
    footer
  end

  private

  def custom_box(title,description,x,width)
    stroke_rectangle [0+x,cursor-20], width, 30
    text_box(title, :at=>[3+x,cursor-22], :width=>width, :height=>30, :size => 10,:style => :bold)
    text_box(description, :at=>[3+x,cursor-40], :width=>width, :height=>30, :size => 10)
  end

  def display_header_table
    if I18n.locale == :es
      data = [['Fecha', 'Nro.', @user.company.id_number1_label,'Nombre','Detalles','Total con IVA', 'Sub Total', '% IVA', 'Total IVA','% Retención','Total Retención','Estado']]
    elsif I18n.locale == :en
      data = [['Date', 'Nro.', @user.company.id_number1_label,'Name','Details','Total with Tax', 'Sub Total', '% Tax', 'Total Tax','% Retention','Total Retention','Status']]
    end
      table(data, :row_colors => ["F0F0F0"],column_widths: TABLE_WIDTHS, :cell_style => { size: 10 } )

  end

  def display_invoice_table
    if table_data.empty?
      text "Ninguna factura encontrada"
    else
      table(table_data,column_widths: TABLE_WIDTHS, :cell_style => { size: 10 } ) do
        cells.style do |c|
          if c.content == "NO PAGADO" || c.content == "NOT PAID"
            c.background_color = 'b42121'
          elsif c.content == "PAGADO PARCIAL" || c.content == "PARTIAL PAID"
            c.background_color = 'ffad32'
          elsif c.content == "PAGADO" || c.content == "PAID"
            c.background_color = '2f960b'
          end              
        end
      end
    end
  end

  def table_data
    @table_data ||= @invoices.map { |e| [e.date.strftime('%d/%m/%Y'), e.document_number, e.account.id_number1, e.account.name, e.details, format_currency(e.total), format_currency(e.sub_total), e.tax, format_currency(e.tax_total), e.retention, format_currency(e.retention_total),status_name(e)] }
  end

  def display_total_table
      data = [['', '', '', '','TOTAL', format_currency(@invoices.sum("total")), format_currency(@invoices.sum("sub_total")), '', format_currency(@invoices.sum("tax_total")),'',format_currency(@invoices.sum("retention_total")),'']]
      table(data, :row_colors => ["F0F0F0"],column_widths: TABLE_WIDTHS, :cell_style => { size: 10 , :font_style => :bold } )
  end
  
  def format_currency(value)
    number_to_currency(value, unit: '', separator: ',' , delimiter: '.', format: "%u %n")  
  end
  
  def status_name(e)
    if e.payments_document != nil
      value = e.payments_document.status
    else
      value = "NOT_PAID"
    end     
    if value == nil || value == "NOT_PAID"
      I18n.locale == :es ? "NO PAGADO" : "NOT PAID"
    elsif value == "PARTIAL_PAID"
      I18n.locale == :es ? "PAGADO PARCIAL" : "PARTIAL PAID"
    elsif value == "PAID"
      I18n.locale == :es ? "PAGADO" : "PAID"
    end
  end        
end
