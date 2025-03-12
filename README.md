Pymenta Rails Open Source Project
===========================================================

Pymenta is a very simple Rails Cloud ERP System created for small companies to create, manage and print documents ( invoices, notes, quotations, credits, etc). 
You can manage warehouses, providers, clients, products, stock and print statistic reports. 

I created this application in 2013 as my first Rails application. It started with Rails 3.2 and Ruby 2.0. Was used by a few privates companies until 2018 to invoice and create documents to manage sewing workshops that manufacture home textils. This application were upgraded to Rails 7 and Ruby 3.2 and released as an open source project.

## Frontend Migration

This application has been migrated from Bootstrap 2.3.2 to Tailwind CSS.

### Completed Migration Steps

1. Installed `tailwindcss-rails` gem
2. Created compatibility layer between Bootstrap and Tailwind in the Tailwind configuration
3. Updated main layouts and partials to use Tailwind CSS
4. Removed Bootstrap dependencies from the application

### Migration Strategy

To minimize disruption during the migration process, we've implemented a gradual approach:

1. Set up a compatibility layer with Tailwind utility classes that match common Bootstrap class names
2. Update core layout templates first (application.html.erb, navigation, messages)
3. Gradually update individual view templates one by one

### Next Steps

To complete the migration:

1. Update remaining view templates to use Tailwind classes
2. Remove Bootstrap JavaScript dependencies completely
3. Test all UI components and forms
4. Remove the compatibility layer once all views have been updated

### Benefits of Tailwind CSS

- More modern and flexible utility-first approach
- Better responsive design capabilities
- Smaller CSS bundle size
- Better developer experience with composable utilities
- More granular control over design elements

Demo Application
----------------

A demo application can be found at http://pymenta.papayalabs.io/

Local Installation
------------------

1. Download and install RVM and Rails

2. Clone the repository

  `git clone https://github.com/papayalabs/pymenta.git`

3. Configure your database in config/database.yml The current config assumes a custom local SQLite configuration.

   `edit config/database.yml`

4. Install gems

  `bundle`

5. Migrate database

  `rake db:migrate`

6. Start your webserver

  `rails s`

Using Capistrano to deploy
------------------

In order to use Capistrano with your server, you need to:

  1. Go to config/secrets.yml and update the values of the server, deploy directory and private key.

  2. Deploy the application

	`cap production deploy`

## License

This code is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).	



