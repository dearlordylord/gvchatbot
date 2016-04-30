heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
Add a .buildpacks file to your repository containing:

http://github.com/heroku/heroku-buildpack-nodejs.git
http://github.com/stomita/heroku-buildpack-phantomjs.git
Then make sure the phantomjs binary is pathed:

heroku config:set PATH="/usr/local/bin:/usr/bin:/bin:/app/vendor/phantomjs/bin"

https://discussion.heroku.com/t/running-a-headless-browser-on-heroku/97/2