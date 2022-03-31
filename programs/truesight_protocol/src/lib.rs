use anchor_lang::prelude::*;
// use anchor_spl::token::*;
use pyth_client::{
    Product,
    Price,
    PriceType,
    PriceInfo,
    load_mapping,
    load_product,
    load_price
};

use solana_program::{
  pubkey::Pubkey
};


// account address where the program is deployed - DevNet and LocalNet
declare_id!("4338bCaJ8TjcNGmqhQs1FPHZsq2k4PQw15sgNXaEgogw");
const MINIMUM_HOLDOUT_SEC: u64 = 5;

#[program]
pub mod truesight_protocol {
    use super::*;
    use pyth_client;

    pub fn create_prediction(ctx: Context<CreatePrediction>, direction: String, holdout_period_sec: u64) -> ProgramResult {
        let prediction_record   = &mut ctx.accounts.prediction_record;

        // Fetch production information from Pyth.Network
        let pyth_product                = &ctx.accounts.asset_record;
        let pyth_product_data           = &pyth_product.try_borrow_data()?;
        let product_account: Product    = *load_product(pyth_product_data).unwrap();

        // Fetch price information from Pyth.Network
        let pyth_price_info = &ctx.accounts.asset_price_record;
        let pyth_price_data = &pyth_price_info.try_borrow_data()?;
        let price_account: Price = *load_price(pyth_price_data).unwrap();

        if holdout_period_sec >= MINIMUM_HOLDOUT_SEC {

            for (key, val) in product_account.iter() {
                if key == "symbol" {
                    prediction_record.asset = val.to_string();
                } else if key == "product_account" {
                    prediction_record.pyth_product_public_key = val.to_string();
                }
            }

            prediction_record.direction                 = direction;
            prediction_record.expiry_date               = (holdout_period_sec as i64) + Clock::get().unwrap().unix_timestamp;
            
            prediction_record.pyth_price_public_key     = pyth_price_info.key.to_string();
            prediction_record.entry_price               = price_account.agg.price;

            // TODO: Trigger SPL token transfer to our DAO's betting wallet            
        }

        Ok(())
    }

    pub fn validate_prediction(ctx: Context<ValidatePrediction>) -> ProgramResult {
        let prediction_record = &mut ctx.accounts.prediction_record;

        // Fetch price information from Pyth.Network
        let pyth_price_info = &ctx.accounts.asset_price_record;
        let pyth_price_data = &pyth_price_info.try_borrow_data()?;
        let price_account: Price = *load_price(pyth_price_data).unwrap();                

        if prediction_record.asset != "" && 
            Clock::get().unwrap().unix_timestamp > prediction_record.expiry_date && 
            prediction_record.pyth_price_public_key == pyth_price_info.key.to_string() {

                prediction_record.validation_date   = Clock::get().unwrap().unix_timestamp;
                prediction_record.validation_price  = price_account.agg.price;


                prediction_record.is_correct = false;

                if prediction_record.direction == "UP" &&  
                    prediction_record.entry_price < prediction_record.validation_price {
                        prediction_record.is_correct = true;

                } else if prediction_record.direction == "DOWN" &&  
                    prediction_record.entry_price > prediction_record.validation_price {

                        prediction_record.is_correct = true;
                }

                if prediction_record.is_correct {
                    // TODO: Trigger SPL token transfer from our DAO's betting wallet
                    // TODO: Write to web3.storage for permanent storage
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
    pub asset_record: UncheckedAccount<'info>,    
    pub asset_price_record: UncheckedAccount<'info>,
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ValidatePrediction<'info> {
    #[account(mut)]
    pub prediction_record: Account<'info, PredictionRecord>,
    pub asset_price_record: UncheckedAccount<'info>,
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}



#[account]
pub struct PredictionRecord {
    pub direction: String,
    pub asset: String,
    pub is_correct:bool,
    pub expiry_date: i64,
    pub pyth_product_public_key: String,
    pub pyth_price_public_key: String,
    pub validation_date: i64,
    pub entry_price: i64,
    pub validation_price: i64,
}
