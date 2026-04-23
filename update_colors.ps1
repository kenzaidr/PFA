$files = @(
    'Login.jsx','Register.jsx','StudentLogin.jsx','RecruiterLogin.jsx',
    'SchoolLogin.jsx','StudentRegister.jsx','RecruiterRegister.jsx',
    'SchoolRegister.jsx','StudentDashboard.jsx','RecruiterDashboard.jsx',
    'SchoolDashboard.jsx','CVUpload.jsx','Checkout.jsx'
)

foreach ($f in $files) {
    $path = "c:\Users\adaym\Desktop\teeest\src\pages\$f"
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        $content = $content `
            -replace 'bg-\[#101844\]', 'bg-[#0f1035]' `
            -replace '#101844', '#0f1035' `
            -replace 'text-cyan-400', 'text-blue-400' `
            -replace 'text-cyan-300', 'text-blue-300' `
            -replace 'border-cyan-500/30', 'border-blue-700/30' `
            -replace 'border-cyan-500/50', 'border-blue-700/50' `
            -replace 'border-cyan-500/40', 'border-blue-600/40' `
            -replace 'bg-cyan-600/30', 'bg-blue-800/30' `
            -replace 'bg-cyan-500/20', 'bg-blue-700/20' `
            -replace 'bg-cyan-500/15', 'bg-blue-700/15' `
            -replace 'bg-cyan-500/10', 'bg-blue-700/10' `
            -replace 'bg-cyan-600', 'bg-red-700' `
            -replace 'bg-cyan-400', 'bg-blue-500' `
            -replace 'shadow-cyan-500/30', 'shadow-red-700/30' `
            -replace 'shadow-cyan-500/40', 'shadow-red-700/40' `
            -replace 'from-cyan-500', 'from-blue-700' `
            -replace 'from-cyan-600', 'from-blue-800' `
            -replace 'to-cyan-400', 'to-blue-500' `
            -replace 'to-cyan-500', 'to-blue-600' `
            -replace 'hover:text-cyan-300', 'hover:text-blue-300' `
            -replace 'hover:border-cyan-500', 'hover:border-blue-600' `
            -replace 'focus:border-cyan-500', 'focus:border-blue-600' `
            -replace 'focus:ring-cyan', 'focus:ring-blue' `
            -replace 'accent-cyan-500', 'accent-blue-600' `
            -replace '#0099cc', '#1e3a8a' `
            -replace '#00b4d8', '#2563eb' `
            -replace '#00d4ff', '#3b82f6' `
            -replace 'cyan-400', 'blue-400' `
            -replace 'cyan-500', 'blue-600' `
            -replace 'cyan-600', 'blue-700' `
            -replace 'cyan-700', 'blue-800' `
            -replace 'cyan-300', 'blue-300'
        Set-Content $path $content -NoNewline
        Write-Host "Updated: $f"
    }
}

# Also update Icons.jsx
$iconsPath = "c:\Users\adaym\Desktop\teeest\src\components\Icons.jsx"
if (Test-Path $iconsPath) {
    $content = Get-Content $iconsPath -Raw
    $content = $content `
        -replace '#0099cc', '#1e3a8a' `
        -replace '#00b4d8', '#2563eb' `
        -replace '#00d4ff', '#3b82f6' `
        -replace 'cyan', 'blue'
    Set-Content $iconsPath $content -NoNewline
    Write-Host "Updated: Icons.jsx"
}

Write-Host "`nAll files updated with ESISA colors!"
