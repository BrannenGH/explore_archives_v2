#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server = require("./dist/models/server");
var config = require("./config.json");
exports.RunningServer = new server.Server(config);
