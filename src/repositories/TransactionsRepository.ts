import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const maxCallback2 = (acc: number, cur: number): number => acc + cur;

    const incomeResult = this.transactions
      .map(el => {
        if (el.type === 'income') {
          return el.value;
        }
        return 0;
      })
      .reduce(maxCallback2, 0);

    const outcomeResult = this.transactions
      .map(el => {
        if (el.type === 'outcome') {
          return el.value;
        }
        return 0;
      })
      .reduce(maxCallback2, 0);

    const total = incomeResult - outcomeResult;

    return { income: incomeResult, outcome: outcomeResult, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
