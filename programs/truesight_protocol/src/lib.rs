use anchor_lang::prelude::*;

// Testing account
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod truesight_protocol {
    use super::*;

    pub fn create_prediction(ctx: Context<CreatePrediction>, asset_name: String, direction: u64 ) -> ProgramResult {
        let prediction_record = &mut ctx.accounts.prediction_record;
        prediction_record.direction = direction;
        prediction_record.asset = asset_name;
        Ok(())
    }

    pub fn validate_prediction(ctx: Context<ValidatePrediction>) -> ProgramResult {
        let prediction_record = &mut ctx.accounts.prediction_record;
        prediction_record.is_correct = true;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct CreatePrediction<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub prediction_record: Account<'info, PredictionRecord>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ValidatePrediction<'info> {
    #[account(mut)]
    pub prediction_record: Account<'info, PredictionRecord>,
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PredictionRecord {
    pub direction: u64,
    pub asset: String,
    pub is_correct:bool,
}
