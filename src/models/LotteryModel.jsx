// src/models/LotteryModel.js

export class LotteryModel {
    static generateNumbers(quantity, min, max, isRepeatEnabled) {
      if (quantity <= 0 || min >= max) {
        throw new Error("Invalid parameters for lottery draw");
      }
  
      if (isRepeatEnabled) {
        const numbers = [];
        for (let i = 0; i < quantity; i++) {
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          numbers.push(randomNumber);
        }
        return numbers;
      } else {
        const numbers = new Set();
        while (numbers.size < quantity) {
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          numbers.add(randomNumber);
        }
        return Array.from(numbers);
      }
    }
  }
  