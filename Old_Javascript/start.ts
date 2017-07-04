#!/usr/bin/env node
"use strict";
import * as server from './dist/models/server';
import * as config from './config.json';

export var RunningServer = new server.Server(config);