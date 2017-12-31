Copy-Item Title.docx Title.zip
Expand-Archive Title.zip -DestinationPath out/Title -Force
Remove-Item Title.zip
# Format XML files
Get-ChildItem out/Title -Filter *.xml -Recurse |
Foreach-Object {
	$path = $_.FullName
	$xml = [xml](Get-Content -literalPath $path)
	$xml.Save($path)
	git add "$path"
}
