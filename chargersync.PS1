# Define a script block to handle cleanup
$cleanupScript = {
    Write-Host "Shutting Down" -ForegroundColor DarkBlue
    # Find the PID (Process ID) of processes using port 3000
    $pidList = netstat -ano | Select-String "3000" | ForEach-Object { $_.ToString().Trim() -split "\s+" } | Where-Object { $_ -match "\d+$" } | ForEach-Object { $_.Trim() }

    # Terminate processes using the found PID(s)
    foreach ($pid in $pidList) {
        taskkill /F /PID $pid
    }
    docker kill chargersync-backend-1
    exit 1  # Exit the script
}
# Register the cleanup script block as an event handler for the Ctrl+C event
$null = Register-ObjectEvent -InputObject ([console]) -EventName CancelKeyPress -Action $cleanupScript

$asciiArt = @"


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...................@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@......@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@........@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@..@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@........@@.........@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@..@@@@@@@@@........@@@.......@@@.....@@........@@.......@@@.....@@........@@.........@@@..@@@@...@@........@@@......@@
@..@@@@@@@@@..@@@@@..@@@@@@@@..@@..@@@@..@@@@@.@@@.@@@@@..@@..@@@@@........@@.........@@@...@@@..@@@..@@@@..@@..@@@@@@@
@..@@@@@@@@@..@@@@@..@@..@@@@..@@..@@@@@.......@@.........@@..@@@@@@@@@@@@@@@.........@@@@..@@..@@@@..@@@@..@@..@@@@@@@
@@...@@@@.@@..@@@@@..@...@@@...@@..@@@@..@@@@@@@@@..@@@@@@@@..@@@@@...................@@@@@....@@@@@..@@@@..@@...@@@@@@
@@@@@....@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@.......@@@@@...@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@@...@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.......@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@....@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


"@

function AsciiArt {
    param(
        [string]$Art
    )

    # Print the ASCII art
    Write-Output $Art
}

AsciiArt -Art $asciiArt

Write-Host "Getting ChargerSync ready..." -ForegroundColor DarkBlue
$npmInstallLogFile = "NodeJS_install_logs.txt"
$npmDevLogFile = "NodeJS_dev_logs.txt"
$dockerLogFile = "Docker_exec_logs.txt"

Set-Location ./frontend
$npmJob = Start-Job -ScriptBlock {
    param($workingDirectory)
    Set-Location $workingDirectory
    npm install > $using:npmInstallLogFile 
    npm run dev > $using:npmDevLogFile
} -ArgumentList (Get-Location)
Set-Location ..

$dockerJob = Start-Job -ScriptBlock {
    param($workingDirectory)
    Set-Location $workingDirectory

    # Start Docker service
    try {
        net start com.docker.service
    }
    catch {
        Write-Host "Error starting Docker service: $_" > $using:dockerLogFile
        exit 1
    }


    try {
        Start-Process -FilePath "C:\Program Files\Docker\Docker\DockerCli.exe" -NoNewWindow
    }
    catch {
        Write-Host "Error starting DockerCLI: $_" > $using:dockerLogFile
        exit 1
    }

    
    try {
        Start-Process -FilePath  "C:\Program Files\Docker\Docker\Docker Desktop.exe"-NoNewWindow
    }
    catch {
        Write-Host "Error starting Docker Desktop $_" > $using:dockerLogFile
        exit 1
    }

    # Start Docker Compose
    try {
        docker-compose up -d > $using:dockerLogFile
    }
    catch {
        Write-Host "Error running docker-compose: $_" > $using:dockerLogFile
        exit 1
    }
} -ArgumentList (Get-Location)


function Show-LoadingBar {
    param(
        [int]$TotalSteps
    )

    for ($i = 1; $i -le $TotalSteps; $i++) {
        # Calculate the percentage completion
        $percentage = [math]::Round(($i / $TotalSteps) * 100)
        
        # Clear the current line
        Write-Host -NoNewline "`r"

        # Draw the loading bar
        $progressWidth = [console]::WindowWidth - 20  # Adjust the width as needed
        $barLength = [math]::Round(($progressWidth * $i) / $TotalSteps)
        $bar = "-" * $barLength
        $emptySpace = " " * ($progressWidth - $barLength)
        Write-Host -NoNewline "`rProgress: [$bar$emptySpace] $percentage%" -ForegroundColor DarkBlue
        #Write-Host -NoNewline "`rProgress: [$bar$emptySpace] $percentage%" -ForegroundColor DarkBlue -BackgroundColor Gray
        # Wait for a short duration (adjust as needed)
        Start-Sleep -Milliseconds 125
    }

    Write-Host  # Move to the next line after completion
}

# Example usage:
$TotalSteps = 300  # Total number of steps
Show-LoadingBar -TotalSteps $TotalSteps


# Start the job to open localhost after npm and Docker are ready
Start-Process "http://localhost:3000"

# Wait for npm and Docker jobs to complete
$npmJob | Wait-Job
$dockerJob | Wait-Job