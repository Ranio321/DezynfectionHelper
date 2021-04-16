#FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
#WORKDIR /app
#
## Copy csproj and restore as distinct layers
#COPY *.csproj ./
#RUN dotnet restore
#
## Copy everything else and build
#COPY . ./
#RUN dotnet publish -c Release -o out
#
#ENV ASPNETCORE_URLS=http://*:44319
#ENV ASPNETCORE_
#EXPOSE 44319
#
## Build runtime image
#FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
#WORKDIR /app
#COPY --from=build-env /app/out .
#ENTRYPOINT ["dotnet", "DezynfectionHelper.dll"]

# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.csproj ./DezynfectionHelper/
WORKDIR /source/DezynfectionHelper
RUN dotnet restore

# copy everything else and build app
COPY . ./
WORKDIR /source/DezynfectionHelper
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:44319
ENV ASPNETCORE_ENVIRONMENT=Development
EXPOSE 44319
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "DezynfectionHelper.dll"]