use anchor_lang::prelude::*;
use pyth_sdk_solana::{load_price_feed_from_account_info, PriceFeed};
use anchor_spl::token::{Mint, Token, TokenAccount, Transfer};

declare_id!("2iFXrFurDAZwv5HZHebiTgE4p2GoKkokw8F3fjKnPy4s");

const PREDICTION_SEED: &'static [u8] = b"prediction";
const POOL_SEED: &'static [u8] = b"betting_pool";

#[program]
pub mod pyth_stake {
    use super::*;

    pub fn create_prediction(ctx: Context<CreatePrediction>, asset_name: String, predicted_price: i64, holdout_period_sec: u64, bid_amount: u64) -> Result<()> {

        let price_account_info = &mut ctx.accounts.asset_price_record;
        // let price_feed = load_price_feed_from_account_info( &price_account_info ).unwrap();
        // let current_price = price_feed.get_current_price().unwrap();

        // if current_price.price > predicted_price {
        //     ctx.accounts.base_account.direction = String::from("DOWN");
        // }
        // else {
        //     ctx.accounts.base_account.direction = String::from("UP");
        // }

        ctx.accounts.base_account.asset                     = asset_name;
        // ctx.accounts.base_account.is_correct                = false;
        // ctx.accounts.base_account.expiry_date               = (holdout_period_sec as i64) + Clock::get().unwrap().unix_timestamp;
        // // ctx.accounts.base_account.bidder_token_wallet_key   = ctx.accounts.wallet_to_withdraw_from.key();
        // ctx.accounts.base_account.pyth_product_public_key   = ctx.accounts.asset_record.key();
        // ctx.accounts.base_account.pyth_price_public_key     = ctx.accounts.asset_price_record.key();
        // ctx.accounts.base_account.entry_price               = current_price.price;
        // ctx.accounts.base_account.validation_price          = predicted_price;
        // ctx.accounts.base_account.bid_amount                = bid_amount;


        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(asset_name: String)]
pub struct CreatePrediction<'info> {
    #[account(init, payer = authority, seeds = [PREDICTION_SEED, asset_name.as_ref(), authority.key().as_ref()], bump, space = 800)]
    pub base_account: Account<'info, PredictionRecord>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    ///CHECK:
    pub asset_record: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK:
    pub asset_price_record: AccountInfo<'info>,
    // pub wallet_to_withdraw_from: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct PredictionRecord {
    pub direction: String, // 4
    pub asset: String, // 15
    pub is_correct: bool, // 1
    pub expiry_date: i64, 
    pub bidder_token_wallet_key: Pubkey, // 32
    pub pyth_product_public_key: Pubkey, // 32
    pub pyth_price_public_key: Pubkey, // 32
    pub validation_date: i64,
    pub entry_price: i64,
    // pub entry_expo: i32,
    pub validation_price: i64,
    // pub validation_expo: i32,
    pub bid_amount: u64, // 8
}
