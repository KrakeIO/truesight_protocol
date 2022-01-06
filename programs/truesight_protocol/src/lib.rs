use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod truesight_protocol {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, asset_name: String) -> ProgramResult {
        let prediction_account = &mut ctx.accounts.prediction_account;
        prediction_account.direction = 1;
        prediction_account.asset = asset_name;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub prediction_account: Account<'info, PredictionAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[account]
pub struct PredictionAccount {
    pub direction: u64,
    pub asset: String,
}
