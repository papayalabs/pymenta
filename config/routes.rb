Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #authenticated :user do
  #  root :to => 'home#index'
  #end
  root :to => "home#index"
  
  resources :providers do
    get "providers_report", :on => :collection
    get "account_report", :on => :collection   
  end
  
  resources :products do
    get "product_list_report", :on => :collection
  end
  
  resources :clients do
    get "clients_report", :on => :collection
    get "account_report", :on => :collection   
  end
  
  resources :documents do
    get "documents_report", :on => :collection
    get "document_report", :on => :collection
    get "document_report2", :on => :collection
    get "document_report3", :on => :collection
    get "personalize_report", :on => :collection
  end
  
  resources :users
  resources :companies
  resources :clients
  resources :providers
  resources :warehouses
  resources :products
  resources :brands
  resources :categories
  resources :documents
  resources :document_types
  resources :document_lines
  resources :stocks
  resources :payments
  resources :payments_documents
  resources :payment_types
  
  scope "(:locale)", locale: /#{I18n.available_locales.join("|")}/ do

    devise_for :users, :controllers => { :registrations => "registrations"}
    
    get '/documents/search' => 'documents#search', :as => :documents_search
    get '/stocks/search' => 'stocks#search', :as => :stock_search
    get '/clients/search' => 'clients#search', :as => :client_search
    get '/providers/search' => 'providers#search', :as => :provider_search
    get '/products/search' => 'products#search', :as => :products_search
    get '/payments_documents/search' => 'payments_documents#search', :as => :payments_documents_search

    get '/companies/settings' => 'companies#settings', :as => :settings
    get '/companies/edit_formats' => 'companies#edit_formats', :as => :edit_formats     
 
    get '/clients/autocomplete' => 'clients#autocomplete', :as => :client_autocomplete
    get '/clients/get_info_account' => 'clients#get_info_from_selected_account', :as => :get_info_client

    get '/providers/autocomplete' => 'providers#autocomplete', :as => :provider_autocomplete
    get '/providers/get_info_account' => 'providers#get_info_from_selected_account', :as => :get_info_provider

    get '/warehouses/autocomplete' => 'warehouses#autocomplete', :as => :warehouse_autocomplete
    get '/warehouses/get_info_account' => 'warehouses#get_info_from_selected_account', :as => :get_info_warehouse   

    delete '/documents/remove_document_line' => 'documents#remove_document_line', :as => :document_remove_document_line
    post '/documents/create_document_line' => 'documents#create_document_line', :as => :create_document_line
    get '/documents/create_document_account' => 'documents#create_document_account', :as => :create_document_account  
    get '/documents/new' => 'documents#new', :as => :new

    get '/products/autocomplete' => 'products#autocomplete', :as => :product_autocomplete
    get '/products/get_info_product' => 'products#get_info_from_selected_product', :as => :get_info_product

    get '/payments_documents/add_payments_document_id' => 'payments_documents#add_payments_document_id', :as => :add_payments_document_id  
    get '/payments_documents/remove_payments_document_id' => 'payments_documents#remove_payments_document_id', :as => :remove_payments_document_id  
    post '/payments_documents/create_payment_line' => 'payments_documents#create_payment_line', :as => :create_payment_line
    post '/payments_documents/new' => 'payments_documents#new'
    get '/payments_documents/new_modal' => 'payments_documents#new_modal', :as => :new_modal
    #post '/payments_documents/create_payments_document_account' => 'payments_documents#create_payments_document_account', :as => :create_payments_document_account   
    get '/payments_documents/create_payments_document_account' => 'payments_documents#create_payments_document_account', :as => :create_payments_document_account 
    get '/learn' => 'learn#index', :as => :learn_personalize_report
    get '/privacy' => 'privacy#index', :as => :privacy
    get '/terms' => 'terms#index', :as => :terms 

    patch '/upload_logo' => 'companies#upload_logo', :as => :upload_logo
    get '/delete_logo' => 'companies#delete_logo', :as => :delete_logo
    
    get '/service_payments/subscribe_month' => 'service_payments#subscribe_month', :as => :subscribe_month 
    get '/service_payments/subscribe_year' => 'service_payments#subscribe_year', :as => :subscribe_year
  end
end
