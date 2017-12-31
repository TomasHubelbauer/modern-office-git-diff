Copy-Item Title.docx Title.zip
Expand-Archive Title.zip -DestinationPath out/Title -Force
Remove-Item Title.zip
# Format XML files
Get-ChildItem out/Title -Filter *.xml -Recurse |
Foreach-Object {
	$xml = [xml](Get-Content -literalPath $_.FullName)
	$xml.Save($_.FullName)
	git add "$_.FullName"
}
