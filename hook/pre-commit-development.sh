# This hook also runs tests and is intended only for this repository.
# For repositories other than this, use `pre-commit.sh`.
#!/usr/bin/env bash
if [ ! -z "command -v powershell" ]
then
  powershell cmd/version-office-files.ps1
elif [ ! -z "command -v pwsh" ]
then
  pwsh cmd/version-office-files.ps1
else
  echo "PowerShell is not installed."
fi
