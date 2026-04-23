$files = Get-ChildItem -Recurse -Include '*.jsx','*.css' | Where-Object { $_.FullName -notmatch 'node_modules' }

foreach ($file in $files) {
  $content = Get-Content -Raw $file
  
  # Replace remaining violet/purple patterns
  $content = $content -replace '::-webkit-scrollbar-thumb:hover \{ background: #7c3aed;', '::-webkit-scrollbar-thumb:hover { background: #0099cc;'
  $content = $content -replace 'border-b-2 border-violet-400', 'border-b-2 border-cyan-400'
  $content = $content -replace 'bg-violet-500/8 border border-violet-500/25', 'bg-cyan-500/8 border border-cyan-500/25'
  $content = $content -replace 'from-violet-500 to-blue-400', 'from-cyan-500 to-blue-400'
  $content = $content -replace 'bg-violet-600/20', 'bg-cyan-600/20'
  $content = $content -replace 'bg-violet-600', 'bg-cyan-600'
  $content = $content -replace '#7c3aed', '#0099cc'
  $content = $content -replace 'accent: ''violet''', 'accent: ''cyan'''
  $content = $content -replace "accent: 'violet'", "accent: 'cyan'"
  $content = $content -replace 'glow: ''bg-violet-500/20''', 'glow: ''bg-cyan-500/20'''
  $content = $content -replace 'stopColor="#7c3aed"', 'stopColor="#0099cc"'
  
  Set-Content -Path $file.FullName -Value $content
}

Write-Host "Final cleanup completed!"
