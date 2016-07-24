nr=`git log lib/*.js | grep '^commit ' | wc -l | tr -d ' '`
zip -r "../cats-2.0.${nr}.nw" lib/* resource/* node_modules/* CopyrightNotice.txt LICENSE.txt index.html package.json
