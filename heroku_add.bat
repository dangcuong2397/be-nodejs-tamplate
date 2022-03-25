git add *
set /p mess=Enter mess: 
git commit -am "%mess%"
git push heroku master
pause
