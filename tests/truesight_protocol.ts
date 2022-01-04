import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TruesightProtocol } from '../target/types/truesight_protocol';

describe('truesight_protocol', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.TruesightProtocol as Program<TruesightProtocol>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
