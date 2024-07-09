Pymenta Rails Open Source Project
===========================================================

Pymenta is a very simple Rails Cloud ERP System created for small companies to create, manage and print documents ( invoices, notes, quotations, credits, etc). 
You can manage warehouses, providers, clients, products, stock and print statistic reports. 

This application is released as an open source project for educational purposes. Uses Ruby 3.2.0, Rails 7, React, Boostrap, Device, Simple_Form, Prawn, PaperClip and ActiveAdmin.

Demo Application
----------------

A demo application can be found at http://pymenta.thewhiteowlacademy.com/

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

  1. Go to config/deploy/production.rb and update the values of the server and private key with your values

  2. Deploy the application

	`cap production deploy`

	
Restore Database
------------------

 * restore to local database

  ```bash
    pg_restore --verbose --clean --no-acl --no-owner -p port -h localhost -U username -d database latest.dump
  ```
* enter in postgresql locally

  ```bash
    psql -U username -p port (username:papayalabs,port:5433,database:pymenta)
  ````
* inside postgresql console fix schema_migrations ( replace with the values of the migration of your local installation )

  ```bash
      \c database
      delete from schema_migrations;
      insert into schema_migrations (version) values ('20120418171104'),('20120418171110'),('20130913224704'),('20131030220237'),('20131031142647'),('20131107000336'),('20131114214311'),('20140408103342'),('20141028192038'),('20141030191950'),('20141031130722'),('20141031141853'),('20141031183352'),('20150222233731'),('20151211214830'),('20160129141729'),('20170314023025'),('20170314023034'),('20190213093216');
  ``` 
## License

This code is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).	



