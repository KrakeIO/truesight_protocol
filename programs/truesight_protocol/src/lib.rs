use anchor_lang::prelude::*;

// Testing account
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

    pub fn create_prediction(ctx: Context<Initialize>, asset_name: String, direction: u64 ) -> ProgramResult {
        let prediction_account = &mut ctx.accounts.prediction_account;
        prediction_account.direction = direction;
        prediction_account.asset = asset_name;
        Ok(())
    }

    pub fn validate_prediction(ctx: Context<Initialize>) -> ProgramResult {
        let prediction_account = &mut ctx.accounts.prediction_account;
        prediction_account.is_correct = true;
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

#[derive(Accounts)]
pub struct CreatePrediction<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub prediction_account: Account<'info, PredictionAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ValidatePrediction<'info> {
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
    pub is_correct:bool,
}
