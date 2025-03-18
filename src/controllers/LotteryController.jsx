// src/controllers/LotteryController.js

import { LotteryModel } from "../models/LotteryModel";

export class LotteryController {
  static drawNumbers(quantity, min, max, isRepeatEnabled) {
    try {
      const totalNumbers = max - min + 1;
      if (quantity > totalNumbers && !isRepeatEnabled) {
        throw new Error(`You cannot draw more than ${totalNumbers} unique numbers in this range`);
      }

      return LotteryModel.generateNumbers(quantity, min, max, isRepeatEnabled);
    } catch (error) {
      console.error("Lottery Draw Error:", error.message);
      return [];
    }
  }
}
