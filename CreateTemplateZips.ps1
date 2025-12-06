# Ensure the downloads directory exists
$downloadsDir = "d:\Projects\PickWeb\downloads"
if (-not (Test-Path -Path $downloadsDir)) {
    New-Item -ItemType Directory -Path $downloadsDir
}

# Function to create a zip file
function Create-ZipFile {
    param (
        [string]$sourceDir,
        [string]$zipPath
    )
    try {
        # Create a temporary directory to store the files
        $tempDir = [System.IO.Path]::GetTempPath() + [System.Guid]::NewGuid().ToString()
        New-Item -ItemType Directory -Path $tempDir | Out-Null
        
        # Copy all files and directories to the temp directory
        Get-ChildItem -Path $sourceDir | ForEach-Object {
            $destination = Join-Path -Path $tempDir -ChildPath $_.Name
            Copy-Item -Path $_.FullName -Destination $destination -Recurse -Force
        }
        
        # Create the zip file
        Add-Type -Assembly System.IO.Compression.FileSystem
        [System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $zipPath)
        
        # Clean up the temporary directory
        Remove-Item -Path $tempDir -Recurse -Force
        
        Write-Host "Created: $zipPath" -ForegroundColor Green
    } catch {
        Write-Host "Error creating $zipPath : $_" -ForegroundColor Red
    }
}

# Get all template directories
$baseDir = "d:\Projects\PickWeb"
$templateDirs = Get-ChildItem -Path $baseDir -Directory | 
    Where-Object { $_.Name -match '^(Portfolio_\d+|Resturant_template_\d+|Textile_template_\d+)$' }

Write-Host "Creating zip files for all templates..." -ForegroundColor Cyan

foreach ($dir in $templateDirs) {
    $zipName = "$($dir.Name).zip"
    $zipPath = Join-Path -Path $downloadsDir -ChildPath $zipName
    $sourcePath = $dir.FullName
    
    # Skip if zip already exists and is newer than the source
    if ((Test-Path $zipPath) -and ((Get-Item $zipPath).LastWriteTime -gt $dir.LastWriteTime)) {
        Write-Host "Skipping $zipName (up to date)" -ForegroundColor Gray
        continue
    }
    
    Create-ZipFile -sourceDir $sourcePath -zipPath $zipPath
}

Write-Host "`nAll template zip files have been created in the downloads directory." -ForegroundColor Green
Write-Host "Location: $downloadsDir" -ForegroundColor Cyan
