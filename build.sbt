name := """explore_archives"""
organization := "com.explorearchives"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.2"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.0.0" % Test
libraryDependencies += "org.mongodb" %% "casbah" % "3.1.1"
libraryDependencies += "com.github.salat" %% "salat" % "1.11.0"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.explorearchives.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.explorearchives.binders._"
