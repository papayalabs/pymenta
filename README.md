Pymenta Rails Open Source Project
===========================================================

Pymenta is a very simple Rails Cloud ERP System created for small companies to create, manage and print documents ( invoices, notes, quotations, credits, etc). 
You can manage warehouses, providers, clients, products, stock and print statistic reports. 

This application is released as an open source project for educational purposes. Uses Rails 5, React, Boostrap, Device, Simple_Form, Prawn, PaperClip and ActiveAdmin.

Demo Application
----------------

A demo application can be found at http://pymenta.herokuapp.com/

Local Installation
------------------

1. Download and install railsinstaller (git is included)--> www.railsinstaller.org

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

Using Heroku
------------------

In order to use heroku, you need to:

  1. Download and install the heroku toolbelt for windows at https://toolbelt.heroku.com/

  2. Log in using the email address and password you used when creating your Heroku account

  3. Create an application

	`heroku create`

  4. Deploy the application
 	
	`git push heroku master ( if you get Permission denied (publickey) --> heroku keys:add )`

  5. Migrate database

	`heroku run rake db:migrate`
	
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



