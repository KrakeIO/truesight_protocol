use anchor_lang::prelude::*;
use pyth_sdk_solana::{load_price_feed_from_account_info, PriceFeed};

declare_id!("2iFXrFurDAZwv5HZHebiTgE4p2GoKkokw8F3fjKnPy4s");

#[program]
pub mod pyth_stake {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {

        let prediction_record   = &mut ctx.accounts.base_account;

        let price_account_info = &mut ctx.accounts.asset_price_record;
        let price_feed = load_price_feed_from_account_info( &price_account_info ).unwrap();
        let current_price = price_feed.get_current_price().unwrap();
        msg!("{}", current_price.price);
        prediction_record.asset_record = current_price.price.to_string();

            // Fetch product information from Pyth.Network
            // let pyth_product                = &ctx.accounts.asset_record;
            // let pyth_product_data           = &pyth_product.try_borrow_data()?;
            // let product_account: Product    = *load_product(pyth_product_data).unwrap();
            
            // // Fetch price information from Pyth.Network
            // let pyth_price_info = &ctx.accounts.asset_price_record;
            // let pyth_price_data = &pyth_price_info.try_borrow_data()?;
            // let price_account: Price = *load_price(pyth_price_data).unwrap();
            
            // for (key, val) in product_account.iter() {
            //     if key == "symbol" {
            //         msg!(&val.to_string());
            //         // prediction_record.asset = val.to_string();

            //     }
            // }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 800)]
    pub base_account: Account<'info, PredictionRecord>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    ///CHECK:
    pub asset_record: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK:
    pub asset_price_record: AccountInfo<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct PredictionRecord {
    pub asset_record: String
}
