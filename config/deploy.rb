# config valid for current version and patch releases of Capistrano
require File.expand_path("./environment", __dir__)
lock "~> 3.19.1"

set :application, "pymenta"
set :repo_url, "https://#{Rails.application.secrets.github_access_token}@github.com/papayalabs/pymenta.git"

append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'certs'
append :linked_files, 'config/database.yml', 'config/secrets.yml', 'config/aws.yml', 'config/unicorn.rb'

set :whenever_environment, -> { "#{fetch(:stage)}" }
set :whenever_identifier, -> { "#{fetch(:application)}_#{fetch(:stage)}" }

set :branch, ENV['BRANCH'] if ENV['BRANCH']
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/pymenta"
set :unicorn_config_path, "/var/www/pymenta/shared/config/unicorn.rb"

#set :default_env, { rvm_bin_path: '/usr/local/rvm/bin' }

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

#namespace :deploy do
#    desc 'Restart application'
#    task :restart do
#      on roles(:app), in: :sequence, wait: 5 do
#        execute :touch, release_path.join('tmp/restart.txt')
#      end
#    end
  
#    after :published, 'deploy:restart'
#    after :finishing, 'deploy:cleanup'
#  end

set :bundle_flags,      '--quiet' # this unsets --deployment, see details in config_bundler task details
set :bundle_path,       nil
set :bundle_without,    nil

namespace :deploy do
  desc 'Config bundler'

  task :config_bundler do
    on roles(/.*/) do
      execute :bundle, 'config', '--local deployment', true
      execute :bundle, 'config', '--local', 'without', "development:test"
      execute :bundle , 'config', '--local', 'path', shared_path.join('bundle')
    end
  end
end

before 'bundler:install', 'deploy:config_bundler'

namespace :unicorn do
  desc 'Stop application'
  task :stop do
    on roles(:app) do
      puts "Stoping Unicorn..."
      execute "kill -9 $(pgrep -f #{fetch(:unicorn_config_path)} )"
    end
  end
end

namespace :unicorn do
    desc 'Start application'
    task :start do
      on roles(:app) do
        puts "Starting Unicorn..."
        execute "cd #{fetch(:deploy_to)}/current/"; "bundle exec unicorn -c #{fetch(:unicorn_config_path)} -E production -D"
      end
    end
end

after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:stop'
    invoke 'unicorn:start'
  end
end

namespace :deploy do
  desc "reload the database with seed data"
  task :seed do
    on roles(:app) do
      execute "cd #{fetch(:deploy_to)}/current/"; "bundle exec rake db:seed RAILS_ENV=production"
    end
  end
end

namespace :delayed_job do
  desc 'Start Delayed Jobs'
  task :start do
    on roles(:app) do
      puts "Starting Delayed Jobs..."
      execute "cd #{fetch(:deploy_to)}/current/"; "bundle exec bin/delayed_job start RAILS_ENV=production"
    end
  end
end

namespace :delayed_job do
  desc 'Stop Delayed Jobs'
  task :stop do
    on roles(:app) do
      puts "Stoping Delayed Jobs..."
      execute "cd #{fetch(:deploy_to)}/current/"; "bundle exec bin/delayed_job stop RAILS_ENV=production"
    end
  end
end

namespace :delayed_job do
  desc 'Status of Delayed Jobs'
  task :status do
    on roles(:app) do
      puts "Status of Delayed Jobs..."
      execute "cd #{fetch(:deploy_to)}/current/"; "bundle exec bin/delayed_job status RAILS_ENV=production"
    end
  end
end