nr=`git log lib/*.js | grep '^commit ' | wc -l | tr -d ' '`
zip -r "../cats-1.8.${nr}.nw" lib/* resource/* node_modules/* CopyrightNotice.txt LICENSE.txt index.html package.json
