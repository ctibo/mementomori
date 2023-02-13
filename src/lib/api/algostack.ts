import type { PlugableModules, OptionsProps } from 'algostack';
import  AlgoStack from 'algostack';
import Query from 'algostack/query';
// import Addons from 'algostack/addons'
import NFDs from 'algostack/nfds';
import Medias from 'algostack/medias';
import Cache from 'algostack/cache';
import Client from 'algostack/client';
import Txns from 'algostack/txns';

const modules: PlugableModules = { 
  Query, 
  NFDs,
  Medias,
  Cache,
  Client,
  Txns,
};

const options: OptionsProps = {
  version: 3,
  storageNamespace: 'allo-pop',
  customCaches: [
    'algonode/graphql',
    'nfds/consensus',
  ],
  cacheExpiration: {
    'account': '1m',
    'accountAssets': '10s',
    'nfds': '5s',
    'medias': '5s',
    'algonode/graphql': '5s',
    'nfds/consensus': '5m',
  },
}
const algostack = new AlgoStack(options, modules);
export default algostack;