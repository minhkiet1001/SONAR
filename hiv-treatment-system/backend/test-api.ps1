# Test Register API
Write-Host "Testing Register API..." -ForegroundColor Green

$registerBody = @{
    name = "Test Admin"
    email = "admin@test.com"
    password = "password123"
    role = "ADMIN"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/register" -Method POST -ContentType "application/json" -Body $registerBody
    Write-Host "Register Success:" -ForegroundColor Green
    $registerResponse | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Register Failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host "`n" -NoNewline

# Test Login API
Write-Host "Testing Login API..." -ForegroundColor Green

$loginBody = @{
    email = "admin@test.com"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
    Write-Host "Login Success:" -ForegroundColor Green
    $loginResponse | ConvertTo-Json -Depth 3
    
    # Test protected endpoint
    if ($loginResponse.token) {
        Write-Host "`nTesting Protected Endpoint..." -ForegroundColor Green
        $headers = @{
            "Authorization" = "Bearer " + $loginResponse.token
        }
        
        $userResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/test/user" -Method GET -Headers $headers
        Write-Host "User Info Success:" -ForegroundColor Green
        $userResponse | ConvertTo-Json -Depth 3
    }
} catch {
    Write-Host "Login Failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message
} 