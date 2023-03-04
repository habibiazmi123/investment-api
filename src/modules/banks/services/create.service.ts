import { BankEntity } from "../entities/bank.entity.js";
import { BankRepository } from "../repositories/bank.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";

export class CreateBankService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: DocumentInterface, session: unknown) {
    const bankEntity = new BankEntity({
      name: doc.name,
      branch: doc.branch,
      address: doc.address,
      phone: doc.phone,
      fax: doc.fax,
      code: doc.code,
      notes: doc.notes,
      accounts: doc.accounts,
      createdBy_id: doc.createdBy_id
    });

    const bankRepository = new BankRepository(this.db);
    return await bankRepository.create(bankEntity.bank, { session });
  }
}
