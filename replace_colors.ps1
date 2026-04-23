$files = Get-ChildItem -Recurse -Include '*.jsx','*.css' | Where-Object { $_.FullName -notmatch 'node_modules' }

foreach ($file in $files) {
  $content = Get-Content -Raw $file
  
  # Replace all violet/purple colors with cyan/blue ESISA colors
  $content = $content -replace 'text-violet-400', 'text-cyan-400'
  $content = $content -replace 'text-violet-300', 'text-cyan-300'
  $content = $content -replace 'text-violet-600', 'text-cyan-600'
  $content = $content -replace 'bg-violet-700/8', 'bg-cyan-700/8'
  $content = $content -replace 'from-violet-500/5', 'from-cyan-500/5'
  $content = $content -replace 'from-violet-500/20', 'from-cyan-500/20'
  $content = $content -replace 'from-violet-500/30', 'from-cyan-500/30'
  $content = $content -replace 'border-violet-500/30', 'border-cyan-500/30'
  $content = $content -replace 'to-purple-500/20', 'to-blue-500/20'
  $content = $content -replace 'to-purple-400', 'to-blue-400'
  $content = $content -replace 'from-violet-400', 'from-cyan-400'
  $content = $content -replace 'focus:border-violet-500/60', 'focus:border-cyan-500/60'
  $content = $content -replace 'accent-violet-500', 'accent-cyan-500'
  $content = $content -replace 'hover:shadow-violet-500/20', 'hover:shadow-cyan-500/20'
  $content = $content -replace 'hover:border-violet-500/40', 'hover:border-cyan-500/40'
  $content = $content -replace 'from-violet-500 to-purple-600', 'from-cyan-500 to-blue-600'
  $content = $content -replace 'from-violet-600 to-purple-600', 'from-cyan-600 to-blue-600'
  $content = $content -replace '#a78bfa', '#0099cc'
  $content = $content -replace '#c084fc', '#00d4ff'
  $content = $content -replace '#22d3ee', '#00b4d8'
  $content = $content -replace '#07070f', '#001f3d'
  $content = $content -replace '#0d0d1a', '#0a1e3e'
  $content = $content -replace 'bg-gradient-to-r from-violet-600 to-purple-600', 'bg-gradient-to-r from-cyan-600 to-blue-600'
  
  Set-Content -Path $file.FullName -Value $content
  Write-Host "Updated: $($file.Name)"
}

Write-Host "Replacement completed!"
