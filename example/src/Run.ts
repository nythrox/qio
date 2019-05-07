/**
 * Created by tushar on 2019-05-05
 */

import {prompt} from 'promptly'

import {defaultRuntime} from '../../src/runtimes/DefaultRuntime'

import {program} from './Program'

program.fork({
  ...defaultRuntime(),
  console: {
    getStrLn: prompt,
    // tslint:disable-next-line:no-console
    putStrLn: (message: string) => console.log(message)
  },
  random: {
    random: () => Math.random()
  },
  system: {
    exit(code: number): void {
      process.exit(code)
    }
  }
})