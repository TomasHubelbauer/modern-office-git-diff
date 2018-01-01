$generatedWarning = "Generated. Do not edit. https://github.com/TomasHubelbauer/modern-office-git-diff"

# Iterate Office files in the repository
Get-ChildItem .\* -Include ("*.docx", "*.xlsx", "*.pptx") -Recurse |
	Foreach-Object {
	$officePath = $_.FullName

	Write-Output "Checking $officePath"
	$diff = (git diff --staged "$officePath") | Out-String
	If (-Not ($diff)) {
		Write-Output "Skipping $officePath"
		return
	}

	Write-Output "Extracting $officePath"
	Copy-Item $officePath "$officePath.zip"
	Expand-Archive "$officePath.zip" -DestinationPath "$officePath.git" -Force
	Remove-Item "$officePath.zip"

	"# ``" + $_.Name + "```n`n$generatedWarning" | Out-File -literalPath "$officePath.git/README.md" -Encoding UTF8

	# Format XML files for nice diff
	Get-ChildItem "$officePath.git" -Include ("*.xml", "*.rels") -Recurse |
		Foreach-Object {
		$xmlPath = $_.FullName
		$txtPath = "$xmlPath.txt"

		Write-Output "Formatting $xmlPath"
		$xml = ([xml](Get-Content -literalPath $xmlPath))
		$xml.InsertBefore($xml.CreateComment(" $generatedWarning "), $xml.DocumentElement) | Out-Null
		$xml.Save($xmlPath)

		# Export only text nodes for text-only lossy diff
		Write-Output "Generating $txtPath"
		$txt = "# $generatedWarning`n"
		$nodes = $xml.SelectNodes("//text()")
		foreach ($node in $nodes) {
			$txt += $node.Value + "`n"
		}

		$txt | Out-File -literalPath $txtPath -Encoding UTF8
	}

	Write-Output "Tracking $officePath.git"
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
