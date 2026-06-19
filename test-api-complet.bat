@echo off
setlocal enabledelayedexpansion

REM ===== CONFIGURATION =====
set "BASE_URL=http://127.0.0.1:8000/api"
set "TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvcHJlbWllci1lc3NhaSIsImF1ZCI6InByZW1pZXItYXBwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl19LCJleHAiOjE3ODE3MTk4NzEsImlhdCI6MTc4MTcxNjI3MX0.XoUeKSSwxt3Bh6qAkWD9xqpMsoEVgInklwPiqZu39GM"
set "FRONTEND_URL=http://localhost:5173"

cls
echo ============================================================
echo           TESTS D'API COMPLETS - BACKEND ET FRONTEND
echo ============================================================
echo.

REM ===== TEST 1: Tester sans token (doit échouer 401) =====
echo [TEST 1] ===== Appel SANS token (attendu: 401) =====
curl.exe -X GET "%BASE_URL%/demandes" -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 2: Tester le token (doit réussir) =====
echo [TEST 2] ===== Vérifier le token avec /api/test-token =====
curl.exe -X GET "%BASE_URL%/test-token" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 3: Lister les demandes (GET) =====
echo [TEST 3] ===== Lister TOUTES les demandes (GET) =====
curl.exe -X GET "%BASE_URL%/demandes" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 4: Créer une demande (POST) =====
echo [TEST 4] ===== Créer une NOUVELLE demande (POST) =====
for /f %%A in ('powershell -Command "Get-Date -Format 'HH:mm:ss'"') do set "TIME=%%A"
curl.exe -X POST "%BASE_URL%/demandes" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"nom\":\"Test %TIME%\",\"email\":\"test@example.com\",\"objet\":\"Test Curl\",\"message\":\"Demande de test créée via curl\"}" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 5: Lister après création =====
echo [TEST 5] ===== Lister les demandes APRÈS création =====
curl.exe -X GET "%BASE_URL%/demandes" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 6: Récupérer UNE demande =====
echo [TEST 6] ===== Récupérer la demande ID=1 (GET) =====
curl.exe -X GET "%BASE_URL%/demandes/1" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 7: Modifier une demande =====
echo [TEST 7] ===== Modifier la demande ID=1 (PUT) =====
curl.exe -X PUT "%BASE_URL%/demandes/1" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"nom\":\"Modifiée par Curl\",\"email\":\"modifie@example.com\",\"objet\":\"Sujet modifié\",\"message\":\"Message modifié\"}" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 8: Profil utilisateur =====
echo [TEST 8] ===== Voir profil utilisateur /api/profile =====
curl.exe -X GET "%BASE_URL%/profile" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 9: Admin endpoint =====
echo [TEST 9] ===== Vérifier accès /api/admin =====
curl.exe -X GET "%BASE_URL%/admin" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

REM ===== TEST 10: Contact public =====
echo [TEST 10] ===== Tester route publique /api/contacts (sans token) =====
curl.exe -X GET "%BASE_URL%/contacts" ^
  -H "Content-Type: application/json" ^
  -w "\nHTTP Status: %%{http_code}\n\n"
timeout /t 1 /nobreak > nul

echo.
echo ============================================================
echo                    RÉSUMÉ DES TESTS
echo ============================================================
echo.
echo [✓] Tests complétés!
echo.
echo Les codes HTTP attendus:
echo   - 200 = OK
echo   - 201 = Créé
echo   - 401 = Non autorisé (token manquant/invalide)
echo   - 403 = Accès refusé (rôle insuffisant)
echo   - 404 = Non trouvé
echo.
echo Frontend: %FRONTEND_URL%
echo Backend:  %BASE_URL%
echo.
echo Pour tester depuis le frontend, allez à:
echo   %FRONTEND_URL%/ListeDemandes
echo.
pause
