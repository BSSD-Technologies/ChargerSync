# Define paths and service name
$dockerCLI = "C:\Program Files\Docker\Docker\DockerCli.exe"
$dockerDesktop = "C:\Program Files\Docker\Docker\Docker Desktop.exe"
$dockerServiceName = "com.docker.service"
$dockerLogFile = "Dockerlogfile.txt"  # Specify the path to your log file

# Check if Docker service exists
$dockerService = Get-Service -Name $dockerServiceName
if ($dockerService -eq $null) {
    Write-Host "Docker service '$dockerServiceName' not found."
    exit 1
}

# Start Docker service if it's not running
if ($dockerService.Status -ne "Running") {
    try {
        Start-Service -Name $dockerServiceName -ErrorAction Stop
    }
    catch {
        Write-Host "Error starting Docker service: $_"
        exit 1
    }
}

# Start Docker CLI
try {
    Start-Process -FilePath $dockerCLI -NoNewWindow -Wait
}
catch {
    Write-Host "Error starting Docker CLI: $_"
    exit 1
}

# Start Docker Desktop
try {
    Start-Process -FilePath $dockerDesktop -NoNewWindow -Wait
}
catch {
    Write-Host "Error starting Docker Desktop: $_"
    exit 1
}

# Start a job to run docker-compose
$dockerJob = Start-Job -ScriptBlock {
    param($workingDirectory)
    Set-Location $workingDirectory

    # Run docker-compose up command to build and start services defined in docker-compose.yml
    try {
        docker-compose up --build | Out-File -FilePath $using:dockerLogFile -Append
    }
    catch {
        Write-Host "Error running docker-compose: $_"
        exit 1
    }
} -ArgumentList (Get-Location)

# Wait for the job to finish
Wait-Job $dockerJob

# Retrieve job results if needed
$dockerJobResults = Receive-Job $dockerJob

# Display job results if needed
Write-Host $dockerJobResults

# Remove the job from the job list
Remove-Job $dockerJob
