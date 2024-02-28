rmdir /s /q docs
xcopy www docs /E /H /C /I
copy *.html docs
git add docs
git commit -a -m "Updated deployable files"
git push