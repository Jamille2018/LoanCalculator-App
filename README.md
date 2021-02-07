Loan Calculator Application using Angular 11 and .NET Core 2.1 + Entity Framework

Prerequisites:
.NET Core 2.1 SDK
Visual Studio 2017 or higher
Node.js 
Angular CLI

Setting up the environment for Angular application:
1. Once you are done cloning the project into your local, find the Angular app folder: LoanCalculator/LoanCalculatorApp
2. In the LoanCalculatorApp folder, run the ff commands in order:

	>> npm install
	
	>> npm install -g @angular/cli command
	
	>> npm install --save-dev @angular-devkit/build-angular command
  
Note: There is no need to serve the angular application separately since it is configured already to start using IIS at the same time with the back-end.

Setting up the database and Entity Framework migrations: 
1. Open the solution in Visual Studio and remove the contents of the folder named 'Migrations'.
2. Go to Tools-> Nuget Package Manager-> Package Manager Console and run the following commands:

	>> Add-Migration Initial
	
	>> Update-Database

Running the Application:
1. In Visual Studio, run the application using IIS. A browser should open and serve the application.

Debugging:
When you encounter a timeout error when running the application, try reloading the page.

For further concerns, you can reach to me directly at chuajamille17@gmail.com

Have fun!
