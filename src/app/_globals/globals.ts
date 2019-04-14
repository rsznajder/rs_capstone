import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  readonly mediaScreenSmall: number = 576;
  readonly mediaScreenMedium: number = 768;
  readonly mediaScreenLarge: number = 992;
  readonly mediaScreenExtraLarge: number = 1200;
  readonly urlCategoryList = 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';

  readonly roundNetOrGrossPrecision = 2;
  roundNetOrGrossSum(sum: number): number {
    if (sum > 0 || sum < 0) {
      return this.roundDecimal(sum, this.roundNetOrGrossPrecision);
    } else {
      return 0;
    }
  }
  roundDecimal(value: number, decimals: number) {
    return Number(Math.round(Number(value.toString() + 'e' + decimals.toString())) + 'e-' + decimals);
  }
}
