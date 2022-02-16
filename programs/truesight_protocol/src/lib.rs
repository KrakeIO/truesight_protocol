use anchor_lang::prelude::*;

// Testing account
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
const MINIMUM_HOLDOUT_SEC: u64 = 5;

#[program]
pub mod truesight_protocol {
    use super::*;

    pub fn create_prediction(ctx: Context<CreatePrediction>, asset_name: String, direction: u64, holdout_period_sec: u64) -> ProgramResult {
        let prediction_record = &mut ctx.accounts.prediction_record;

        // TODO: Trigger SPL token transfer to our DAO's betting wallet

        if(holdout_period_sec >= MINIMUM_HOLDOUT_SEC) {
            prediction_record.direction     = direction;
            prediction_record.expiry_date   = (holdout_period_sec as i64) + Clock::get().unwrap().unix_timestamp;
            prediction_record.asset         = asset_name;    
        }

        Ok(())
    }

    pub fn validate_prediction(ctx: Context<ValidatePrediction>) -> ProgramResult {
        let prediction_record = &mut ctx.accounts.prediction_record;

        if (
            prediction_record.asset != "" && 
            Clock::get().unwrap().unix_timestamp > prediction_record.expiry_date
        ) {
            
            prediction_record.validation_date = Clock::get().unwrap().unix_timestamp;

            // TODO: Check against Pyth.Network and determine if prediction was correct
            prediction_record.is_correct = true;            

            if(prediction_record.is_correct) {
                // TODO: Trigger SPL token transfer from our DAO's betting wallet
            }
        }

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
    pub expiry_date: i64,
    pub validation_date: i64,    
}
