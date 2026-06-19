@echo off
setlocal enabledelayedexpansion

set "TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvcHJlbWllci1lc3NhaSIsImF1ZCI6InByZW1pZXItYXBwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl19LCJleHAiOjE3ODE3MTk4NzEsImlhdCI6MTc4MTcxNjI3MX0.XoUeKSSwxt3Bh6qAkWD9xqpMsoEVgInklwPiqZu39GM"

echo ===== TEST 1: Creer une demande =====
curl.exe -X POST "http://127.0.0.1:8000/api/demandes" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"nom\":\"Test Create\",\"email\":\"test@example.com\",\"objet\":\"Test\",\"message\":\"Ceci est un test\"}"

echo.
echo ===== TEST 2: Lister les demandes =====
curl.exe -X GET "http://127.0.0.1:8000/api/demandes" ^
  -H "Authorization: Bearer %TOKEN%"

echo.
echo ===== TEST 3: Supprimer la demande ID=10 =====
curl.exe -X DELETE "http://127.0.0.1:8000/api/demandes/10" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json"

echo.
echo Tests termines!
pause
