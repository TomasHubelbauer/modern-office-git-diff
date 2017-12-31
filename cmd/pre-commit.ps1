Copy-Item Title.docx Title.zip
Expand-Archive Title.zip -DestinationPath out/Title
Remove-Item Title.zip
Write-Output "Done."
