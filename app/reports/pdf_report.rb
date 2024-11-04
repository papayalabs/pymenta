class PdfReport < Prawn::Document
  RAILS_ROOT = Rails.root
  def initialize(default_prawn_options={})
    super(default_prawn_options)
  end
  def logo
    puts "directory RAILS_ROOT = #{RAILS_ROOT}"
    if "#{RAILS_ROOT}" == "/app"
      image open(@user.company.logo.url(:square).sub(/\?.+\Z/, '')), :width => 225, :height => 60
    else
      #image "#{RAILS_ROOT}/app/assets/images/"+@user.company.logo.url(:square).sub(/\?.+\Z/, ''), :width => 225, :height => 60
      image "#{RAILS_ROOT}/app/assets/images/manuelfernandez.png", :width => 225, :height => 60    
    end
  end
  def header(title=nil)
    if title
      text title, size: 14, style: :bold_italic, align: :center
    end
  end
  def footer
  end
end