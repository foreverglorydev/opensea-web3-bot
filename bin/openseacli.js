#!/usr/bin/env node
import { program } from 'commander/esm.mjs';
import { starts } from '../index.js';
program.version("1.0.0");
program
    .command('start')
    .description('Start the CLI')
    .action((todo) => {
        starts()
});
program.parse(process.argv);
