source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.0"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.8", ">= 7.0.8.1"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use sqlite3 as the database for Active Record
gem "sqlite3", "~> 1.4"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Sass to process CSS
# gem "sassc-rails"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"

end

gem 'jquery-rails'
gem 'jquery-ui-rails'
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Using React for frontend developement
gem 'react-rails', '~> 1.5'

# Using Bootstrap 2.3.2
gem 'twitter-bootstrap-rails', '~> 3.2.0'
gem 'bootstrap-select-rails'
gem 'bootstrap-sass', '~> 2.3.2.0'
gem 'bootswatch-rails' #This gem is meant to be used with bootstrap-sass. It gives you complete scss versions of bootswatches for use in your Rails asset pipeline, just like bootstrap-sass gives you scss version of bootstrap itself.


# Using Device and CanCan for authentication
gem 'devise'
#gem 'cancan'

# Using Simple Form to simplified forms
gem 'simple_form'

# Using Prawn for reports
gem 'prawn'
gem 'prawn-table'

# Using PaperClip for file attachment management and Dropbox API to store it
gem "paperclip", ">= 5.2.0"
gem 'paperclip-dropbox'

# Using ActiveAdmin as administratin framework for administration users
gem 'activeadmin'
#gem 'kaminari'

# Using Figaro for simple, Heroku-friendly Rails app configuration using ENV and a single YAML file
gem 'figaro'

# Using Will_Paginate as a pagination library
gem "will_paginate", '~> 3.0'
gem 'will_paginate-bootstrap', '~> 0.2.5'

# Using Rolify as a role managment library
gem 'rolify', '~> 5.3'

# Using Coutry Selectas a simple helper to get an HTML select list of countries using the ISO 3166-1 standard.
gem 'country_select'

# Using PayPal SDK
gem 'paypal-sdk-core', '~> 0.3.2'
gem 'paypal-sdk-rest', '~> 1.3.3'

# Using Mercado Pago SDK
#gem 'mercadopago-sdk'

# Using Remotipart to use remote =>true in form
gem 'remotipart', '~> 1.3.1'

group :assets do
  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier'
end

group :production do
  # Use Postgresql for production
  gem 'execjs'
  gem 'therubyracer'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  #Add Capistrano for deploy
  gem "capistrano"
  gem 'capistrano-bundler'
  gem "capistrano-rails", require: false
  gem 'capistrano-rails-console', require: false
  gem 'capistrano-rake', require: false
  gem 'capistrano-rvm', require: false
  gem 'sshkit-sudo'
  gem 'capistrano3-unicorn'
  gem 'pry'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'erd'
end

gem 'unicorn-rails'
gem 'listen'

#AWS
gem 'aws-sdk'
gem 'aws-sdk-s3'
gem 'bigdecimal'
gem "json"
gem 'mysql2', '>= 0.5.6'
gem 'turbolinks'
gem 'pg'
gem 'rails_12factor'


#For Capistrano SSH
gem 'net-ssh', '>= 6.0.2'
gem 'ed25519', '>= 1.2', '< 2.0'
gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'
