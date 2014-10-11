files=`cat icon_files.txt`
for file in $files
do
mkdir -p `dirname ./new/${file}`
cp $file ./new/${file}
done
