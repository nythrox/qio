/**
 * Created by tushar on 2019-04-21
 */
import {testScheduler} from 'ts-scheduler/test'

import {AnyEnv} from '../../src/envs/AnyEnv'
import {FIO} from '../../src/internals/FIO'

import {ForkNRun} from './ForkNRun'

export const GetTimeline = <A>(io: FIO<AnyEnv, A>) =>
  ForkNRun({scheduler: testScheduler()}, io).timeline