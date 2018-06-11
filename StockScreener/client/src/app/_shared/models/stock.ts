import { StockNews } from './stock-news';

export interface Stock {
    companyName: string;
    symbol: string;
    percentChange: string;
    latestPrice: string;
    primaryExchange: string;
    sector: string;
    week52High: string;
    week52Low: string;
    previousClose: string;
    stockNews: StockNews[];
}
