#!/bin/bash
trap cleanup SIGINT

cleanup(){
    lsof -ti tcp:3000 | xargs kill -9
    exit
}

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "Docker is not installed. Please install Docker to continue."
        exit 1
    fi
}

# Function to check if Docker Compose is installed
check_docker_compose() {
    if ! command -v docker compose &> /dev/null; then
        echo "Docker Compose is not installed. Please install Docker Compose to continue."
        exit 1
    fi
}

# Function to check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        echo "npm is not installed. Please install npm to continue."
        exit 1
    fi
}

# Function to build Docker Compose services in the backend directory
build_docker_compose_backend() {
    echo "Building Docker Compose services in the backend directory..."
    cd backend || exit
    docker compose up --build &
    cd ..
}

# Function to run npm rundev in the frontend directory
run_npm_rundev_frontend() {
    echo "Running npm rundev in the frontend directory..."
    cd frontend || exit
    npm run dev &
    cd ..
}

# Function to launch the primary browser to localhost:3000
launch_browser() {
    echo "Launching browser to localhost:3000..."
    sleep 5 # Wait for services to start

    # Determine the operating system
    case "$(uname -s)" in
        Linux*)     xdg-open "http://localhost:3000";;
        Darwin*)    open "http://localhost:3000";;
        CYGWIN*)    start "" "http://localhost:3000";;
        MINGW*)     start "" "http://localhost:3000";;
        *)          echo "Unsupported operating system.";;
    esac
}

# Main function
main() {
    check_docker
    check_docker_compose
    check_npm

    build_docker_compose_backend &
    run_npm_rundev_frontend &  
    wait
    launch_browser
}

# Run the main function
main
