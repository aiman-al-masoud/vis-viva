webpack  
echo "<script>" >> ./dist/index.html  
cat ./dist/main.js >> ./dist/index.html  
echo "</script>" >> ./dist/index.html  
sed -i 's/<script defer src="main.js"></script>//g' ./dist/index.html   
rm ./dist/main.js
rm ./dist/main.js.LICENSE.txt