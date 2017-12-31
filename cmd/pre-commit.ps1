Copy-Item Title.docx Title.zip
Expand-Archive Title.zip -DestinationPath out/Title -Force
Remove-Item Title.zip
# Format XML files
Get-ChildItem out/Title -Filter *.xml -Recurse |
Foreach-Object {
	$xml = [xml](Get-Content -literalPath $_.FullName)
	$xml.Save($_.FullName)
}

# Wait for a bit so we don't have dangling files
Start-Sleep -Seconds 5
