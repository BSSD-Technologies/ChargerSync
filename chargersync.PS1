cd ./frontend
$npmJob = Start-Job -ScriptBlock {
    param($workingDirectory)
    Set-Location $workingDirectory
    npm install
    npm run dev
} -ArgumentList (Get-Location)
cd ..
$dockerJob = Start-Job -ScriptBlock {
    param($workingDirectory)
    Set-Location $workingDirectory
    net start com.docker.service
    docker-compose up --build
} -ArgumentList (Get-Location)

$openLocalhost = {
    Start-Process "http://localhost:3000"
}

# Start the job to open localhost after npm and Docker are ready
$localHostJob = Start-Job -ScriptBlock $openLocalhost

# Wait for npm and Docker jobs to complete
$npmJob | Wait-Job
$dockerJob | Wait-Job

# Wait for localhost to open
$localHostJob | Wait-Job

# Optionally, retrieve the results if needed
Receive-Job $npmJob
Receive-Job $dockerJob
