# 🧑‍💼 EmployeeApp — .NET 8 & React.js

This project is a clean, modular fullstack Employee Management system built using:

 👉 You can now check the demo [here](https://www.loom.com/share/9e1e345e2fcc4cfcb1553331dad6f4e6?sid=6e25f2c6-373e-4cb6-9ee4-c5f8cb4bdf30)

- ✅ **Backend**: .NET 8 Web API with Clean Architecture
- 🌐 **Frontend**: React.js (bootstrapped with Create React App)
- 🗄️ **Database**: SQLite + Entity Framework Core
- 🧪 **Testing**: xUnit


---

## 📁 Project Structure
```bash
employeeapp/
├── EmployeeApp/ # Backend API
├── EmployeeApp.Application/ # Application layer
├── EmployeeApp.Domain/ # Domain entities & interfaces
├── EmployeeApp.Infrastructure/ # Data, EF, services
├── EmployeeApp.Tests/ # Unit tests (xUnit)
client/ # React.js frontend
```


---

## 🚀 Getting Started (Manual Setup)

### 🔧 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- SQLite (or leave EF to auto-create)
- Visual Studio or VS Code

---

## ⚙️ Backend (.NET 8 API)

### 1. Install dependencies

```bash
dotnet restore
```
### 2. Apply EF Core migrations

```bash
cd EmployeeApp.Infrastructure
dotnet ef database update --project EmployeeApp.Infrastructure --startup-project ../EmployeeApp
```
### 3. Run the API

```bash
cd ../EmployeeApp
dotnet run
```
### 4. Access Swagger

```bash
https://localhost:5299/swagger
```

## 🌐 Frontend (React.js)

### 1. Install dependencies

```bash
cd client
npm install
```
### 2. Configure environment
Create a .env file:
```bash
REACT_APP_API_BASE_URL=https://localhost:5299
```
### 3. Run the React app  
```bash
npm start
```
Frontend will be available at:
```bash
http://localhost:3000
``` 

## 🧪 Testing

### 1. Install dependencies

```bash
dotnet test EmployeeApp.Tests
```

## 🗃️ Database
This project uses SQLite with Entity Framework Core.
### 🔌 Connection String
Defined in EmployeeApp/appsettings.json:
```bash
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=../EmployeeApp.Infrastructure/app.db"
  }
}
```

## 🐳 Running with Docker
### 1. Build & Run
```bash
docker-compose up --build
```
- Backend: http://localhost:5000

- Frontend: http://localhost:3000

- Swagger: http://localhost:5000/swagger

### 2. Docker Environment Variables
In .env file or Docker Compose:
```bash
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__DefaultConnection=Data Source=app.db
REACT_APP_API_BASE_URL=http://localhost:5000
```

## ✅ Available Scripts

### 🧠 Backend (.NET 8)

- Run API
```bash
dotnet run --project EmployeeApp
```
- Run Tests
```bash
dotnet test
``` 

### 💻 Frontend (React.js)
- Start Dev Server 
```bash
npm start
```
- Run Tests 
```bash
npm test
```
- Production Build
```bash
npm run build
```
