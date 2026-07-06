# Delete 13 legacy GitHub repos after: gh auth refresh -h github.com -s delete_repo
$ErrorActionPreference = "Continue"
$sm = @(
  "shiksha-mahakumbh/vbe.rase.co.in",
  "shiksha-mahakumbh/vie.rase.co.in",
  "shiksha-mahakumbh/vbh.rase.co.in",
  "shiksha-mahakumbh/vih.rase.co.in",
  "shiksha-mahakumbh/sm24.rase.co.in",
  "shiksha-mahakumbh/ac.shikshamahakumbh.com",
  "shiksha-mahakumbh/rase.backend"
)
$dhevb = @(
  "dhevb/nitsri-dhe-org-in",
  "dhevb/nitkkr-dhe-org-in",
  "dhevb/nitj-dhe-org-in",
  "dhevb/iitr-dhe-org-in",
  "dhevb/Vie_rase_backend",
  "dhevb/sm25.rase.co.in"
)

$scopes = (gh auth status 2>&1 | Out-String)
if ($scopes -notmatch "delete_repo") {
  Write-Host "Missing delete_repo scope. Run: gh auth refresh -h github.com -s delete_repo"
  exit 1
}

function Remove-Repos($repos) {
  $ok = 0
  $fail = 0
  foreach ($r in $repos) {
    Write-Host "Deleting $r ..."
    gh repo delete $r --yes
    if ($LASTEXITCODE -eq 0) { $ok++ } else { $fail++ }
  }
  return @{ ok = $ok; fail = $fail }
}

Write-Host "=== shiksha-mahakumbh repos (account: shiksha-mahakumbh) ==="
$smResult = Remove-Repos $sm
Write-Host "shiksha-mahakumbh: $($smResult.ok) deleted, $($smResult.fail) failed"

Write-Host "=== dhevb repos (requires dheWeb org admin — run: gh auth login -s delete_repo) ==="
$dhevbResult = Remove-Repos $dhevb
Write-Host "dhevb: $($dhevbResult.ok) deleted, $($dhevbResult.fail) failed"

$totalFail = $smResult.fail + $dhevbResult.fail
exit $(if ($totalFail -gt 0) { 1 } else { 0 })
