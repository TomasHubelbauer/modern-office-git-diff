# Tags of parent elements of text nodes whose values should be surrounded with extra blank lines in text-only output (block nodes)
$wordSurround = @()
$excelSurround = @()
$powerPointSurround = @()

# Iterate Office files in the repository
Get-ChildItem .\* -Include ("*.docx", "*.xlsx", "*.pptx") -Recurse |
	Foreach-Object {
	$officePath = $_.FullName
	$officeExt = $_.Extension
	Write-Output "Checking $officePath"
	$diff = (git diff "$officePath") | Out-String
	If (-Not ($diff)) {
		# TODO: Fix this, need to use something other than git log? Currently always skips Office files.
		#Write-Output "Skipping $officePath"
		#return
	}

	Write-Output "Extracting $officePath"

	Copy-Item $officePath "$officePath.zip"
	Expand-Archive "$officePath.zip" -DestinationPath "$officePath.git" -Force
	Remove-Item "$officePath.zip"

	# Format XML files for nice diff
	Get-ChildItem "$officePath.git" -Include ("*.xml", "*.rels") -Recurse |
		Foreach-Object {
		$xmlPath = $_.FullName
		Write-Output "Formatting $xmlPath"

		$xml = ([xml](Get-Content -literalPath $xmlPath))
		$xml.Save($xmlPath)

		# Export only text nodes for text-only lossy diff
		$txt = ""
		$nodes = $xml.SelectNodes("//text()")
		foreach ($node in $nodes) {
			$surround = $false
			switch ($officeExt) {
				".docx" { $surround = $wordSurround -contains $node.ParentNode.Name }
				".xlsx" { $surround = $excelSurround -contains $node.ParentNode.Name }
				".pptx" { $surround = $powerPointSurround -contains $node.ParentNode.Name }
			}

			if ($surround) {
				$txt += "`n" + $node.Value + "`n`n"
			}
			else {
				$txt += $node.Value + "`n"
			}
		}

		$txtPath = "$xmlPath.txt"
		Write-Output "Generating $txtPath"
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
