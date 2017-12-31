# Iterate Office files in the repository
Get-ChildItem .\* -Include ("*.docx", "*.xlsx", "*.pptx") -Recurse |
	Foreach-Object {
	$officePath = $_.FullName
	Write-Output "Extracting $officePath"

	Copy-Item $officePath "$officePath.zip"
	Expand-Archive "$officePath.zip" -DestinationPath "$officePath.git" -Force
	Remove-Item "$officePath.zip"

	# Format XML files for nice diff
	Get-ChildItem "$officePath.git" -Filter *.xml -Recurse |
		Foreach-Object {
		$xmlPath = $_.FullName
		Write-Output "Formatting $xmlPath"

		([xml](Get-Content -literalPath $xmlPath)).Save($xmlPath)

		Write-Output "Tracking $xmlPath"
	}

	git add "$officePath.git"
}

# Delete abandoned extractions
Get-ChildItem .\* -Filter *.git -Recurse |
	Foreach-Object {
	If (-Not (Test-Path $_.FullName.TrimEnd(".git"))) {
		$officePath = $_.FullName
		Write-Output "Disposing $officePath"
		Remove-Item $officePath -Recurse
		git add "$officePath"
	}
}
