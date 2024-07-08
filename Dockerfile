# Dockerfile
# gets the docker parent image
FROM ruby:3.2.0

RUN apt-get update && apt-get install -y npm && npm install -g yarn

RUN mkdir -p /var/www/pymenta/current
COPY . /var/www/pymenta/current
WORKDIR /var/www/pymenta/current

RUN bundle install

CMD rails s -b 0.0.0.0