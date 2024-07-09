require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Pymenta
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
    end
    config.i18n.available_locales = [:es, :en]
    config.react.addons = true
    config.limit = 15
    config.hosts << "pymenta.thewhiteowlacademy.com"
    config.hosts << "pymenta.papayalabs.io"
    config.hosts << "pymenta.net"
  end
end
