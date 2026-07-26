export interface DiplomaData {
  diplomaNumber: string;
  studentName: string;
  major: string;
  degree: string;
  graduationYear: number;
  issueDate: number;
  issuer: string;
  isValid: boolean;
}

export interface ContractState {
  contractAddress: string;
  ownerAddress: string;
  isOwner: boolean;
}
