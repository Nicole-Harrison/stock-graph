# Project Name

> Stock graph for TradingTrove

## Related Projects

  - https://github.com/tradingtrove/buy_sell_module
  - https://github.com/tradingtrove/ratings_history_module
  - https://github.com/tradingtrove/earnings

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## CRUD API
| Method  | Endpoint | Result
| ----------  | --------- | ------- |
| GET  | /api/:stockTicker/ | [{"stockInfo":{"relatedTags":["String","String", ...],"stockCompany":"String","noOfOwners":Number,"recommendationPercent":Number},"stockData":{"day":[Number, Number, ...],"week":[Number, Number, ...],"month":[Number, Number, ...],"threeMonth":[Number, Number, ...],"year":[Number, Number, ...],"fiveYear":[Number, Number, ...]},"id":"002","stockId":"String","averageStock": Number,"changePercent": Number}] |
| POST  | /api/stock/:stockId/price/ | {"date time": Date, "price": Number} |
| PUT | /api/stock/stockId/relatedTags | {"relatedTags: ["String", "String", ...] } |
| PUT  | /api/recommendationPercent/:percent | {"recommendationPercent: Number} |
| PUT  | /api/ownerCount/:count| {"noOfOwners: Number} |

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

