@echo off
echo Deploying traditional version to GitHub Pages...

echo Installing required packages...
call npm install -g gh-pages

echo Creating CNAME file if needed...
REM Uncomment and edit the line below if you have a custom domain
REM echo your-custom-domain.com > CNAME

echo Ensuring .nojekyll file exists...
echo "" > .nojekyll

echo Deploying to GitHub Pages...
REM Replace "username/repo" with your actual GitHub username and repository name
REM For deploying to a user/organization site (username.github.io), use the -b master flag
call gh-pages -d . -b gh-pages-traditional

echo Traditional version deployed!
echo It should be available soon at: https://username.github.io/repo/traditional/ 